# ⚠️ IMPORTANT: Enable These Features in Firebase Console

## Your authentication is NOT working because you need to enable these services:

---

## 1️⃣ Enable Email/Password Authentication

### Steps:
1. Go to: https://console.firebase.google.com/
2. Select project: **jobscout-52b07**
3. Click **"Authentication"** in left sidebar
4. Click **"Get started"** (if you see it)
5. Go to **"Sign-in method"** tab
6. Find **"Email/Password"** in the list
7. Click on it
8. **TURN ON** the toggle switch
9. Click **"Save"**

✅ After this: Email/Password signup and login will work!

---

## 2️⃣ Enable Google Sign-In

### Steps:
1. Still in **"Sign-in method"** tab
2. Find **"Google"** in the providers list
3. Click on it
4. **TURN ON** the toggle switch
5. Select your email from the "Project support email" dropdown
6. Click **"Save"**

✅ After this: Google Sign-In will work!

---

## 3️⃣ Enable Firestore Database (To Save User Data)

### Steps:
1. Click **"Firestore Database"** in left sidebar
2. Click **"Create database"**
3. Select **"Start in test mode"** (easier for development)
4. Click **"Next"**
5. Choose any location (doesn't matter much)
6. Click **"Enable"**
7. Wait 1-2 minutes for it to be ready

✅ After this: User profiles (name, role) will be saved!

---

## 4️⃣ Test Your Setup

### Open your browser console (F12) and look for these messages:

**Good messages** ✅:
- `🔥 Initializing Firebase...`
- `✅ Firebase and Firestore initialized successfully`
- `✅ Account created successfully`
- `✅ User profile saved to Firestore`

**Warning messages** ⚠️:
- `⚠️ Firestore not available` → You need to enable Firestore (Step 3)
- `⚠️ GOOGLE SIGN-IN NOT ENABLED` → You need to enable Google (Step 2)

**Error messages** ❌:
- Check if you enabled Email/Password (Step 1)
- Check if Google Sign-In is enabled (Step 2)

---

## 🧪 Testing Checklist

After enabling everything above, test:

1. **Email Signup**:
   - Fill in name, email, password, role
   - Click "Create Account"
   - Should see: ✅ Success and redirect to home

2. **Email Login**:
   - Enter email and password
   - Click "Sign In"
   - Should see: ✅ Success and redirect to home

3. **Google Sign-In**:
   - Click "Continue with Google"
   - Pop-up should appear
   - Choose your Google account
   - Should see: ✅ Success and redirect to home

4. **Check Browser Console** (F12):
   - Look for ✅ green checkmarks
   - No ❌ red errors

---

## 🚨 Common Issues

### "Operation not allowed"
- **Solution**: You didn't enable Email/Password in Authentication → Sign-in method

### "Google Sign-In not enabled"
- **Solution**: You didn't enable Google in Authentication → Sign-in method

### "Firestore not available"
- **Solution**: You didn't create Firestore database
- **Note**: Auth still works, but user data won't be saved

### "Pop-up blocked"
- **Solution**: Allow pop-ups in browser settings for localhost

---

## 📊 What Gets Saved in Database

When Firestore is enabled, each user gets a document in `users` collection:

```
{
  name: "John Doe",
  email: "john@example.com",
  role: "user",  // or "admin"
  createdAt: "2025-11-29T..."
}
```

---

## ⏱️ How Long Does This Take?

- Email/Password enable: **10 seconds**
- Google enable: **20 seconds**
- Firestore create: **1-2 minutes**

**Total time: ~3 minutes**

---

## Need Help?

1. Open browser console (F12)
2. Try to sign up or log in
3. Copy any error messages
4. The console will tell you exactly what's missing!

