"""
Run this ONCE to make a user an admin.
Usage: python make_admin.py your@email.com
"""
import asyncio
import sys
import os

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI      = os.getenv("MONGO_URI",       "mongodb://localhost:27017")
MONGO_DB       = os.getenv("MONGO_DB",        "live_transcription")
MONGO_COL_USERS= os.getenv("MONGO_COL_USERS", "users")

async def make_admin(email: str):
    client    = AsyncIOMotorClient(MONGO_URI)
    users_col = client[MONGO_DB][MONGO_COL_USERS]

    user = await users_col.find_one({"email": email.lower()})
    if not user:
        print(f"❌ No user found with email: {email}")
        print("   Make sure you've registered first at http://localhost:8000/register")
        return

    await users_col.update_one(
        {"email": email.lower()},
        {"$set": {"is_admin": True}}
    )
    print(f"✅ {email} is now an admin")
    print(f"   Visit http://localhost:8000/admin")
    client.close()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python make_admin.py gbhavanam69@gmail.com")
        sys.exit(1)
    asyncio.run(make_admin(sys.argv[1]))