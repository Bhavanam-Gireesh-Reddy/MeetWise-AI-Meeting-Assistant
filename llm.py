"""
Groq LLM helper
- Single call on session stop: summary + filtered + corrected + title + speakers
- Model: llama-3.3-70b-versatile (free, fast, 14400 req/day)
"""

import os
import json
import re
import httpx

# ── Load .env if available (before reading env vars) ─────────────────────────
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

GROQ_URL   = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL = "llama-3.3-70b-versatile"

# Read lazily so load_dotenv() in main.py always wins
def _api_key() -> str:
    return os.getenv("GROQ_API_KEY", "")

# These are set by main.py after startup — kept for backward compatibility
GROQ_API_KEY = ""
HEADERS = {
    "Authorization": f"Bearer {GROQ_API_KEY}",
    "Content-Type":  "application/json",
}


async def call_groq(prompt: str, system: str, max_tokens: int = 2000) -> str:
    """Single call to Groq API. Reads API key from env at call time."""
    api_key = _api_key() or GROQ_API_KEY   # prefer env, fall back to module var
    if not api_key:
        print("  [Groq] ❌ GROQ_API_KEY not set — check your .env file")
        return ""

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type":  "application/json",
    }
    payload = {
        "model":      GROQ_MODEL,
        "max_tokens": max_tokens,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user",   "content": prompt},
        ],
    }

    try:
        print(f"  [Groq] Calling {GROQ_MODEL}...")
        async with httpx.AsyncClient(timeout=60) as client:
            res = await client.post(GROQ_URL, headers=headers, json=payload)

            if res.status_code == 429:
                print("  [Groq] ⚠️  429 rate limit — try again in a moment")
                return ""

            res.raise_for_status()
            data    = res.json()
            content = data["choices"][0]["message"]["content"].strip()
            print(f"  [Groq] ✅ Response received ({len(content)} chars)")
            return content

    except httpx.HTTPStatusError as e:
        print(f"  [Groq] HTTP error {e.response.status_code}: {e.response.text[:200]}")
        return ""
    except Exception as e:
        print(f"  [Groq] Error: {e}")
        return ""


# ── Combined analysis: summary + filtered + corrected + title + speakers ──────
COMBINED_SYSTEM = """You are an expert transcript analyzer for engineering lectures.
Given a full transcript, return a JSON object with exactly these six fields:

1. "summary": a highly detailed and comprehensive summary of the entire session.
   Instead of just 3 bullet points, provide a thorough overview of all topics discussed,
   key arguments, technical concepts, context, and important takeaways.
   Break it down into well-structured paragraphs or extensive bullet points.
   Use \\n for line breaks.

2. "filtered_transcript": keep ONLY educational/technical content.
   Remove: casual talk, filler words, greetings, off-topic remarks, repeated fragments.
   Keep: technical explanations, definitions, concepts, formulas, procedures.
   Format as clean paragraphs separated by \\n\\n.
   If nothing is technical, use empty string "".

3. "corrected_transcript": the FULL transcript with punctuation and capitalization fixed.
   Fix: missing periods, commas, question marks, capitalize sentence starts and proper nouns.
   Do NOT change any words, only fix punctuation and capitalization.
   Format as clean paragraphs separated by \\n\\n.

4. "title": a short 2-5 word topic title describing what this session is about.
   Examples: "Operating Systems Basics", "Virtual Machines Setup", "CPU Architecture"
   Be specific to the actual content. No quotes, no punctuation at end.

5. "speakers": infer speaker changes from context. Look for: topic shifts, question-answer
   patterns, different speaking styles, direct address changes. Return an array of objects:
   [{"speaker": "Speaker 1", "text": "sentence or group of sentences"}, ...]
   Group consecutive sentences by the same inferred speaker.
   If only one speaker detected, return all as "Speaker 1".

6. "notes": comprehensive and structured study preparation notes based extensively on the filtered technical content.
   If the valid content is sparse, use your extensive knowledge to generate high-level, comprehensive notes related
   to the inferred topic. Use detailed bullet points, subheadings, and clear explanations. Format as clean text with \\n for line breaks.

CRITICAL: Return ONLY valid JSON on a single line. Use \\n for newlines inside strings.
No markdown fences, no explanation, no extra text."""


async def process_session(sentences: list) -> dict:
    """Called once when session stops. Returns all analysis fields."""
    empty = {"summary": "", "filtered_transcript": "", "corrected_transcript": "", "title": "", "speakers": [], "notes": ""}
    if not sentences:
        return empty

    text = " ".join(sentences)
    print(f"  [Groq] Processing {len(sentences)} sentences ({len(text)} chars)...")

    result = await call_groq(
        f"Analyze this transcript:\n\n{text}",
        COMBINED_SYSTEM,
        max_tokens=2000
    )

    if not result:
        return empty

    try:
        cleaned = result.strip()

        # Strip markdown fences if model adds them
        if cleaned.startswith("```"):
            parts   = cleaned.split("```")
            cleaned = parts[1] if len(parts) > 1 else cleaned
            if cleaned.startswith("json"):
                cleaned = cleaned[4:]
        cleaned = cleaned.strip()

        # Sanitize control characters inside JSON string values
        cleaned = re.sub(r'(?<!\\)\n', '\\n', cleaned)
        cleaned = re.sub(r'(?<!\\)\r', '',   cleaned)
        cleaned = re.sub(r'(?<!\\)\t', '\\t', cleaned)

        data      = json.loads(cleaned)
        summary   = data.get("summary",   "")
        filtered  = data.get("filtered_transcript",  "")
        corrected = data.get("corrected_transcript", "")
        title     = data.get("title",     "")
        speakers  = data.get("speakers",  [])
        notes     = data.get("notes",     "")

        # Restore actual newlines in text fields
        for field in [summary, filtered, corrected, notes]:
            pass   # handled below with isinstance checks
        if isinstance(summary,   str): summary   = summary.replace("\\n",   "\n")
        if isinstance(filtered,  str): filtered  = filtered.replace("\\n",  "\n")
        if isinstance(corrected, str): corrected = corrected.replace("\\n", "\n")
        if isinstance(notes,     str): notes     = notes.replace("\\n",     "\n")

        print(f"  [Groq] ✅ Title:'{title}' Speakers:{len(speakers)} Notes:{len(notes)} chars Summary:{len(summary)} chars")
        return {
            "summary":              summary,
            "filtered_transcript":  filtered,
            "corrected_transcript": corrected,
            "title":                title,
            "speakers":             speakers,
            "notes":                notes,
        }

    except Exception as e:
        print(f"  [Groq] JSON parse error: {e} — trying regex fallback...")
        try:
            sm_match = re.search(r'"summary"\s*:\s*"(.*?)"(?=\s*,)',              result, re.DOTALL)
            ft_match = re.search(r'"filtered_transcript"\s*:\s*"(.*?)"(?=\s*[,}])', result, re.DOTALL)
            ct_match = re.search(r'"corrected_transcript"\s*:\s*"(.*?)"(?=\s*[,}])', result, re.DOTALL)
            ti_match = re.search(r'"title"\s*:\s*"(.*?)"(?=\s*[,}])',             result, re.DOTALL)
            nt_match = re.search(r'"notes"\s*:\s*"(.*?)"(?=\s*[,}])',             result, re.DOTALL)

            summary   = sm_match.group(1).replace("\\n", "\n") if sm_match else ""
            filtered  = ft_match.group(1).replace("\\n", "\n") if ft_match else ""
            corrected = ct_match.group(1).replace("\\n", "\n") if ct_match else ""
            title     = ti_match.group(1)                       if ti_match else ""
            notes     = nt_match.group(1).replace("\\n", "\n") if nt_match else ""

            print(f"  [Groq] Regex fallback — title:'{title}' notes:{len(notes)} chars summary:{len(summary)} chars")
            return {
                "summary":              summary,
                "filtered_transcript":  filtered,
                "corrected_transcript": corrected,
                "title":                title,
                "speakers":             [],
                "notes":                notes,
            }
        except Exception as e2:
            print(f"  [Groq] Regex fallback failed: {e2}")
            return empty


# ── Translate a transcript ────────────────────────────────────────────────────
LANG_NAMES = {
    "en": "English", "hi": "Hindi",   "ta": "Tamil",    "te": "Telugu",
    "kn": "Kannada", "ml": "Malayalam","bn": "Bengali",  "mr": "Marathi",
    "gu": "Gujarati","pa": "Punjabi",  "fr": "French",   "es": "Spanish",
    "de": "German",  "ja": "Japanese", "zh": "Chinese",  "ar": "Arabic",
}

async def translate_transcript(text: str, target_lang: str) -> str:
    """Translate transcript text to target language."""
    lang_name = LANG_NAMES.get(target_lang, target_lang)
    system = (
        f"You are a professional translator. Translate the given text to {lang_name}. "
        "Preserve paragraph structure and formatting. Return only the translated text, nothing else."
    )
    result = await call_groq(f"Translate to {lang_name}:\n\n{text}", system, max_tokens=3000)
    return result or ""