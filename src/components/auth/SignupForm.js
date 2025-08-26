"use client";

import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider, bypassAuth } from "../../services/firebase";
import styles from "./signupForm.module.css";
import Image from 'next/image';
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // If in bypass mode, show a message
    if (bypassAuth) {
      setMessage("Development mode: Authentication bypassed. Click sign up to continue.");
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (bypassAuth) {
        // In bypass mode, just show success and redirect
        setMessage("Signup successful! (Development Mode) Redirecting...");
        setTimeout(() => {
          router.push("/Home");
        }, 1000);
      } else {
        // Real authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await sendEmailVerification(user);

        setMessage(
          "Signup successful! Verification email sent. Please check your inbox."
        );

        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError(err.message || "Signup failed");
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    
    try {
      if (bypassAuth) {
        // In bypass mode, just redirect
        setMessage("Google signup successful! (Development Mode)");
        setTimeout(() => {
          router.push("/Home");
        }, 500);
      } else {
        // Real Google authentication
        await signInWithPopup(auth, googleProvider);
        setMessage("Successfully signed up with Google!");
        router.push("/Home");
      }
    } catch (err) {
      setError(err.message || "Google signup failed");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSignup} className={styles.formContainer}>
      <h2>Create an Account</h2>

      {bypassAuth && (
        <div style={{ 
          padding: "1rem", 
          backgroundColor: "#fff3cd", 
          border: "1px solid #ffc107",
          borderRadius: "4px",
          marginBottom: "1rem"
        }}>
          <strong>⚠️ Development Mode</strong>
          <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem" }}>
            Authentication is bypassed. Any credentials will work.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={handleGoogleSignup}
        className={styles.googleButton}
        disabled={loading}
      >
        <Image
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google logo"
          width={22}
          height={22}
        />
        Continue with Google
      </button>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required={!bypassAuth}
        autoComplete="email"
        className={styles.inputField}
      />

      <input
        type="password"
        placeholder="Password (6+ characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required={!bypassAuth}
        minLength={bypassAuth ? 0 : 6}
        autoComplete="new-password"
        className={styles.inputField}
      />

      <button type="submit" disabled={loading} className={styles.submitButton}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      {error && <p className={styles.errorMessage}>{error}</p>}
      {message && <p className={styles.successMessage}>{message}</p>}

      {!bypassAuth && (
        <p className={styles.passwordHint}>
          Password should be at least 6 characters for security.
        </p>
      )}

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        Already have an account?{" "}
        <span
          style={{ color: "#0070f3", cursor: "pointer", fontWeight: "600" }}
          onClick={() => router.push("/login")}
        >
          Login
        </span>
      </div>
    </form>
  );
};

export default SignupForm;
