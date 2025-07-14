#!/usr/bin/env python3
"""
Debug Orchard Creation API Issues
"""

import requests
import json
from datetime import datetime

class OrchardDebugger:
    def __init__(self, base_url: str = "https://864da651-da13-4e06-9ea7-4e5dc9dde4c3.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.access_token = None
        self.test_user_email = f"debug_test_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com"
        self.test_password = "DebugTest123!"

    def setup_user(self):
        """Setup test user"""
        user_data = {
            "email": self.test_user_email,
            "password": self.test_password,
            "first_name": "Debug",
            "last_name": "Tester"
        }
        
        response = requests.post(f"{self.base_url}/auth/register", json=user_data)
        print(f"Registration Status: {response.status_code}")
        print(f"Registration Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                self.access_token = data.get('data', {}).get('access_token')
                print(f"✅ Got access token: {self.access_token[:20]}...")
                return True
        return False

    def test_missing_field_validation(self):
        """Test what happens with missing required fields"""
        print("\n🔍 Testing missing field validation...")
        
        # Test missing title
        data = {
            "description": "Test description",
            "category": "The Gift of Technology",
            "seed_value": 15000.0,
            "pocket_price": 150.0,
            "why_needed": "For testing",
            "community_impact": "Testing impact"
        }
        
        headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer {self.access_token}'}
        response = requests.post(f"{self.base_url}/orchards", json=data, headers=headers)
        
        print(f"Missing title - Status: {response.status_code}")
        print(f"Missing title - Response: {response.text}")

    def test_invalid_values(self):
        """Test invalid values"""
        print("\n🔍 Testing invalid values...")
        
        # Test invalid seed_value
        data = {
            "title": "Test",
            "description": "Test description",
            "category": "The Gift of Technology",
            "seed_value": -1000.0,  # Invalid
            "pocket_price": 150.0,
            "why_needed": "For testing",
            "community_impact": "Testing impact"
        }
        
        headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer {self.access_token}'}
        response = requests.post(f"{self.base_url}/orchards", json=data, headers=headers)
        
        print(f"Invalid seed_value - Status: {response.status_code}")
        print(f"Invalid seed_value - Response: {response.text}")

    def test_no_auth(self):
        """Test without authentication"""
        print("\n🔍 Testing without authentication...")
        
        data = {
            "title": "Test",
            "description": "Test description",
            "category": "The Gift of Technology",
            "seed_value": 15000.0,
            "pocket_price": 150.0,
            "why_needed": "For testing",
            "community_impact": "Testing impact"
        }
        
        headers = {'Content-Type': 'application/json'}
        response = requests.post(f"{self.base_url}/orchards", json=data, headers=headers)
        
        print(f"No auth - Status: {response.status_code}")
        print(f"No auth - Response: {response.text}")

    def test_empty_images(self):
        """Test empty images array"""
        print("\n🔍 Testing empty images array...")
        
        data = {
            "title": "Test",
            "description": "Test description",
            "category": "The Gift of Technology",
            "seed_value": 15000.0,
            "pocket_price": 150.0,
            "why_needed": "For testing",
            "community_impact": "Testing impact",
            "images": []
        }
        
        headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer {self.access_token}'}
        response = requests.post(f"{self.base_url}/orchards", json=data, headers=headers)
        
        print(f"Empty images - Status: {response.status_code}")
        print(f"Empty images - Response: {response.text}")

    def run_debug(self):
        """Run debug tests"""
        print("🐛 Starting debug tests...")
        
        if not self.setup_user():
            print("❌ Failed to setup user")
            return
        
        self.test_missing_field_validation()
        self.test_invalid_values()
        self.test_no_auth()
        self.test_empty_images()

if __name__ == "__main__":
    debugger = OrchardDebugger()
    debugger.run_debug()