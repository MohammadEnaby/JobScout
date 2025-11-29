# Firebase Setup Guide - Complete Authentication

## 1. Enable Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **jobscout-52b07**
3. Click **"Firestore Database"** in the left menu
4. Click **"Create database"**
5. Choose **"Start in production mode"** or **"Test mode"** (test mode for development)
6. Select a location (choose closest to your region)
7. Click **"Enable"**

## 2. Enable Email/Password Authentication

1. In Firebase Console, click **"Authentication"** in the left menu
2. Go to **"Sign-in method"** tab
3. Click on **"Email/Password"**
4. **Enable** the toggle switch
5. Click **"Save"**

## 3. Enable Google Sign-In

1. Still in **"Authentication"** → **"Sign-in method"**
2. Click on **"Google"**
3. **Enable** the toggle switch
4. Enter a **Project support email** (your email)
5. Click **"Save"**

## 4. Firestore Security Rules (Optional but Recommended)

Go to **Firestore Database** → **Rules** tab and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Admins can read all user profiles
    match /users/{userId} {
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

Click **"Publish"** to save the rules.

## 5. Your Current Configuration

Your `.env` file should have:
```env
VITE_FIREBASE_API_KEY=AIzaSyD7qVgoYEyoitxAb_TRk9AP-4CT2R4rRho
VITE_FIREBASE_AUTH_DOMAIN=jobscout-52b07.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=jobscout-52b07
VITE_FIREBASE_STORAGE_BUCKET=jobscout-52b07.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123674887654
VITE_FIREBASE_APP_ID=1:123674887654:web:a5a1e00c3864f5acc80227
```

## 6. Restart Your Development Server

After completing all the steps above, restart your server:
```bash
npm run dev
```

## What's New

✅ **Google Sign-In**: Users can now sign in with their Google account  
✅ **User Profiles**: Name and role are stored in Firestore  
✅ **Role-Based Access**: Separate UI for Admin and regular Users  
✅ **Required Field Indicators**: All required fields marked with *  
✅ **Professional Design**: Modern, gradient-based UI throughout

## Account Types

- **User**: Can browse jobs, apply, and track applications
- **Admin**: Full platform management access (distinguished with ADMIN badge)

## Testing the Flow

1. **Sign Up with Email**: Create account with name, email, password, and role
2. **Sign In with Email**: Log in with existing credentials
3. **Sign In with Google**: Quick authentication via Google account
4. **Dashboard**: View personalized dashboard based on your role
5. **Logout**: Securely sign out

---

**Note**: Make sure to enable Firestore and Google Sign-In in Firebase Console, or the app will throw errors!
