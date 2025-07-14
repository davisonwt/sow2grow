#!/usr/bin/env python3
"""
Comprehensive Orchard Creation API Testing
Tests the POST /api/orchards endpoint with complete validation and edge cases
"""

import requests
import sys
import json
import base64
from datetime import datetime
from typing import Dict, Any, Optional

class OrchardCreationTester:
    def __init__(self, base_url: str = "https://864da651-da13-4e06-9ea7-4e5dc9dde4c3.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.access_token = None
        self.user_id = None
        self.test_user_email = f"orchard_test_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com"
        self.test_password = "OrchardTest123!"
        self.tests_run = 0
        self.tests_passed = 0
        
        print(f"🌱 Orchard Creation API Tester")
        print(f"📡 Testing against: {self.base_url}")
        print(f"👤 Test user: {self.test_user_email}")
        print("=" * 80)

    def log_test(self, name: str, success: bool, details: str = ""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED {details}")
        else:
            print(f"❌ {name} - FAILED {details}")

    def make_request(self, method: str, endpoint: str, data: Optional[Dict] = None, 
                    expected_status: int = 200, use_auth: bool = False) -> tuple[bool, Dict]:
        """Make HTTP request and return success status and response data"""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        headers = {'Content-Type': 'application/json'}
        
        if use_auth and self.access_token:
            headers['Authorization'] = f'Bearer {self.access_token}'

        try:
            if method.upper() == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=15)
            else:
                return False, {"error": f"Unsupported method: {method}"}

            success = response.status_code == expected_status
            
            try:
                response_data = response.json()
            except:
                response_data = {"raw_response": response.text, "status_code": response.status_code}
            
            return success, response_data
            
        except requests.exceptions.RequestException as e:
            return False, {"error": str(e)}

    def setup_test_user(self):
        """Setup test user and get authentication token"""
        print("🔧 Setting up test user...")
        
        # Register user
        user_data = {
            "email": self.test_user_email,
            "password": self.test_password,
            "first_name": "Orchard",
            "last_name": "Tester",
            "location": "Test Farm",
            "phone": "+1234567890"
        }
        
        success, response = self.make_request('POST', '/auth/register', user_data, 200)
        
        if success and response.get('success'):
            data = response.get('data', {})
            self.access_token = data.get('access_token')
            user_info = data.get('user', {})
            self.user_id = user_info.get('id')
            print(f"✅ Test user created successfully")
            return True
        else:
            print(f"❌ Failed to create test user: {response}")
            return False

    def generate_base64_image(self, size: str = "small") -> str:
        """Generate a base64 encoded test image"""
        if size == "small":
            # Small 1x1 pixel PNG
            png_data = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\tpHYs\x00\x00\x0b\x13\x00\x00\x0b\x13\x01\x00\x9a\x9c\x18\x00\x00\x00\nIDATx\x9cc\xf8\x00\x00\x00\x01\x00\x01\x00\x00\x00\x00IEND\xaeB`\x82'
        elif size == "large":
            # Simulate large image with repeated data
            png_data = b'\x89PNG\r\n\x1a\n' + b'A' * 50000  # ~50KB of data
        else:
            png_data = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde'
        
        return base64.b64encode(png_data).decode('utf-8')

    def generate_base64_video(self) -> str:
        """Generate a base64 encoded test video"""
        # Minimal MP4 header simulation
        mp4_data = b'\x00\x00\x00\x20ftypmp41\x00\x00\x00\x00mp41isom' + b'V' * 1000
        return base64.b64encode(mp4_data).decode('utf-8')

    def test_complete_orchard_creation(self):
        """Test complete orchard creation with all fields including media"""
        orchard_data = {
            "title": "Complete Test Orchard with Media",
            "description": "A comprehensive test orchard with all fields populated including media uploads",
            "category": "The Gift of Technology",
            "seed_value": 15000.0,
            "pocket_price": 150.0,
            "location": "Silicon Valley, CA",
            "timeline": "8 months development cycle",
            "why_needed": "To test the complete orchard creation functionality with media upload capabilities",
            "community_impact": "Will enable thorough testing of the platform's media handling and orchard creation workflow",
            "features": [
                "Advanced media upload testing",
                "Complete validation testing", 
                "Edge case handling",
                "Response structure validation"
            ],
            "images": [
                f"data:image/png;base64,{self.generate_base64_image('small')}",
                f"data:image/png;base64,{self.generate_base64_image('small')}",
                f"data:image/png;base64,{self.generate_base64_image('small')}"
            ],
            "video_url": f"data:video/mp4;base64,{self.generate_base64_video()}"
        }
        
        success, response = self.make_request('POST', '/orchards', orchard_data, 200, use_auth=True)
        
        # Validate response structure
        response_valid = False
        orchard_id = None
        if success and response.get('success'):
            data = response.get('data', {})
            orchard_id = data.get('id')
            
            # Check APIResponse structure
            required_fields = ['success', 'data', 'message', 'timestamp', 'request_id']
            structure_valid = all(field in response for field in required_fields)
            
            # Check orchard data structure
            orchard_fields = ['id', 'user_id', 'title', 'description', 'category', 'seed_value', 
                            'pocket_price', 'total_pockets', 'images', 'video_url']
            data_valid = all(field in data for field in orchard_fields)
            
            # Check calculations
            expected_pockets = int(orchard_data['seed_value'] / orchard_data['pocket_price'])
            pockets_valid = data.get('total_pockets') == expected_pockets
            
            response_valid = structure_valid and data_valid and pockets_valid and orchard_id
        
        self.log_test("Complete Orchard Creation with Media", success and response_valid,
                     f"- ID: {orchard_id[:8] if orchard_id else 'None'}..., Structure: {'✓' if response_valid else '✗'}")
        return success and response_valid

    def test_missing_required_fields(self):
        """Test validation for missing required fields"""
        required_fields = ['title', 'description', 'why_needed', 'community_impact']
        
        base_data = {
            "title": "Test Orchard",
            "description": "Test description",
            "category": "The Gift of Technology",
            "seed_value": 15000.0,
            "pocket_price": 150.0,
            "why_needed": "For testing",
            "community_impact": "Testing impact",
            "features": ["Test feature"],
            "images": [],
            "video_url": None
        }
        
        all_tests_passed = True
        
        for field in required_fields:
            test_data = base_data.copy()
            del test_data[field]  # Remove required field
            
            success, response = self.make_request('POST', '/orchards', test_data, 422, use_auth=True)
            
            # Should fail with 422 validation error
            validation_error = success and not response.get('success', True)
            
            if not validation_error:
                all_tests_passed = False
                
            self.log_test(f"Missing {field} Validation", validation_error,
                         f"- Expected 422, got {response.get('status_code', 'unknown')}")
        
        return all_tests_passed

    def test_invalid_seed_value(self):
        """Test validation for invalid seed_value"""
        base_data = {
            "title": "Test Orchard",
            "description": "Test description", 
            "category": "The Gift of Technology",
            "pocket_price": 150.0,
            "why_needed": "For testing",
            "community_impact": "Testing impact"
        }
        
        invalid_values = [0, -1000, -0.01]
        all_tests_passed = True
        
        for invalid_value in invalid_values:
            test_data = base_data.copy()
            test_data['seed_value'] = invalid_value
            
            success, response = self.make_request('POST', '/orchards', test_data, 422, use_auth=True)
            validation_error = success and not response.get('success', True)
            
            if not validation_error:
                all_tests_passed = False
                
            self.log_test(f"Invalid seed_value ({invalid_value}) Validation", validation_error,
                         f"- Expected 422, got {response.get('status_code', 'unknown')}")
        
        return all_tests_passed

    def test_invalid_pocket_price(self):
        """Test validation for invalid pocket_price"""
        base_data = {
            "title": "Test Orchard",
            "description": "Test description",
            "category": "The Gift of Technology", 
            "seed_value": 15000.0,
            "why_needed": "For testing",
            "community_impact": "Testing impact"
        }
        
        invalid_values = [0, -150, -0.01]
        all_tests_passed = True
        
        for invalid_value in invalid_values:
            test_data = base_data.copy()
            test_data['pocket_price'] = invalid_value
            
            success, response = self.make_request('POST', '/orchards', test_data, 422, use_auth=True)
            validation_error = success and not response.get('success', True)
            
            if not validation_error:
                all_tests_passed = False
                
            self.log_test(f"Invalid pocket_price ({invalid_value}) Validation", validation_error,
                         f"- Expected 422, got {response.get('status_code', 'unknown')}")
        
        return all_tests_passed

    def test_invalid_category(self):
        """Test validation for invalid category values"""
        base_data = {
            "title": "Test Orchard",
            "description": "Test description",
            "seed_value": 15000.0,
            "pocket_price": 150.0,
            "why_needed": "For testing",
            "community_impact": "Testing impact"
        }
        
        invalid_categories = ["Invalid Category", "Technology", "Gift of Tech", ""]
        all_tests_passed = True
        
        for invalid_category in invalid_categories:
            test_data = base_data.copy()
            test_data['category'] = invalid_category
            
            success, response = self.make_request('POST', '/orchards', test_data, 422, use_auth=True)
            validation_error = success and not response.get('success', True)
            
            if not validation_error:
                all_tests_passed = False
                
            self.log_test(f"Invalid category ('{invalid_category}') Validation", validation_error,
                         f"- Expected 422, got {response.get('status_code', 'unknown')}")
        
        return all_tests_passed

    def test_empty_images_array(self):
        """Test with empty images array (should be allowed)"""
        orchard_data = {
            "title": "Test Orchard - No Images",
            "description": "Test orchard with empty images array",
            "category": "The Gift of Technology",
            "seed_value": 15000.0,
            "pocket_price": 150.0,
            "why_needed": "Testing empty images handling",
            "community_impact": "Validates optional media handling",
            "features": ["No images test"],
            "images": [],  # Empty array
            "video_url": None
        }
        
        success, response = self.make_request('POST', '/orchards', orchard_data, 200, use_auth=True)
        
        # Should succeed with empty images
        empty_images_valid = success and response.get('success')
        
        self.log_test("Empty Images Array", empty_images_valid,
                     f"- Empty images allowed: {'✓' if empty_images_valid else '✗'}")
        return empty_images_valid

    def test_missing_video_url(self):
        """Test with missing video_url (should be optional)"""
        orchard_data = {
            "title": "Test Orchard - No Video",
            "description": "Test orchard without video_url field",
            "category": "The Gift of Technology",
            "seed_value": 15000.0,
            "pocket_price": 150.0,
            "why_needed": "Testing optional video handling",
            "community_impact": "Validates optional video field",
            "features": ["No video test"],
            "images": [f"data:image/png;base64,{self.generate_base64_image('small')}"]
            # video_url intentionally omitted
        }
        
        success, response = self.make_request('POST', '/orchards', orchard_data, 200, use_auth=True)
        
        # Should succeed without video_url
        no_video_valid = success and response.get('success')
        
        self.log_test("Missing video_url (Optional)", no_video_valid,
                     f"- Optional video handling: {'✓' if no_video_valid else '✗'}")
        return no_video_valid

    def test_large_base64_strings(self):
        """Test with very large base64 strings"""
        orchard_data = {
            "title": "Test Orchard - Large Media",
            "description": "Test orchard with large base64 media",
            "category": "The Gift of Technology",
            "seed_value": 15000.0,
            "pocket_price": 150.0,
            "why_needed": "Testing large media handling",
            "community_impact": "Validates large file processing",
            "features": ["Large media test"],
            "images": [
                f"data:image/png;base64,{self.generate_base64_image('large')}",
                f"data:image/png;base64,{self.generate_base64_image('large')}"
            ],
            "video_url": f"data:video/mp4;base64,{self.generate_base64_video()}"
        }
        
        success, response = self.make_request('POST', '/orchards', orchard_data, 200, use_auth=True)
        
        # Should handle large files (or fail gracefully)
        large_media_handled = success and response.get('success')
        
        self.log_test("Large Base64 Strings", large_media_handled,
                     f"- Large media handling: {'✓' if large_media_handled else '✗'}")
        return large_media_handled

    def test_invalid_base64_format(self):
        """Test with invalid base64 format"""
        orchard_data = {
            "title": "Test Orchard - Invalid Base64",
            "description": "Test orchard with invalid base64 data",
            "category": "The Gift of Technology",
            "seed_value": 15000.0,
            "pocket_price": 150.0,
            "why_needed": "Testing invalid base64 handling",
            "community_impact": "Validates base64 validation",
            "features": ["Invalid base64 test"],
            "images": [
                "data:image/png;base64,invalid_base64_data!!!",
                "not_even_data_url_format"
            ],
            "video_url": "data:video/mp4;base64,also_invalid_base64!!!"
        }
        
        success, response = self.make_request('POST', '/orchards', orchard_data, 200, use_auth=True)
        
        # Should either succeed (if validation is lenient) or fail gracefully
        # The key is that it shouldn't crash the server
        invalid_base64_handled = success or (not success and 'error' in response)
        
        self.log_test("Invalid Base64 Format", invalid_base64_handled,
                     f"- Invalid base64 handled: {'✓' if invalid_base64_handled else '✗'}")
        return invalid_base64_handled

    def test_without_authentication(self):
        """Test orchard creation without authentication token"""
        orchard_data = {
            "title": "Unauthorized Test Orchard",
            "description": "This should fail without auth",
            "category": "The Gift of Technology",
            "seed_value": 15000.0,
            "pocket_price": 150.0,
            "why_needed": "Testing auth requirement",
            "community_impact": "Should be blocked"
        }
        
        success, response = self.make_request('POST', '/orchards', orchard_data, 401, use_auth=False)
        
        # Should fail with 401 Unauthorized
        auth_required = success and not response.get('success', True)
        
        self.log_test("Authentication Required", auth_required,
                     f"- 401 returned: {'✓' if auth_required else '✗'}")
        return auth_required

    def test_response_structure(self):
        """Test that response follows APIResponse format"""
        orchard_data = {
            "title": "Response Structure Test",
            "description": "Testing response format",
            "category": "The Gift of Technology",
            "seed_value": 15000.0,
            "pocket_price": 150.0,
            "why_needed": "Testing response structure",
            "community_impact": "Validates API response format"
        }
        
        success, response = self.make_request('POST', '/orchards', orchard_data, 200, use_auth=True)
        
        structure_valid = False
        if success:
            # Check APIResponse structure
            required_fields = ['success', 'data', 'message', 'timestamp', 'request_id']
            structure_valid = all(field in response for field in required_fields)
            
            # Check data types
            if structure_valid:
                structure_valid = (
                    isinstance(response['success'], bool) and
                    isinstance(response['data'], dict) and
                    isinstance(response['message'], str) and
                    isinstance(response['timestamp'], str) and
                    isinstance(response['request_id'], str)
                )
        
        self.log_test("APIResponse Structure", structure_valid,
                     f"- All required fields present: {'✓' if structure_valid else '✗'}")
        return structure_valid

    def run_all_tests(self):
        """Run all orchard creation tests"""
        print("\n🚀 Starting comprehensive orchard creation testing...\n")
        
        # Setup
        if not self.setup_test_user():
            print("❌ Failed to setup test user. Aborting tests.")
            return 1
        
        print()
        
        # Test cases
        tests = [
            ("Complete Orchard Creation with Media", self.test_complete_orchard_creation),
            ("Missing Required Fields Validation", self.test_missing_required_fields),
            ("Invalid seed_value Validation", self.test_invalid_seed_value),
            ("Invalid pocket_price Validation", self.test_invalid_pocket_price),
            ("Invalid Category Validation", self.test_invalid_category),
            ("Empty Images Array", self.test_empty_images_array),
            ("Missing video_url (Optional)", self.test_missing_video_url),
            ("Large Base64 Strings", self.test_large_base64_strings),
            ("Invalid Base64 Format", self.test_invalid_base64_format),
            ("Authentication Required", self.test_without_authentication),
            ("APIResponse Structure", self.test_response_structure),
        ]
        
        for test_name, test_func in tests:
            try:
                test_func()
            except Exception as e:
                self.log_test(test_name, False, f"- Exception: {str(e)}")
            print()  # Add spacing between tests
        
        # Print final results
        print("=" * 80)
        print(f"📊 ORCHARD CREATION API TEST RESULTS:")
        print(f"✅ Tests Passed: {self.tests_passed}")
        print(f"❌ Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"📈 Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 ALL ORCHARD CREATION TESTS PASSED!")
            return 0
        else:
            print("⚠️  Some orchard creation tests failed. Check details above.")
            return 1

def main():
    """Main function to run the orchard creation tests"""
    tester = OrchardCreationTester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())