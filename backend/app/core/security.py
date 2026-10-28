from datetime import datetime, timedelta, timezone
from typing import Any, Optional, Union
import bcrypt
from jose import jwt
from app.core.config import settings


def get_pin_hash(pin: str) -> str:
    """Hash a PIN using native bcrypt without passlib dependencies."""
    pin_bytes = str(pin).encode("utf-8")[:72]
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pin_bytes, salt).decode("utf-8")


def verify_pin(plain_pin: str, hashed_pin: str) -> bool:
    """Verify a plain PIN against a stored bcrypt hash."""
    try:
        plain_bytes = str(plain_pin).encode("utf-8")[:72]
        hashed_bytes = str(hashed_pin).encode("utf-8")
        return bcrypt.checkpw(plain_bytes, hashed_bytes)
    except Exception:
        return False


def create_access_token(
        subject: Union[str, Any],
        is_duress: bool = False,
        expires_delta: Optional[timedelta] = None,
) -> str:
    """Generate a signed JWT token containing user identity and session duress state."""
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )

    to_encode = {
        "exp": expire,
        "sub": str(subject),
        "is_duress": is_duress,
    }
    encoded_jwt = jwt.encode(
        to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM
    )
    return encoded_jwt