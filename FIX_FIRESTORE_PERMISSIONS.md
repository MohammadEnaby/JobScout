# 🚨 CRITICAL: Fix Firestore Permissions Error

## The Error You're Seeing:
```
⚠️ Could not save to Firestore: Missing or insufficient permissions.
```

This means **Firestore security rules are blocking write access**. Here's how to fix it:

---

## SOLUTION: Update Firestore Security Rules

### Step 1: Go to Firebase Console
1. Open: https://console.firebase.google.com/
2. Select project: **jobscout-52b07**
3. Click **"Firestore Database"** in the left sidebar

### Step 2: Update Rules
1. Click the **"Rules"** tab at the top
2. You'll see the current rules (probably in "production mode" which blocks everything)
3. **DELETE** all the existing rules
4. **COPY AND PASTE** these new rules:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write their own profile
    match /users/{userId} {
      // Anyone can create their own user document
      allow create: if request.auth != null && request.auth.uid == userId;
      
      // Users can read and update their own profile
      allow read, update: if request.auth != null && request.auth.uid == userId;
      
      // Admins can read all profiles
      allow read: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Allow any authenticated user to read all user profiles (for listings, etc.)
    match /users/{userId} {
      allow read: if request.auth != null;
    }
  }
}
```

### Step 3: Publish the Rules
1. Click the **"Publish"** button at the top
2. Wait a few seconds for the rules to apply

---

## Alternative: Quick Fix for Development (Test Mode)

If you just want to test quickly, use these **INSECURE** rules (ONLY FOR DEVELOPMENT):

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

⚠️ **WARNING**: These rules allow any authenticated user to read/write everything. Use only for testing!

---

## After Fixing Rules:

1. **Refresh your browser** (hard refresh: Ctrl+Shift+R)
2. Try signing up again
3. Look for this in console:
   ```
   ✅ User profile saved to Firestore
   ```

---

## What This Fixes:

✅ Users can now be saved to Firestore database  
✅ Google sign-in will complete successfully  
✅ User profiles (name, role) will be stored  
✅ No more "Missing or insufficient permissions" errors

---

## Why This Happened:

When you created Firestore in **"Production mode"**, it set strict rules that block all reads/writes by default. The new rules allow:
- Users to create and manage their own profiles
- Authenticated users to read other profiles (needed for the app)
- Admins to read all profiles

---

## Verify It's Working:

After updating rules, sign up with a new email and check console for:
```
🔐 Creating user account...
✅ Account created successfully
✅ Display name updated
✅ User profile saved to Firestore  ← This should appear now!
```

Then go to **Firestore Database** in Firebase Console and you should see a `users` collection with your user data!

