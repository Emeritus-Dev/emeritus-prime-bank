from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.core.config import settings
from app.database import get_db
from app.models.account import Account, User
from app.schemas import AccountResponse

router = APIRouter()
security = HTTPBearer()


def get_current_session(
        credentials: HTTPAuthorizationCredentials = Depends(security),
        db: Session = Depends(get_db),
):
    token = credentials.credentials
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        user_id: str = payload.get("sub")
        is_duress: bool = payload.get("is_duress", False)
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials token",
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )

    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return {"user": user, "is_duress": is_duress}


@router.get("", response_model=List[AccountResponse])
def list_accounts(
        session: dict = Depends(get_current_session),
        db: Session = Depends(get_db),
):
    user = session["user"]
    is_duress = session["is_duress"]

    accounts = (
        db.query(Account)
        .filter(Account.user_id == user.id, Account.is_decoy == is_duress)
        .all()
    )

    return [
        AccountResponse(
            id=acc.id,
            name=acc.name,
            accountNumber=acc.account_number,
            accountType=acc.account_type,
            balance=acc.balance,
            isDecoy=acc.is_decoy,
        )
        for acc in accounts
    ]