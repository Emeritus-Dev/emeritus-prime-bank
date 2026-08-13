from typing import List, Optional
from pydantic import BaseModel

# --- AUTH SCHEMAS ---
class LoginRequest(BaseModel):
    pin: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    customer_name: str
    initials: str
    is_duress: bool

# --- ACCOUNT SCHEMAS ---
class AccountResponse(BaseModel):
    id: str
    name: str
    accountNumber: str
    type: str
    balance: float
    frozen: bool

    class Config:
        from_attributes = True

# --- TRANSFER SCHEMAS ---
class TransferRequest(BaseModel):
    fromId: str
    toId: str
    amount: float

class TransferResponse(BaseModel):
    status: str
    reference: str
    message: str