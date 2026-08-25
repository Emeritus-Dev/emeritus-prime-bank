from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class LoginRequest(BaseModel):
    pin: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    customer_name: str
    initials: str
    is_duress: bool


class AccountResponse(BaseModel):
    id: int
    name: str
    accountNumber: str
    accountType: str
    balance: float
    isDecoy: bool

    class Config:
        from_attributes = True


class TransferRequest(BaseModel):
    source_account_id: int
    destination_account_number: str
    amount: float
    reference: Optional[str] = "Transfer"


class TransferResponse(BaseModel):
    success: bool
    message: str
    transaction_id: str
    remaining_balance: float