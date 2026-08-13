from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from database import get_db
from app.models.account import Account
from app.core.security import decode_access_token
from app.schemas import AccountResponse
from typing import List

router = APIRouter(prefix="/accounts", tags=["Accounts"])

def get_token_payload(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token header format")
    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload

@router.get("", response_model=List[AccountResponse])
def get_accounts(
        payload: dict = Depends(get_token_payload),
        db: Session = Depends(get_db)
):
    is_duress = payload.get("is_duress", False)
    accounts = db.query(Account).filter(Account.is_decoy == is_duress).all()

    return [
        AccountResponse(
            id=f"acc-{acc.id}",
            name=acc.name,
            accountNumber=acc.account_number,
            type=acc.account_type,
            balance=acc.balance,
            frozen=acc.is_frozen
        )
        for acc in accounts
    ]