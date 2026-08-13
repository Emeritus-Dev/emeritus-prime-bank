from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, default="Tshegofatso")
    last_name = Column(String, default="Hlabela")
    email = Column(String, unique=True, index=True)
    standard_pin_hash = Column(String)
    duress_pin_hash = Column(String)
    is_active = Column(Boolean, default=True)