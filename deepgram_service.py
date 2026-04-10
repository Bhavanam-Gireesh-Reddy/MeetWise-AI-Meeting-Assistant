import os
import asyncio
from typing import AsyncGenerator, Optional
from deepgram import (
    DeepgramClient,
    LiveTranscriptionEvents,
    LiveOptions,
)

DEEPGRAM_API_KEY = os.environ.get("DEEPGRAM_API_KEY")

def _get_attr_or_key(value, name: str, default=None):
    if value is None:
        return default
    if isinstance(value, dict):
        return value.get(name, default)
    return getattr(value, name, default)


def _extract_speaker_label(words) -> str:
    if not words:
        return "unknown"
    first_word = words[0]
    speaker_id = _get_attr_or_key(first_word, "speaker")
    if speaker_id in (None, ""):
        return "unknown"
    return f"speaker_{speaker_id}"


async def stream_to_deepgram(
    audio_generator: AsyncGenerator[bytes, None],
    language: Optional[str] = None,
) -> AsyncGenerator[dict, None]:
    """
    Takes an async generator of raw audio bytes (e.g. from a WebSocket)
    and streams them to Deepgram for real-time transcription & diarization.
    Yields parsed dialogue chunks with speaker labels.
    """
    if not DEEPGRAM_API_KEY or DEEPGRAM_API_KEY == "YOUR_DEEPGRAM_API_KEY_HERE":
        yield {"error": "Deepgram API key not configured."}
        return

    deepgram = DeepgramClient(DEEPGRAM_API_KEY)
    
    # Create a websocket connection to Deepgram
    # We use asyncio Queue to bridge Deepgram's callback-based events to an AsyncGenerator
    queue = asyncio.Queue()

    try:
        dg_connection = deepgram.listen.asyncwebsocket.v("1")

        async def on_message(self, result, **kwargs):
            channel = _get_attr_or_key(result, "channel")
            alternatives = _get_attr_or_key(channel, "alternatives", [])
            if not alternatives:
                return

            primary_alt = alternatives[0]
            sentence = (_get_attr_or_key(primary_alt, "transcript", "") or "").strip()
            if not sentence:
                return

            words = _get_attr_or_key(primary_alt, "words", []) or []
            await queue.put({
                "speaker": _extract_speaker_label(words),
                "text": sentence,
                "is_final": bool(_get_attr_or_key(result, "is_final", False)),
            })

        async def on_error(self, error, **kwargs):
            await queue.put({"error": str(error)})

        dg_connection.on(LiveTranscriptionEvents.Transcript, on_message)
        dg_connection.on(LiveTranscriptionEvents.Error, on_error)

        # Options for live transcription with diarization
        options_kwargs = dict(
            model="nova-2-general",
            smart_format=True,
            encoding="linear16", # Typically raw PCM from browser
            channels=1,
            sample_rate=16000,
            diarize=True, # Enable Speaker Diarization
        )
        if language:
            options_kwargs["language"] = language

        options = LiveOptions(**options_kwargs)

        if not await dg_connection.start(options):
            yield {"error": "Failed to connect to Deepgram"}
            return

        # Start a background task to pump audio from generator to Deepgram
        async def pump_audio():
            try:
                async for chunk in audio_generator:
                    await dg_connection.send(chunk)
                await dg_connection.finish()
            except Exception as e:
                print(f"Error pumping audio to Deepgram: {e}")
                await queue.put(None) # Signal completion

        bg_task = asyncio.create_task(pump_audio())

        # Yield results from the queue as they come in
        while True:
            # We use a slight timeout to check if the bg_task died prematurely
            try:
                result = await asyncio.wait_for(queue.get(), timeout=1.0)
                if result is None:
                    break
                yield result
            except asyncio.TimeoutError:
                if bg_task.done():
                    break
                continue

    except Exception as e:
        yield {"error": f"Deepgram streaming error: {e}"}
