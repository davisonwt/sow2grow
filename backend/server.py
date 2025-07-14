from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header, Query, Path as PathParam
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timedelta
import bcrypt
import jwt
from enum import Enum
import asyncio
from decimal import Decimal
import json

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-here')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_DELTA = timedelta(days=7)

# Create the main app
app = FastAPI(
    title="Sow2Grow Farm Mall API",
    description="364yhvh Community Farm & Sow2Grow Farm Mall Platform",
    version="1.0.0"
)

# Create API router with /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()

# ===== ENUMS =====
class UserRole(str, Enum):
    USER = "user"
    GROWER = "grower"
    ADMIN = "admin"

class AccountType(str, Enum):
    PERSONAL = "personal"
    BUSINESS = "business"

class OrchardStatus(str, Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    PAUSED = "paused"
    CANCELLED = "cancelled"

class PaymentStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"

class PaymentMethod(str, Enum):
    CARD = "card"
    PAYPAL = "paypal"

class GrowthStage(str, Enum):
    SPROUT = "sprout"
    YOUNG = "young"
    GROWING = "growing"
    MATURE = "mature"

class GiftCategory(str, Enum):
    ART = "The Gift of Art"
    ACCESSORIES = "The Gift of Accessories"
    ADVENTURE = "The Gift of Adventure Packages"
    APPLIANCES = "The Gift of Appliances"
    CUSTOM = "The Gift of Custom Made"
    DIY = "The Gift of DIY"
    ELECTRONICS = "The Gift of Electronics"
    ENERGY = "The Gift of Energy"
    FREEWILL = "The Gift of Free-will Gifting"
    INNOVATION = "The Gift of Innovation"
    KITCHENWARE = "The Gift of Kitchenware"
    MUSIC = "The Gift of Music"
    NOURISHMENT = "The Gift of Nourishment"
    PAYASYOUGO = "The Gift of Pay as You Go"
    PROPERTY = "The Gift of Property"
    SERVICES = "The Gift of Services"
    TECHNOLOGY = "The Gift of Technology"
    TITHING = "The Gift of Tithing"
    TOOLS = "The Gift of Tools"
    VEHICLES = "The Gift of Vehicles"
    WELLNESS = "The Gift of Wellness"

# ===== DATABASE MODELS =====
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    password_hash: str
    first_name: str
    last_name: str
    role: UserRole = UserRole.USER
    is_email_verified: bool = False
    is_identity_verified: bool = False
    location: Optional[str] = None
    phone: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class UserCreateRequest(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    location: Optional[str] = None
    phone: Optional[str] = None

class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserUpdateRequest(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    location: Optional[str] = None
    phone: Optional[str] = None

class PayPalAccount(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    email: EmailStr
    account_type: AccountType = AccountType.PERSONAL
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    business_name: Optional[str] = None
    country: str = "US"
    currency: str = "USD"
    auto_payouts: bool = True
    minimum_payout: float = 50.0
    is_verified: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    last_verified: Optional[datetime] = None

class PayPalAccountCreateRequest(BaseModel):
    email: EmailStr
    account_type: AccountType = AccountType.PERSONAL
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    business_name: Optional[str] = None
    country: str = "US"
    currency: str = "USD"
    auto_payouts: bool = True
    minimum_payout: float = Field(default=50.0, ge=50.0, le=10000.0)

class Orchard(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str  # The grower (farm stall owner)
    title: str
    description: str
    category: GiftCategory = GiftCategory.TECHNOLOGY
    seed_value: float  # Total amount needed
    pocket_price: float = 150.0  # Price per pocket
    total_pockets: int  # Calculated from seed_value / pocket_price
    filled_pockets: int = 0
    location: Optional[str] = None
    timeline: Optional[str] = None
    why_needed: str
    community_impact: str
    features: List[str] = []
    images: List[str] = []
    video_url: Optional[str] = None
    status: OrchardStatus = OrchardStatus.ACTIVE
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    verified: bool = False
    views: int = 0
    supporters: int = 0
    completion_rate: float = 0.0
    payout_processed: bool = False

class OrchardCreateRequest(BaseModel):
    title: str
    description: str
    category: GiftCategory = GiftCategory.TECHNOLOGY
    seed_value: float = Field(gt=0)  # This will be the final calculated value
    original_seed_value: Optional[float] = None  # Original amount before fees
    tithing_amount: Optional[float] = 0.0  # 10% tithing amount
    payment_processing_fee: Optional[float] = 0.0  # Payment processing fee
    pocket_price: float = Field(default=150.0, gt=0)
    location: Optional[str] = None
    timeline: Optional[str] = None
    why_needed: str
    community_impact: str
    features: List[str] = []
    images: List[str] = []
    video_url: Optional[str] = None

class OrchardUpdateRequest(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[GiftCategory] = None
    location: Optional[str] = None
    timeline: Optional[str] = None
    why_needed: Optional[str] = None
    community_impact: Optional[str] = None
    features: Optional[List[str]] = None
    images: Optional[List[str]] = None
    video_url: Optional[str] = None

class Pocket(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    orchard_id: str
    pocket_number: int
    user_id: str  # The bestower
    amount: float
    growth_stage: GrowthStage = GrowthStage.SPROUT
    days_growing: int = 0
    bestower_name: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Payment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    orchard_id: Optional[str] = None
    payment_type: str  # "orchard_bestowal", "tithing", "free_will_gifting"
    amount: float
    currency: str = "USD"
    method: PaymentMethod
    status: PaymentStatus = PaymentStatus.PENDING
    payment_id: Optional[str] = None  # External payment ID
    order_id: Optional[str] = None  # PayPal order ID
    description: str
    metadata: Dict[str, Any] = {}
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PaymentCreateRequest(BaseModel):
    orchard_id: Optional[str] = None
    payment_type: str
    amount: float
    currency: str = "USD"
    method: PaymentMethod
    description: str
    metadata: Dict[str, Any] = {}

class Analytics(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    date: datetime
    category: Optional[GiftCategory] = None
    total_orchards: int = 0
    new_orchards: int = 0
    completed_orchards: int = 0
    active_orchards: int = 0
    total_seed_value: float = 0.0
    total_bestowed: float = 0.0
    completion_rate: float = 0.0
    total_bestowals: int = 0
    unique_bestowers: int = 0
    total_views: int = 0
    success_rate: float = 0.0
    created_at: datetime = Field(default_factory=datetime.utcnow)

# ===== RESPONSE MODELS =====
class APIResponse(BaseModel):
    success: bool
    data: Any = None
    message: Optional[str] = None
    error: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    request_id: str = Field(default_factory=lambda: str(uuid.uuid4()))

class LoginResponse(BaseModel):
    user: Dict[str, Any]
    access_token: str
    refresh_token: str

class PocketSelectionRequest(BaseModel):
    orchard_id: str
    pocket_numbers: List[int]

# ===== UTILITY FUNCTIONS =====
def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(data: dict) -> str:
    """Create a JWT access token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + JWT_EXPIRATION_DELTA
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> dict:
    """Verify and decode a JWT token"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ===== AUTHENTICATION MIDDLEWARE =====
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current user from JWT token"""
    token = credentials.credentials
    payload = verify_token(token)
    user_id = payload.get("user_id")
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")
    
    # Get user from database
    user_doc = await db.users.find_one({"id": user_id})
    if not user_doc:
        raise HTTPException(status_code=401, detail="User not found")
    
    return User(**user_doc)

async def get_current_user_optional(authorization: str = Header(None)):
    """Get current user from JWT token (optional)"""
    if not authorization:
        return None
    
    try:
        token = authorization.replace("Bearer ", "")
        payload = verify_token(token)
        user_id = payload.get("user_id")
        
        if not user_id:
            return None
        
        user_doc = await db.users.find_one({"id": user_id})
        if not user_doc:
            return None
        
        return User(**user_doc)
    except:
        return None

# ===== API ENDPOINTS =====

# Root endpoint
@api_router.get("/")
async def root():
    """Root endpoint for API health check"""
    return APIResponse(
        success=True,
        data={"message": "Welcome to Sow2Grow Farm Mall API"},
        message="API is running successfully"
    )

# Authentication endpoints
@api_router.post("/auth/register", response_model=APIResponse)
async def register_user(request: UserCreateRequest):
    """Register a new user"""
    try:
        # Check if user already exists
        existing_user = await db.users.find_one({"email": request.email})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Create new user
        user = User(
            email=request.email,
            password_hash=hash_password(request.password),
            first_name=request.first_name,
            last_name=request.last_name,
            location=request.location,
            phone=request.phone
        )
        
        # Insert user into database
        await db.users.insert_one(user.dict())
        
        # Create access token
        access_token = create_access_token({"user_id": user.id})
        
        user_data = user.dict()
        user_data.pop("password_hash")  # Remove password hash from response
        
        return APIResponse(
            success=True,
            data={
                "user": user_data,
                "access_token": access_token,
                "refresh_token": access_token  # For simplicity, using same token
            },
            message="User registered successfully"
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Registration error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/auth/login", response_model=APIResponse)
async def login_user(request: UserLoginRequest):
    """Login user and return JWT token"""
    try:
        # Find user by email
        user_doc = await db.users.find_one({"email": request.email})
        if not user_doc:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        user = User(**user_doc)
        
        # Verify password
        if not verify_password(request.password, user.password_hash):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        # Create access token
        access_token = create_access_token({"user_id": user.id})
        
        user_data = user.dict()
        user_data.pop("password_hash")  # Remove password hash from response
        
        return APIResponse(
            success=True,
            data={
                "user": user_data,
                "access_token": access_token,
                "refresh_token": access_token  # For simplicity, using same token
            },
            message="Login successful"
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Login error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# User profile endpoints
@api_router.get("/users/me", response_model=APIResponse)
async def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """Get current user profile"""
    try:
        user_data = current_user.dict()
        user_data.pop("password_hash")  # Remove password hash from response
        
        return APIResponse(
            success=True,
            data=user_data,
            message="User profile retrieved successfully"
        )
    except Exception as e:
        logging.error(f"Get user profile error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.patch("/users/me", response_model=APIResponse)
async def update_current_user_profile(
    request: UserUpdateRequest,
    current_user: User = Depends(get_current_user)
):
    """Update current user profile"""
    try:
        # Update user data
        update_data = {}
        if request.first_name is not None:
            update_data["first_name"] = request.first_name
        if request.last_name is not None:
            update_data["last_name"] = request.last_name
        if request.location is not None:
            update_data["location"] = request.location
        if request.phone is not None:
            update_data["phone"] = request.phone
        
        update_data["updated_at"] = datetime.utcnow()
        
        # Update in database
        await db.users.update_one(
            {"id": current_user.id},
            {"$set": update_data}
        )
        
        # Get updated user
        updated_user_doc = await db.users.find_one({"id": current_user.id})
        updated_user = User(**updated_user_doc)
        
        user_data = updated_user.dict()
        user_data.pop("password_hash")  # Remove password hash from response
        
        return APIResponse(
            success=True,
            data=user_data,
            message="User profile updated successfully"
        )
    except Exception as e:
        logging.error(f"Update user profile error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# PayPal account endpoints
@api_router.get("/users/paypal-account", response_model=APIResponse)
async def get_paypal_account(current_user: User = Depends(get_current_user)):
    """Get user's PayPal account details"""
    try:
        paypal_account_doc = await db.paypal_accounts.find_one({"user_id": current_user.id})
        
        if not paypal_account_doc:
            return APIResponse(
                success=True,
                data=None,
                message="No PayPal account found"
            )
        
        paypal_account = PayPalAccount(**paypal_account_doc)
        
        return APIResponse(
            success=True,
            data=paypal_account.dict(),
            message="PayPal account retrieved successfully"
        )
    except Exception as e:
        logging.error(f"Get PayPal account error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/users/paypal-account", response_model=APIResponse)
async def create_paypal_account(
    request: PayPalAccountCreateRequest,
    current_user: User = Depends(get_current_user)
):
    """Create user's PayPal account"""
    try:
        # Check if user already has a PayPal account
        existing_account = await db.paypal_accounts.find_one({"user_id": current_user.id})
        if existing_account:
            raise HTTPException(status_code=400, detail="PayPal account already exists")
        
        # Create new PayPal account
        paypal_account = PayPalAccount(
            user_id=current_user.id,
            email=request.email,
            account_type=request.account_type,
            first_name=request.first_name,
            last_name=request.last_name,
            business_name=request.business_name,
            country=request.country,
            currency=request.currency,
            auto_payouts=request.auto_payouts,
            minimum_payout=request.minimum_payout
        )
        
        # Insert into database
        await db.paypal_accounts.insert_one(paypal_account.dict())
        
        return APIResponse(
            success=True,
            data=paypal_account.dict(),
            message="PayPal account created successfully"
        )
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Create PayPal account error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/users/paypal-account", response_model=APIResponse)
async def update_paypal_account(
    request: PayPalAccountCreateRequest,
    current_user: User = Depends(get_current_user)
):
    """Update user's PayPal account"""
    try:
        # Update PayPal account
        update_data = {
            "email": request.email,
            "account_type": request.account_type,
            "first_name": request.first_name,
            "last_name": request.last_name,
            "business_name": request.business_name,
            "country": request.country,
            "currency": request.currency,
            "auto_payouts": request.auto_payouts,
            "minimum_payout": request.minimum_payout,
            "updated_at": datetime.utcnow(),
            "is_verified": False  # Reset verification status
        }
        
        result = await db.paypal_accounts.update_one(
            {"user_id": current_user.id},
            {"$set": update_data}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="PayPal account not found")
        
        # Get updated account
        updated_account_doc = await db.paypal_accounts.find_one({"user_id": current_user.id})
        updated_account = PayPalAccount(**updated_account_doc)
        
        return APIResponse(
            success=True,
            data=updated_account.dict(),
            message="PayPal account updated successfully"
        )
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Update PayPal account error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/users/paypal-account/verify", response_model=APIResponse)
async def verify_paypal_account(current_user: User = Depends(get_current_user)):
    """Verify user's PayPal account"""
    try:
        # Get PayPal account
        paypal_account_doc = await db.paypal_accounts.find_one({"user_id": current_user.id})
        
        if not paypal_account_doc:
            raise HTTPException(status_code=404, detail="PayPal account not found")
        
        paypal_account = PayPalAccount(**paypal_account_doc)
        
        # Simple email validation (in production, use PayPal API)
        if "@" not in paypal_account.email or len(paypal_account.email) < 5:
            raise HTTPException(status_code=400, detail="Invalid PayPal email format")
        
        # Update verification status
        await db.paypal_accounts.update_one(
            {"user_id": current_user.id},
            {"$set": {"is_verified": True, "last_verified": datetime.utcnow()}}
        )
        
        # Log verification
        await db.paypal_verification_logs.insert_one({
            "id": str(uuid.uuid4()),
            "user_id": current_user.id,
            "paypal_account_id": paypal_account.id,
            "verification_type": "email_verification",
            "status": "success",
            "created_at": datetime.utcnow()
        })
        
        return APIResponse(
            success=True,
            data={"verified": True},
            message="PayPal account verified successfully"
        )
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Verify PayPal account error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Orchard endpoints
@api_router.get("/orchards", response_model=APIResponse)
async def get_orchards(
    category: Optional[GiftCategory] = Query(None),
    status: Optional[OrchardStatus] = Query(None),
    limit: int = Query(50, le=100),
    offset: int = Query(0, ge=0),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Get all orchards with filtering"""
    try:
        # Build filter query
        filter_query = {}
        if category:
            filter_query["category"] = category
        if status:
            filter_query["status"] = status
        
        # Get orchards from database
        orchards_cursor = db.orchards.find(filter_query).skip(offset).limit(limit)
        orchards_docs = await orchards_cursor.to_list(length=limit)
        
        orchards = []
        for doc in orchards_docs:
            orchard = Orchard(**doc)
            
            # Calculate completion rate
            if orchard.total_pockets > 0:
                orchard.completion_rate = (orchard.filled_pockets / orchard.total_pockets) * 100
            
            orchards.append(orchard.dict())
        
        return APIResponse(
            success=True,
            data=orchards,
            message="Orchards retrieved successfully"
        )
    except Exception as e:
        logging.error(f"Get orchards error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/orchards", response_model=APIResponse)
async def create_orchard(
    request: OrchardCreateRequest,
    current_user: User = Depends(get_current_user)
):
    """Create a new orchard"""
    try:
        # Calculate total pockets
        total_pockets = int(request.seed_value / request.pocket_price)
        
        # Create orchard
        orchard = Orchard(
            user_id=current_user.id,
            title=request.title,
            description=request.description,
            category=request.category,
            seed_value=request.seed_value,
            pocket_price=request.pocket_price,
            total_pockets=total_pockets,
            location=request.location,
            timeline=request.timeline,
            why_needed=request.why_needed,
            community_impact=request.community_impact,
            features=request.features,
            images=request.images,
            video_url=request.video_url
        )
        
        # Insert into database
        await db.orchards.insert_one(orchard.dict())
        
        return APIResponse(
            success=True,
            data=orchard.dict(),
            message="Orchard created successfully"
        )
    except Exception as e:
        logging.error(f"Create orchard error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/orchards/{orchard_id}", response_model=APIResponse)
async def get_orchard(
    orchard_id: str = PathParam(...),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Get orchard by ID"""
    try:
        # Get orchard from database
        orchard_doc = await db.orchards.find_one({"id": orchard_id})
        
        if not orchard_doc:
            raise HTTPException(status_code=404, detail="Orchard not found")
        
        orchard = Orchard(**orchard_doc)
        
        # Calculate completion rate
        if orchard.total_pockets > 0:
            orchard.completion_rate = (orchard.filled_pockets / orchard.total_pockets) * 100
        
        # Increment view count
        await db.orchards.update_one(
            {"id": orchard_id},
            {"$inc": {"views": 1}}
        )
        
        # Get pockets for this orchard
        pockets_cursor = db.pockets.find({"orchard_id": orchard_id})
        pockets_docs = await pockets_cursor.to_list(length=None)
        
        pockets = []
        for doc in pockets_docs:
            pocket = Pocket(**doc)
            pockets.append(pocket.dict())
        
        orchard_data = orchard.dict()
        orchard_data["pockets"] = pockets
        
        return APIResponse(
            success=True,
            data=orchard_data,
            message="Orchard retrieved successfully"
        )
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Get orchard error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.patch("/orchards/{orchard_id}", response_model=APIResponse)
async def update_orchard(
    request: OrchardUpdateRequest,
    orchard_id: str = PathParam(...),
    current_user: User = Depends(get_current_user)
):
    """Update orchard"""
    try:
        # Check if orchard exists and belongs to user
        orchard_doc = await db.orchards.find_one({"id": orchard_id, "user_id": current_user.id})
        
        if not orchard_doc:
            raise HTTPException(status_code=404, detail="Orchard not found or access denied")
        
        # Build update data
        update_data = {}
        if request.title is not None:
            update_data["title"] = request.title
        if request.description is not None:
            update_data["description"] = request.description
        if request.category is not None:
            update_data["category"] = request.category
        if request.location is not None:
            update_data["location"] = request.location
        if request.timeline is not None:
            update_data["timeline"] = request.timeline
        if request.why_needed is not None:
            update_data["why_needed"] = request.why_needed
        if request.community_impact is not None:
            update_data["community_impact"] = request.community_impact
        if request.features is not None:
            update_data["features"] = request.features
        if request.images is not None:
            update_data["images"] = request.images
        if request.video_url is not None:
            update_data["video_url"] = request.video_url
        
        update_data["updated_at"] = datetime.utcnow()
        
        # Update in database
        await db.orchards.update_one(
            {"id": orchard_id},
            {"$set": update_data}
        )
        
        # Get updated orchard
        updated_orchard_doc = await db.orchards.find_one({"id": orchard_id})
        updated_orchard = Orchard(**updated_orchard_doc)
        
        return APIResponse(
            success=True,
            data=updated_orchard.dict(),
            message="Orchard updated successfully"
        )
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Update orchard error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.delete("/orchards/{orchard_id}", response_model=APIResponse)
async def delete_orchard(
    orchard_id: str = PathParam(...),
    current_user: User = Depends(get_current_user)
):
    """Delete orchard"""
    try:
        # Check if orchard exists and belongs to user
        orchard_doc = await db.orchards.find_one({"id": orchard_id, "user_id": current_user.id})
        
        if not orchard_doc:
            raise HTTPException(status_code=404, detail="Orchard not found or access denied")
        
        # Delete orchard
        await db.orchards.delete_one({"id": orchard_id})
        
        # Delete associated pockets
        await db.pockets.delete_many({"orchard_id": orchard_id})
        
        return APIResponse(
            success=True,
            data={"deleted": True},
            message="Orchard deleted successfully"
        )
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Delete orchard error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Pocket selection and bestowing endpoints
@api_router.post("/orchards/{orchard_id}/bestow", response_model=APIResponse)
async def bestow_into_orchard(
    request: PocketSelectionRequest,
    orchard_id: str = PathParam(...),
    current_user: User = Depends(get_current_user)
):
    """Bestow into orchard by selecting pockets"""
    try:
        # Verify orchard exists
        orchard_doc = await db.orchards.find_one({"id": orchard_id})
        if not orchard_doc:
            raise HTTPException(status_code=404, detail="Orchard not found")
        
        orchard = Orchard(**orchard_doc)
        
        # Check if orchard is active
        if orchard.status != OrchardStatus.ACTIVE:
            raise HTTPException(status_code=400, detail="Orchard is not active")
        
        # Check if pockets are available
        existing_pockets = await db.pockets.find({"orchard_id": orchard_id}).to_list(length=None)
        taken_pocket_numbers = [p["pocket_number"] for p in existing_pockets]
        
        unavailable_pockets = [pn for pn in request.pocket_numbers if pn in taken_pocket_numbers]
        if unavailable_pockets:
            raise HTTPException(
                status_code=400, 
                detail=f"Pockets {unavailable_pockets} are already taken"
            )
        
        # Create pockets
        pockets = []
        for pocket_number in request.pocket_numbers:
            pocket = Pocket(
                orchard_id=orchard_id,
                pocket_number=pocket_number,
                user_id=current_user.id,
                amount=orchard.pocket_price,
                bestower_name=f"{current_user.first_name} {current_user.last_name[0]}."
            )
            pockets.append(pocket.dict())
        
        # Insert pockets
        await db.pockets.insert_many(pockets)
        
        # Update orchard filled_pockets count
        new_filled_count = orchard.filled_pockets + len(request.pocket_numbers)
        completion_rate = (new_filled_count / orchard.total_pockets) * 100
        
        await db.orchards.update_one(
            {"id": orchard_id},
            {
                "$set": {
                    "filled_pockets": new_filled_count,
                    "completion_rate": completion_rate,
                    "updated_at": datetime.utcnow()
                },
                "$inc": {"supporters": 1}
            }
        )
        
        total_amount = len(request.pocket_numbers) * orchard.pocket_price
        
        return APIResponse(
            success=True,
            data={
                "pockets_selected": len(request.pocket_numbers),
                "total_amount": total_amount,
                "completion_rate": completion_rate
            },
            message="Pockets selected successfully"
        )
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Bestow into orchard error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/orchards/{orchard_id}/complete", response_model=APIResponse)
async def complete_orchard(
    orchard_id: str = PathParam(...),
    current_user: User = Depends(get_current_user)
):
    """Complete orchard and trigger payout"""
    try:
        # Get orchard
        orchard_doc = await db.orchards.find_one({"id": orchard_id})
        if not orchard_doc:
            raise HTTPException(status_code=404, detail="Orchard not found")
        
        orchard = Orchard(**orchard_doc)
        
        # Check if payout already processed
        if orchard.payout_processed:
            raise HTTPException(status_code=400, detail="Payout already processed")
        
        # Check if orchard is fully funded
        if orchard.filled_pockets < orchard.total_pockets:
            raise HTTPException(status_code=400, detail="Orchard is not fully funded")
        
        # Process payout (simplified)
        await db.orchards.update_one(
            {"id": orchard_id},
            {
                "$set": {
                    "status": OrchardStatus.COMPLETED,
                    "payout_processed": True,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        return APIResponse(
            success=True,
            data={"payout_processed": True},
            message="Orchard completed and payout initiated"
        )
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Complete orchard error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Payment endpoints
@api_router.post("/payments/card", response_model=APIResponse)
async def process_card_payment(
    request: PaymentCreateRequest,
    current_user: User = Depends(get_current_user)
):
    """Process card payment"""
    try:
        # Simulate card processing (in production, use Stripe/Square)
        payment_id = f"card_{int(datetime.utcnow().timestamp())}_{uuid.uuid4().hex[:8]}"
        
        # Create payment record
        payment = Payment(
            user_id=current_user.id,
            orchard_id=request.orchard_id,
            payment_type=request.payment_type,
            amount=request.amount,
            currency=request.currency,
            method=request.method,
            status=PaymentStatus.COMPLETED,
            payment_id=payment_id,
            description=request.description,
            metadata=request.metadata
        )
        
        # Insert payment
        await db.payments.insert_one(payment.dict())
        
        return APIResponse(
            success=True,
            data={
                "payment_id": payment_id,
                "status": "completed",
                "amount": request.amount,
                "currency": request.currency,
                "method": "card"
            },
            message="Card payment processed successfully"
        )
    except Exception as e:
        logging.error(f"Card payment error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/payments/paypal-create", response_model=APIResponse)
async def create_paypal_order(
    request: PaymentCreateRequest,
    current_user: User = Depends(get_current_user)
):
    """Create PayPal order"""
    try:
        # Create PayPal order (simplified)
        order_id = f"paypal_order_{int(datetime.utcnow().timestamp())}_{uuid.uuid4().hex[:8]}"
        
        # Create payment record
        payment = Payment(
            user_id=current_user.id,
            orchard_id=request.orchard_id,
            payment_type=request.payment_type,
            amount=request.amount,
            currency=request.currency,
            method=request.method,
            status=PaymentStatus.PENDING,
            order_id=order_id,
            description=request.description,
            metadata=request.metadata
        )
        
        # Insert payment
        await db.payments.insert_one(payment.dict())
        
        return APIResponse(
            success=True,
            data={
                "order_id": order_id,
                "approval_url": f"https://paypal.com/checkoutnow?token={order_id}",
                "amount": request.amount,
                "currency": request.currency
            },
            message="PayPal order created successfully"
        )
    except Exception as e:
        logging.error(f"PayPal create order error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/payments/paypal-capture", response_model=APIResponse)
async def capture_paypal_order(
    order_id: str,
    current_user: User = Depends(get_current_user)
):
    """Capture PayPal order"""
    try:
        # Find payment by order_id
        payment_doc = await db.payments.find_one({"order_id": order_id, "user_id": current_user.id})
        if not payment_doc:
            raise HTTPException(status_code=404, detail="Payment not found")
        
        # Update payment status
        payment_id = f"paypal_capture_{int(datetime.utcnow().timestamp())}_{uuid.uuid4().hex[:8]}"
        
        await db.payments.update_one(
            {"order_id": order_id},
            {
                "$set": {
                    "status": PaymentStatus.COMPLETED,
                    "payment_id": payment_id,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        return APIResponse(
            success=True,
            data={
                "payment_id": payment_id,
                "status": "completed",
                "order_id": order_id
            },
            message="PayPal payment captured successfully"
        )
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"PayPal capture error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Analytics endpoints
@api_router.get("/analytics/categories", response_model=APIResponse)
async def get_category_analytics(
    category: Optional[GiftCategory] = Query(None),
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
    analytics_type: str = Query("all", alias="type"),
    current_user: User = Depends(get_current_user)
):
    """Get category analytics"""
    try:
        # Check if user has admin role (simplified)
        if current_user.role != UserRole.ADMIN:
            raise HTTPException(status_code=403, detail="Admin access required")
        
        # Generate mock analytics data based on type
        if analytics_type == "performance":
            data = await generate_performance_analytics(category)
        elif analytics_type == "insights":
            data = await generate_insights_analytics(category)
        elif analytics_type == "comparison":
            data = await generate_comparison_analytics()
        elif analytics_type == "trending":
            data = await generate_trending_analytics()
        elif analytics_type == "specific":
            if not category:
                raise HTTPException(status_code=400, detail="Category required for specific analytics")
            data = await generate_specific_analytics(category, start_date, end_date)
        else:
            data = await generate_all_analytics(start_date, end_date)
        
        return APIResponse(
            success=True,
            data=data,
            message="Analytics retrieved successfully"
        )
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Analytics error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/analytics/categories", response_model=APIResponse)
async def update_analytics(current_user: User = Depends(get_current_user)):
    """Update analytics (admin only)"""
    try:
        # Check if user has admin role
        if current_user.role != UserRole.ADMIN:
            raise HTTPException(status_code=403, detail="Admin access required")
        
        # Update analytics (simplified)
        await update_daily_analytics()
        
        return APIResponse(
            success=True,
            data={"message": "Analytics updated successfully"},
            message="Analytics updated successfully"
        )
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Update analytics error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Analytics helper functions
async def generate_performance_analytics(category: Optional[GiftCategory] = None):
    """Generate performance analytics"""
    # Mock data for demonstration
    return [
        {
            "category": "The Gift of Technology",
            "lifetime_orchards": 156,
            "lifetime_bestowed": 2450000,
            "current_orchards": 23,
            "current_bestowed": 345000,
            "orchards_trend": 15.2,
            "bestowed_trend": 28.5,
            "popularity_rank": 1,
            "success_rank": 2,
            "growth_rank": 1
        },
        {
            "category": "The Gift of Vehicles",
            "lifetime_orchards": 89,
            "lifetime_bestowed": 1890000,
            "current_orchards": 12,
            "current_bestowed": 280000,
            "orchards_trend": -5.1,
            "bestowed_trend": 12.3,
            "popularity_rank": 2,
            "success_rank": 1,
            "growth_rank": 4
        }
    ]

async def generate_insights_analytics(category: Optional[GiftCategory] = None):
    """Generate insights analytics"""
    return {
        "peak_performance": "Technology and Property categories show highest success rates",
        "growth_opportunity": "Wellness and Energy categories have 40%+ growth potential",
        "market_demand": "Vehicle and Property orchards receive 3x more views"
    }

async def generate_comparison_analytics():
    """Generate comparison analytics"""
    return {
        "top_categories": ["Technology", "Vehicles", "Property"],
        "growth_leaders": ["Property", "Technology", "Energy"],
        "underperforming": ["DIY", "Custom Made"]
    }

async def generate_trending_analytics():
    """Generate trending analytics"""
    return [
        {"category": "The Gift of Property", "trend": 45.2, "current_value": 520000},
        {"category": "The Gift of Technology", "trend": 28.5, "current_value": 345000},
        {"category": "The Gift of Energy", "trend": 18.7, "current_value": 125000}
    ]

async def generate_specific_analytics(category: GiftCategory, start_date: Optional[str], end_date: Optional[str]):
    """Generate specific category analytics"""
    return {
        "category": category,
        "total_orchards": 45,
        "completed_orchards": 23,
        "total_bestowed": 750000,
        "average_completion_time": 32,
        "success_rate": 85.2
    }

async def generate_all_analytics(start_date: Optional[str], end_date: Optional[str]):
    """Generate all analytics"""
    return {
        "total_orchards": 567,
        "active_orchards": 234,
        "completed_orchards": 333,
        "total_bestowed": 8500000,
        "total_users": 1247,
        "growth_rate": 23.5
    }

async def update_daily_analytics():
    """Update daily analytics"""
    # This would typically aggregate data from orchards, payments, etc.
    analytics = Analytics(
        date=datetime.utcnow(),
        total_orchards=567,
        new_orchards=12,
        completed_orchards=333,
        active_orchards=234,
        total_seed_value=8500000,
        total_bestowed=7200000,
        completion_rate=85.2,
        total_bestowals=2341,
        unique_bestowers=891,
        total_views=15678,
        success_rate=84.7
    )
    
    await db.analytics.insert_one(analytics.dict())

# Include the router in the main app
app.include_router(api_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close database connection on shutdown"""
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)