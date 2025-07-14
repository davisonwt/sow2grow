#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Sow2Grow Farm Mall Platform
Tests all API endpoints including authentication, orchards, payments, and analytics
"""

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any, Optional

class Sow2GrowAPITester:
    def __init__(self, base_url: str = "https://864da651-da13-4e06-9ea7-4e5dc9dde4c3.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.access_token = None
        self.user_id = None
        self.test_user_email = f"test_user_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com"
        self.test_password = "TestPass123!"
        self.tests_run = 0
        self.tests_passed = 0
        self.created_orchard_id = None
        
        print(f"🌱 Sow2Grow Farm Mall API Tester")
        print(f"📡 Testing against: {self.base_url}")
        print(f"👤 Test user: {self.test_user_email}")
        print("=" * 60)

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
            if method.upper() == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method.upper() == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method.upper() == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, timeout=10)
            elif method.upper() == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method.upper() == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)
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

    def test_api_health(self):
        """Test API health check"""
        success, response = self.make_request('GET', '/')
        self.log_test("API Health Check", success, 
                     f"- {response.get('message', 'No message')}" if success else f"- {response.get('error', 'Unknown error')}")
        return success

    def test_user_registration(self):
        """Test user registration"""
        user_data = {
            "email": self.test_user_email,
            "password": self.test_password,
            "first_name": "Test",
            "last_name": "User",
            "location": "Test City",
            "phone": "+1234567890"
        }
        
        success, response = self.make_request('POST', '/auth/register', user_data, 200)
        
        if success and response.get('success'):
            data = response.get('data', {})
            self.access_token = data.get('access_token')
            user_info = data.get('user', {})
            self.user_id = user_info.get('id')
            
        self.log_test("User Registration", success and self.access_token is not None,
                     f"- Token: {'✓' if self.access_token else '✗'}")
        return success

    def test_user_login(self):
        """Test user login"""
        login_data = {
            "email": self.test_user_email,
            "password": self.test_password
        }
        
        success, response = self.make_request('POST', '/auth/login', login_data, 200)
        
        if success and response.get('success'):
            data = response.get('data', {})
            login_token = data.get('access_token')
            success = login_token == self.access_token
            
        self.log_test("User Login", success, f"- Token validation: {'✓' if success else '✗'}")
        return success

    def test_get_user_profile(self):
        """Test getting user profile"""
        success, response = self.make_request('GET', '/users/me', use_auth=True)
        
        profile_valid = False
        if success and response.get('success'):
            data = response.get('data', {})
            profile_valid = data.get('email') == self.test_user_email
            
        self.log_test("Get User Profile", success and profile_valid,
                     f"- Email match: {'✓' if profile_valid else '✗'}")
        return success

    def test_update_user_profile(self):
        """Test updating user profile"""
        update_data = {
            "first_name": "Updated",
            "last_name": "TestUser",
            "location": "Updated City"
        }
        
        success, response = self.make_request('PATCH', '/users/me', update_data, use_auth=True)
        
        update_valid = False
        if success and response.get('success'):
            data = response.get('data', {})
            update_valid = data.get('first_name') == "Updated"
            
        self.log_test("Update User Profile", success and update_valid,
                     f"- Name updated: {'✓' if update_valid else '✗'}")
        return success

    def test_paypal_account_operations(self):
        """Test PayPal account CRUD operations"""
        # Test creating PayPal account
        paypal_data = {
            "email": "test.paypal@example.com",
            "account_type": "personal",
            "first_name": "Test",
            "last_name": "PayPal",
            "country": "US",
            "currency": "USD"
        }
        
        success, response = self.make_request('POST', '/users/paypal-account', paypal_data, use_auth=True)
        create_success = success and response.get('success')
        
        # Test getting PayPal account
        get_success, get_response = self.make_request('GET', '/users/paypal-account', use_auth=True)
        get_valid = get_success and get_response.get('data', {}).get('email') == paypal_data['email']
        
        # Test verifying PayPal account
        verify_success, verify_response = self.make_request('POST', '/users/paypal-account/verify', use_auth=True)
        verify_valid = verify_success and verify_response.get('data', {}).get('verified') == True
        
        overall_success = create_success and get_valid and verify_valid
        self.log_test("PayPal Account Operations", overall_success,
                     f"- Create: {'✓' if create_success else '✗'}, Get: {'✓' if get_valid else '✗'}, Verify: {'✓' if verify_valid else '✗'}")
        return overall_success

    def test_create_orchard(self):
        """Test creating an orchard"""
        orchard_data = {
            "title": "Test Technology Orchard",
            "description": "A test orchard for technology funding",
            "category": "The Gift of Technology",
            "seed_value": 15000.0,
            "pocket_price": 150.0,
            "location": "Test Location",
            "timeline": "6 months",
            "why_needed": "To test the orchard creation functionality",
            "community_impact": "Will help test the platform",
            "features": ["Feature 1", "Feature 2", "Feature 3"],
            "images": ["https://example.com/image1.jpg"],
            "video_url": "https://example.com/video.mp4"
        }
        
        success, response = self.make_request('POST', '/orchards', orchard_data, use_auth=True)
        
        if success and response.get('success'):
            data = response.get('data', {})
            self.created_orchard_id = data.get('id')
            total_pockets = data.get('total_pockets')
            expected_pockets = int(orchard_data['seed_value'] / orchard_data['pocket_price'])
            pockets_valid = total_pockets == expected_pockets
        else:
            pockets_valid = False
            
        self.log_test("Create Orchard", success and self.created_orchard_id is not None,
                     f"- ID: {self.created_orchard_id[:8] if self.created_orchard_id else 'None'}..., Pockets: {'✓' if pockets_valid else '✗'}")
        return success

    def test_get_orchards(self):
        """Test getting orchards list"""
        success, response = self.make_request('GET', '/orchards')
        
        orchards_found = False
        if success and response.get('success'):
            data = response.get('data', [])
            orchards_found = len(data) > 0
            
        self.log_test("Get Orchards List", success,
                     f"- Found {len(response.get('data', [])) if success else 0} orchards")
        return success

    def test_get_specific_orchard(self):
        """Test getting specific orchard"""
        if not self.created_orchard_id:
            self.log_test("Get Specific Orchard", False, "- No orchard ID available")
            return False
            
        success, response = self.make_request('GET', f'/orchards/{self.created_orchard_id}')
        
        orchard_valid = False
        if success and response.get('success'):
            data = response.get('data', {})
            orchard_valid = data.get('id') == self.created_orchard_id
            
        self.log_test("Get Specific Orchard", success and orchard_valid,
                     f"- ID match: {'✓' if orchard_valid else '✗'}")
        return success

    def test_bestow_into_orchard(self):
        """Test bestowing into orchard (selecting pockets)"""
        if not self.created_orchard_id:
            self.log_test("Bestow Into Orchard", False, "- No orchard ID available")
            return False
            
        bestow_data = {
            "orchard_id": self.created_orchard_id,
            "pocket_numbers": [1, 2, 3]
        }
        
        success, response = self.make_request('POST', f'/orchards/{self.created_orchard_id}/bestow', 
                                            bestow_data, use_auth=True)
        
        bestow_valid = False
        if success and response.get('success'):
            data = response.get('data', {})
            pockets_selected = data.get('pockets_selected')
            bestow_valid = pockets_selected == len(bestow_data['pocket_numbers'])
            
        self.log_test("Bestow Into Orchard", success and bestow_valid,
                     f"- Pockets selected: {response.get('data', {}).get('pockets_selected', 0)}")
        return success

    def test_payment_operations(self):
        """Test payment operations"""
        # Test card payment
        card_payment_data = {
            "orchard_id": self.created_orchard_id,
            "payment_type": "orchard_bestowal",
            "amount": 450.0,
            "currency": "USD",
            "method": "card",
            "description": "Test card payment for orchard bestowal"
        }
        
        card_success, card_response = self.make_request('POST', '/payments/card', 
                                                       card_payment_data, use_auth=True)
        
        # Test PayPal order creation
        paypal_payment_data = {
            "orchard_id": self.created_orchard_id,
            "payment_type": "orchard_bestowal",
            "amount": 300.0,
            "currency": "USD",
            "method": "paypal",
            "description": "Test PayPal payment for orchard bestowal"
        }
        
        paypal_success, paypal_response = self.make_request('POST', '/payments/paypal-create',
                                                           paypal_payment_data, use_auth=True)
        
        # Test PayPal capture (if order was created)
        capture_success = False
        if paypal_success and paypal_response.get('success'):
            order_id = paypal_response.get('data', {}).get('order_id')
            if order_id:
                capture_success, _ = self.make_request('POST', f'/payments/paypal-capture?order_id={order_id}',
                                                      use_auth=True)
        
        overall_success = card_success and paypal_success and capture_success
        self.log_test("Payment Operations", overall_success,
                     f"- Card: {'✓' if card_success else '✗'}, PayPal: {'✓' if paypal_success else '✗'}, Capture: {'✓' if capture_success else '✗'}")
        return overall_success

    def test_analytics_endpoints(self):
        """Test analytics endpoints (requires admin role)"""
        # Note: This will likely fail since our test user is not admin
        success, response = self.make_request('GET', '/analytics/categories', use_auth=True, expected_status=403)
        
        # We expect 403 for non-admin users, so success means we got the expected error
        admin_check_success = success  # 403 is expected for non-admin
        
        self.log_test("Analytics Access Control", admin_check_success,
                     f"- Non-admin blocked: {'✓' if admin_check_success else '✗'}")
        return admin_check_success

    def test_email_verification_system(self):
        """Test email verification endpoints"""
        # Test resend verification email
        resend_success, resend_response = self.make_request('POST', '/auth/resend-verification', use_auth=True)
        
        # Test verify email with invalid code
        verify_data = {"verification_code": "123456"}
        verify_fail_success, verify_fail_response = self.make_request('POST', '/auth/verify-email', 
                                                                     verify_data, expected_status=400, use_auth=True)
        
        # Test verify email with valid code (we can't get the real code, so we test the endpoint structure)
        verify_structure_valid = verify_fail_success and "verification_code" in str(verify_fail_response)
        
        overall_success = resend_success and verify_structure_valid
        self.log_test("Email Verification System", overall_success,
                     f"- Resend: {'✓' if resend_success else '✗'}, Verify endpoint: {'✓' if verify_structure_valid else '✗'}")
        return overall_success

    def test_bestowal_tracking_system(self):
        """Test bestowal tracking endpoints"""
        if not self.created_orchard_id:
            self.log_test("Bestowal Tracking System", False, "- No orchard ID available")
            return False
        
        # Test create bestowment
        bestowment_data = {
            "orchard_id": self.created_orchard_id,
            "pocket_numbers": [4, 5, 6],
            "payment_method": "paypal",
            "notes": "Test bestowment for tracking system"
        }
        
        create_success, create_response = self.make_request('POST', '/bestowments', 
                                                          bestowment_data, use_auth=True)
        
        # Test get user bestowments (history)
        history_success, history_response = self.make_request('GET', '/bestowments', use_auth=True)
        
        # Test get received bestowments
        received_success, received_response = self.make_request('GET', '/bestowments/received', use_auth=True)
        
        # Test bestowment stats
        stats_success, stats_response = self.make_request('GET', '/bestowments/stats', use_auth=True)
        
        # Validate financial calculations if bestowment was created
        financial_valid = False
        if create_success and create_response.get('success'):
            data = create_response.get('data', {})
            total_amount = data.get('total_amount', 0)
            tithing_amount = data.get('tithing_amount', 0)
            processing_fee = data.get('processing_fee', 0)
            net_amount = data.get('net_amount_to_grower', 0)
            
            # Validate 10% tithing and 6% processing fee calculations
            expected_original = total_amount / 1.16  # Remove fees to get original
            expected_tithing = expected_original * 0.10
            expected_processing = total_amount * 0.06
            expected_net = total_amount - expected_tithing - expected_processing
            
            tithing_valid = abs(tithing_amount - expected_tithing) < 0.01
            processing_valid = abs(processing_fee - expected_processing) < 0.01
            net_valid = abs(net_amount - expected_net) < 0.01
            
            financial_valid = tithing_valid and processing_valid and net_valid
        
        overall_success = create_success and history_success and received_success and stats_success and financial_valid
        self.log_test("Bestowal Tracking System", overall_success,
                     f"- Create: {'✓' if create_success else '✗'}, History: {'✓' if history_success else '✗'}, Received: {'✓' if received_success else '✗'}, Stats: {'✓' if stats_success else '✗'}, Financial: {'✓' if financial_valid else '✗'}")
        return overall_success

    def test_financial_calculations(self):
        """Test financial calculations for tithing and processing fees"""
        if not self.created_orchard_id:
            self.log_test("Financial Calculations", False, "- No orchard ID available")
            return False
        
        # Test different pocket amounts to verify calculations
        test_cases = [
            {"pockets": [7], "expected_count": 1},
            {"pockets": [8, 9], "expected_count": 2},
            {"pockets": [10, 11, 12], "expected_count": 3}
        ]
        
        all_calculations_valid = True
        
        for i, test_case in enumerate(test_cases):
            bestowment_data = {
                "orchard_id": self.created_orchard_id,
                "pocket_numbers": test_case["pockets"],
                "payment_method": "card",
                "notes": f"Financial calculation test {i+1}"
            }
            
            success, response = self.make_request('POST', '/bestowments', 
                                                bestowment_data, use_auth=True)
            
            if success and response.get('success'):
                data = response.get('data', {})
                pocket_count = test_case["expected_count"]
                
                # Assuming pocket_price is 150.0 from orchard creation
                expected_total = pocket_count * 150.0
                actual_total = data.get('total_amount', 0)
                
                if abs(actual_total - expected_total) > 0.01:
                    all_calculations_valid = False
                    break
                    
                # Validate percentage calculations
                tithing_amount = data.get('tithing_amount', 0)
                processing_fee = data.get('processing_fee', 0)
                
                # Calculate expected values
                original_amount = expected_total / 1.16
                expected_tithing = original_amount * 0.10
                expected_processing = expected_total * 0.06
                
                if (abs(tithing_amount - expected_tithing) > 0.01 or 
                    abs(processing_fee - expected_processing) > 0.01):
                    all_calculations_valid = False
                    break
            else:
                all_calculations_valid = False
                break
        
        self.log_test("Financial Calculations", all_calculations_valid,
                     f"- Tested {len(test_cases)} scenarios: {'✓' if all_calculations_valid else '✗'}")
        return all_calculations_valid

    def test_orchard_email_confirmation(self):
        """Test that orchard creation sends email confirmation"""
        # Create another orchard to test email sending
        orchard_data = {
            "title": "Email Test Orchard",
            "description": "Testing email confirmation on orchard creation",
            "category": "The Gift of Innovation",
            "seed_value": 12000.0,
            "pocket_price": 150.0,
            "location": "Email Test Location",
            "timeline": "3 months",
            "why_needed": "To test email confirmation system",
            "community_impact": "Will validate email functionality",
            "features": ["Email testing", "Confirmation system"],
            "images": [],
            "video_url": None
        }
        
        success, response = self.make_request('POST', '/orchards', orchard_data, use_auth=True)
        
        # Check if response indicates email was sent
        email_sent = False
        if success and response.get('success'):
            message = response.get('message', '')
            email_sent = 'email' in message.lower() or 'confirmation' in message.lower()
        
        self.log_test("Orchard Email Confirmation", success and email_sent,
                     f"- Orchard created: {'✓' if success else '✗'}, Email indicated: {'✓' if email_sent else '✗'}")
        return success

    def test_registration_email_verification(self):
        """Test that registration sends verification email"""
        # Create a new user to test email verification
        new_user_email = f"email_test_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com"
        user_data = {
            "email": new_user_email,
            "password": "EmailTest123!",
            "first_name": "Email",
            "last_name": "Tester",
            "location": "Email Test City",
            "phone": "+1987654321"
        }
        
        success, response = self.make_request('POST', '/auth/register', user_data, 200)
        
        # Check if response indicates verification email was sent
        verification_sent = False
        if success and response.get('success'):
            data = response.get('data', {})
            message = response.get('message', '')
            verification_sent = (data.get('verification_sent') == True or 
                               'verification' in message.lower() or 
                               'email' in message.lower())
        
        self.log_test("Registration Email Verification", success and verification_sent,
                     f"- Registration: {'✓' if success else '✗'}, Verification email: {'✓' if verification_sent else '✗'}")
        return success

    def test_integration_flow(self):
        """Test complete integration flow: Register → Create Orchard → Make Bestowment"""
        # Create a new user for integration test
        integration_email = f"integration_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com"
        
        # Step 1: Register
        register_data = {
            "email": integration_email,
            "password": "Integration123!",
            "first_name": "Integration",
            "last_name": "Tester",
            "location": "Integration City"
        }
        
        register_success, register_response = self.make_request('POST', '/auth/register', register_data)
        
        if not register_success:
            self.log_test("Integration Flow", False, "- Registration failed")
            return False
        
        # Get token for new user
        integration_token = register_response.get('data', {}).get('access_token')
        if not integration_token:
            self.log_test("Integration Flow", False, "- No access token received")
            return False
        
        # Temporarily store original token
        original_token = self.access_token
        self.access_token = integration_token
        
        # Step 2: Create Orchard
        orchard_data = {
            "title": "Integration Test Orchard",
            "description": "Full integration test orchard",
            "category": "The Gift of Technology",
            "seed_value": 9000.0,
            "pocket_price": 150.0,
            "location": "Integration Location",
            "timeline": "4 months",
            "why_needed": "Integration testing",
            "community_impact": "Validates full flow",
            "features": ["Integration", "Testing"],
            "images": []
        }
        
        orchard_success, orchard_response = self.make_request('POST', '/orchards', orchard_data, use_auth=True)
        
        if not orchard_success:
            self.access_token = original_token  # Restore original token
            self.log_test("Integration Flow", False, "- Orchard creation failed")
            return False
        
        integration_orchard_id = orchard_response.get('data', {}).get('id')
        
        # Step 3: Make Bestowment (switch back to original user)
        self.access_token = original_token
        
        bestowment_data = {
            "orchard_id": integration_orchard_id,
            "pocket_numbers": [1, 2],
            "payment_method": "paypal",
            "notes": "Integration test bestowment"
        }
        
        bestowment_success, bestowment_response = self.make_request('POST', '/bestowments', 
                                                                  bestowment_data, use_auth=True)
        
        overall_success = register_success and orchard_success and bestowment_success
        self.log_test("Integration Flow", overall_success,
                     f"- Register: {'✓' if register_success else '✗'}, Orchard: {'✓' if orchard_success else '✗'}, Bestowment: {'✓' if bestowment_success else '✗'}")
        return overall_success

    def run_all_tests(self):
        """Run all API tests"""
        print("\n🚀 Starting comprehensive API testing...\n")
        
        # Core API tests
        tests = [
            ("API Health", self.test_api_health),
            ("User Registration", self.test_user_registration),
            ("User Login", self.test_user_login),
            ("Get User Profile", self.test_get_user_profile),
            ("Update User Profile", self.test_update_user_profile),
            ("PayPal Operations", self.test_paypal_account_operations),
            ("Create Orchard", self.test_create_orchard),
            ("Get Orchards List", self.test_get_orchards),
            ("Get Specific Orchard", self.test_get_specific_orchard),
            ("Bestow Into Orchard", self.test_bestow_into_orchard),
            ("Payment Operations", self.test_payment_operations),
            ("Analytics Access Control", self.test_analytics_endpoints),
        ]
        
        for test_name, test_func in tests:
            try:
                test_func()
            except Exception as e:
                self.log_test(test_name, False, f"- Exception: {str(e)}")
            print()  # Add spacing between tests
        
        # Print final results
        print("=" * 60)
        print(f"📊 FINAL RESULTS:")
        print(f"✅ Tests Passed: {self.tests_passed}")
        print(f"❌ Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"📈 Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 ALL TESTS PASSED! API is working correctly.")
            return 0
        else:
            print("⚠️  Some tests failed. Check the details above.")
            return 1

def main():
    """Main function to run the API tests"""
    tester = Sow2GrowAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())