import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Check if we're in development/bypass mode
const isDevelopment = process.env.NEXT_PUBLIC_DEV_MODE === 'true';
const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy-auth-domain.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dummy-project-id",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "dummy-storage-bucket.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef123456",
};

let app;
let auth;
let googleProvider;

// Only initialize Firebase if we have valid credentials or not in bypass mode
if (!bypassAuth) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.warn("Firebase initialization failed. Running in bypass mode.", error);
  }
}

// Mock auth object for development/bypass mode
const mockAuth = {
  currentUser: bypassAuth ? { 
    email: "dev@example.com", 
    uid: "dev-user-123",
    displayName: "Development User"
  } : null,
  onAuthStateChanged: (callback) => {
    if (bypassAuth) {
      callback(mockAuth.currentUser);
    }
    return () => {}; // Return unsubscribe function
  }
};

// Export either real or mock auth based on configuration
const exportedAuth = bypassAuth ? mockAuth : auth;

export { 
  exportedAuth as auth, 
  googleProvider,
  isDevelopment,
  bypassAuth
};
