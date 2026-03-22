"""
Authentication module — bcrypt (direct) + JWT
No passlib dependency — uses bcrypt library directly.
"""
import os, re, secrets
from pathlib import Path
from datetime import datetime, timezone, timedelta
from typing import Optional

# ── Load .env from the same directory as this file ───────────────────────────
try:
    from dotenv import load_dotenv as _load_dotenv
    _env_path = Path(__file__).parent / ".env"
    _load_dotenv(dotenv_path=_env_path, override=True)
except ImportError:
    pass

try:
    import bcrypt
    BCRYPT_OK = True
except ImportError:
    BCRYPT_OK = False
    print("WARNING: bcrypt not installed. Run: pip install bcrypt")

try:
    from jose import JWTError, jwt
    JOSE_OK = True
except ImportError:
    JOSE_OK = False
    print("WARNING: python-jose not installed. Run: pip install python-jose[cryptography]")

# ── Config ────────────────────────────────────────────────────────────────────
_SECRET_FALLBACK = "sarvam-live-default-secret-key-please-change-in-production"
SECRET_KEY       = os.getenv("SECRET_KEY", _SECRET_FALLBACK)
ALGORITHM        = "HS256"
TOKEN_EXPIRE_H   = 72 * 7  # 1 week — stays logged in longer

if SECRET_KEY == _SECRET_FALLBACK:
    print("⚠️  WARNING: Using default SECRET_KEY — set a real one in .env")

# ── Password helpers ──────────────────────────────────────────────────────────
def hash_password(plain: str) -> str:
    if not BCRYPT_OK:
        raise RuntimeError("bcrypt not installed — run: pip install bcrypt")
    return bcrypt.hashpw(plain.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    if not BCRYPT_OK:
        return False
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False

# ── JWT helpers ───────────────────────────────────────────────────────────────
def _get_secret() -> str:
    """Always read fresh from env so .env changes take effect."""
    return os.getenv("SECRET_KEY", _SECRET_FALLBACK)

def create_token(user_id: str, email: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=TOKEN_EXPIRE_H)
    return jwt.encode(
        {"sub": user_id, "email": email, "exp": expire},
        _get_secret(), algorithm=ALGORITHM
    )

def decode_token(token: str) -> Optional[dict]:
    if not JOSE_OK:
        return None
    try:
        return jwt.decode(token, _get_secret(), algorithms=[ALGORITHM])
    except JWTError:
        return None

# ── API key helpers ───────────────────────────────────────────────────────────
def generate_api_key() -> str:
    return "sk-" + secrets.token_urlsafe(32)

# ── Request helpers ───────────────────────────────────────────────────────────
def get_token_from_request(request) -> Optional[str]:
    """Extract JWT from cookie or Authorization: Bearer header."""
    token = request.cookies.get("auth_token")
    if token:
        return token
    auth = request.headers.get("Authorization", "")
    if auth.startswith("Bearer "):
        return auth[7:]
    return None

def get_current_user(request) -> Optional[dict]:
    """Return decoded JWT payload or None if not authenticated."""
    token = get_token_from_request(request)
    if not token:
        return None
    return decode_token(token)

async def get_user_by_api_key(api_key: str, users_col) -> Optional[dict]:
    """Look up user by API key from MongoDB."""
    if not api_key or users_col is None:
        return None
    return await users_col.find_one({"api_key": api_key}, {"_id": 0, "password_hash": 0})

# ── Validation ────────────────────────────────────────────────────────────────
def validate_email(email: str) -> bool:
    return bool(re.match(r"^[^@]+@[^@]+\.[^@]+$", email))

def validate_password(pw: str) -> Optional[str]:
    """Return error string if invalid, None if OK."""
    if len(pw) < 8:
        return "Password must be at least 8 characters"
    return None

# ── Status ────────────────────────────────────────────────────────────────────
AUTH_AVAILABLE = BCRYPT_OK and JOSE_OK
if AUTH_AVAILABLE:
    print("✅ Auth ready (bcrypt direct + JWT)")
elif not BCRYPT_OK:
    print("⚠️  Auth disabled — run: pip install bcrypt")
elif not JOSE_OK:
    print("⚠️  Auth disabled — run: pip install python-jose[cryptography]")