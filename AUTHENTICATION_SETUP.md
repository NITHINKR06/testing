# Authentication Setup Guide

## Quick Start (Development Mode with Auth Bypass)

The application is currently configured to run in **development mode with authentication bypassed**. This allows you to:
- Run the application without Firebase credentials
- Skip login/signup processes during development
- Test the application features without authentication setup

### Running in Development Mode

1. The `.env.local` file has been created with bypass mode enabled:
   ```
   NEXT_PUBLIC_DEV_MODE=true
   NEXT_PUBLIC_BYPASS_AUTH=true
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build the application:
   ```bash
   npm run build
   ```

5. When you access login/signup pages, you'll see a "Development Mode" warning
6. Any credentials will work, or you can click login/signup without entering anything

## Setting Up Real Firebase Authentication

To use real Firebase authentication, follow these steps:

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Follow the setup wizard

### 2. Enable Authentication

1. In Firebase Console, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Enable the authentication methods you want:
   - Email/Password: Click on "Email/Password", enable it, and save
   - Google: Click on "Google", enable it, add your project support email, and save

### 3. Get Your Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ and select "Project settings"
2. Scroll down to "Your apps" section
3. Click "Add app" and select "Web" (</> icon)
4. Register your app with a nickname
5. Copy the Firebase configuration object

### 4. Update Environment Variables

Edit the `.env.local` file and replace the placeholder values with your actual Firebase credentials:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-actual-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Disable bypass mode for production
NEXT_PUBLIC_DEV_MODE=false
NEXT_PUBLIC_BYPASS_AUTH=false
```

### 5. Configure Firebase Security Rules

In Firebase Console > Authentication > Settings > Authorized domains:
- Add your production domain
- Add `localhost` for local development

### 6. Restart Your Application

After updating the environment variables:

```bash
# Stop the current server (Ctrl+C)
# Restart the development server
npm run dev

# Or build for production
npm run build
npm start
```

## Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Your Firebase API key | `AIzaSyD...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain | `myapp.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | `my-app-12345` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | `my-app-12345.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | FCM sender ID | `123456789` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | `1:123456789:web:abc...` |
| `NEXT_PUBLIC_DEV_MODE` | Enable development mode | `true` or `false` |
| `NEXT_PUBLIC_BYPASS_AUTH` | Bypass authentication | `true` or `false` |

## Troubleshooting

### Common Issues and Solutions

1. **"Firebase: Error (auth/invalid-api-key)"**
   - Ensure your API key in `.env.local` is correct
   - Check that the environment variables are properly loaded (restart the server)

2. **"Firebase: Error (auth/unauthorized-domain)"**
   - Add your domain to Firebase Console > Authentication > Settings > Authorized domains

3. **Build fails with Firebase errors**
   - Make sure `.env.local` file exists with either:
     - Valid Firebase credentials (production mode)
     - Bypass mode enabled (development mode)

4. **Authentication not working after deployment**
   - Ensure environment variables are set in your deployment platform (Vercel, Netlify, etc.)
   - Verify that your production domain is authorized in Firebase

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit `.env.local` to version control** - It's already in `.gitignore`
2. **Use bypass mode only for development** - Always disable it in production
3. **Keep your Firebase API keys secure** - Although they're public-facing, configure security rules properly
4. **Set up Firebase Security Rules** - Configure Firestore/Realtime Database rules appropriately
5. **Enable only necessary authentication methods** - Don't enable methods you won't use

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Firebase Authentication Best Practices](https://firebase.google.com/docs/auth/web/start)
