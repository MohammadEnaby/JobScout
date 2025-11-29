# How to Enable Google Sign-In - Step by Step

## The Error You're Seeing
`"Failed to sign in with Google. Please try again."`

This happens because **Google Sign-In is not enabled** in your Firebase Console yet.

---

## Fix: Enable Google Sign-In (5 minutes)

### Step 1: Go to Firebase Console
1. Open: https://console.firebase.google.com/
2. Select your project: **jobscout-52b07**

### Step 2: Enable Google Authentication
1. Click **"Authentication"** in the left sidebar (🔐 icon)
2. If you see "Get started", click it
3. Click on the **"Sign-in method"** tab at the top
4. You'll see a list of providers

### Step 3: Configure Google Sign-In
1. Find **"Google"** in the list of providers
2. Click on it
3. You'll see a toggle switch - **turn it ON** (enable)
4. A form will appear:
   - **Project support email**: Select your email from the dropdown
   - Leave everything else as default
5. Click **"Save"** button

### Step 4: Enable Firestore (Required for storing user data)
1. Click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Click **"Next"**
5. Select your region (any option works)
6. Click **"Enable"**

### Step 5: Authorize Your Domain (Important!)
1. Still in **Authentication** section
2. Go to **"Settings"** tab (top menu)
3. Scroll to **"Authorized domains"**
4. You should see:
   - `localhost` ✅ (should already be there)
   - `jobscout-52b07.firebaseapp.com` ✅ (should already be there)
5. If `localhost` is NOT there, click **"Add domain"** and add: `localhost`

---

## Step 6: Test It!

After completing the steps above:

1. **Refresh your browser** (hard refresh: Ctrl+Shift+R)
2. Click **"Continue with Google"** button
3. A Google sign-in popup should appear
4. Choose your Google account
5. You should be logged in! 🎉

---

## Common Issues & Solutions

### Issue: "Pop-up blocked"
- **Solution**: Allow pop-ups in your browser settings
- Click the icon in the address bar and allow pop-ups for localhost

### Issue: "This domain is not authorized"
- **Solution**: Make sure `localhost` is in the Authorized domains list (see Step 5 above)

### Issue: "Operation not allowed"
- **Solution**: You didn't enable Google Sign-In properly (repeat Step 2-3)

### Issue: Error about Firestore
- **Solution**: You need to enable Firestore Database (Step 4)

---

## Verification Checklist

Before testing, make sure:
- ✅ Google Sign-In is **enabled** in Firebase Console → Authentication → Sign-in method
- ✅ Firestore Database is **created** and enabled
- ✅ `localhost` is in **Authorized domains**
- ✅ Your `.env` file has all the correct Firebase config values
- ✅ Development server is running (`npm run dev` in frontend folder)

---

## Need Help?

If you still see errors after following these steps:

1. Open browser console (F12)
2. Look for error messages
3. Share the error code (e.g., `auth/popup-blocked`, `auth/unauthorized-domain`)

The most common fix: **Just enable Google in Firebase Console → Authentication → Sign-in method** and refresh the page!

