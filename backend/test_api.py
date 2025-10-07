#!/usr/bin/env python3
import requests
import json

# Test the deployed API
api_url = "https://mtaa-fundi-app.onrender.com/api"

def test_get_users():
    print("Testing GET /api/users...")
    try:
        response = requests.get(f"{api_url}/users")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_create_user():
    print("\nTesting POST /api/users...")
    user_data = {
        "name": "Test User",
        "email": "test@example.com", 
        "phone": "1234567890"
    }
    try:
        response = requests.post(
            f"{api_url}/users",
            headers={"Content-Type": "application/json"},
            json=user_data
        )
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        return response.status_code == 201
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    print("Testing Mtaa Fundi API...")
    test_get_users()
    test_create_user()
    test_get_users()  # Check if user was added