from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base, SessionLocal
from app.models.user import User
from app.models.account import Account
from app.core.security import get_pin_hash
from app.api import auth, accounts, transfers

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Emeritus Prime Bank API",
    version="1.0.0",
    description="Sovereign Wealth Operating System API with Silent Duress Protection"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1")
app.include_router(accounts.router, prefix="/api/v1")
app.include_router(transfers.router, prefix="/api/v1")

@app.on_event("startup")
def seed_initial_data():
    db = SessionLocal()
    try:
        if not db.query(User).first():
            demo_user = User(
                id=1,
                first_name="Tshegofatso",
                last_name="Hlabela",
                email="tshegofatso@emeritusprime.co.za",
                standard_pin_hash=get_pin_hash("1234"),
                duress_pin_hash=get_pin_hash("9999")
            )
            db.add(demo_user)
            db.commit()

            real_accounts = [
                Account(user_id=1, account_number="4209 •••• 8821", name="Premier Cheque Facility", account_type="Cheque", balance=1245000.00, is_decoy=False),
                Account(user_id=1, account_number="8812 •••• 3310", name="High-Yield Sovereign Vault", account_type="Vault", balance=850000.00, is_decoy=False),
                Account(user_id=1, account_number="3091 •••• 9942", name="Commercial Laundry Reserve", account_type="Savings", balance=480000.00, is_decoy=False),
            ]

            decoy_accounts = [
                Account(user_id=1, account_number="4209 •••• 1092", name="Standard Cheque Account", account_type="Cheque", balance=1450.00, is_decoy=True),
                Account(user_id=1, account_number="8821 •••• 5501", name="Emergency Savings", account_type="Savings", balance=320.00, is_decoy=True),
            ]

            db.add_all(real_accounts + decoy_accounts)
            db.commit()
            print("✓ Database successfully seeded with Standard ('1234') and Duress ('9999') credentials.")
    finally:
        db.close()

@app.get("/")
def root():
    return {"status": "online", "system": "Emeritus Prime Bank API"}