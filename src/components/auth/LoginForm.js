"use client";

import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, bypassAuth } from "../../services/firebase";
import styles from "./LoginForm.module.css";
import { useRouter } from "next/navigation";
import Image from 'next/image';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // If in bypass mode, show a message
    if (bypassAuth) {
      setMessage("Development mode: Authentication bypassed. Click login to continue.");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (bypassAuth) {
        // In bypass mode, just redirect
        setMessage("Login successful! (Development Mode)");
        setTimeout(() => {
          router.push("/Home");
        }, 500);
      } else {
        // Real authentication
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Login successful! Redirecting...");
        router.push("/Home");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (bypassAuth) {
        // In bypass mode, just redirect
        setMessage("Google login successful! (Development Mode)");
        setTimeout(() => {
          router.push("/Home");
        }, 500);
      } else {
        // Real Google authentication
        await signInWithPopup(auth, googleProvider);
        setMessage("Successfully logged in with Google!");
        router.push("/Home");
      }
    } catch (err) {
      setError(err.message || "Google login failed");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className={styles.formContainer}>
      <h2>Login to Your Account</h2>
      
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
        onClick={handleGoogleLogin}
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
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required={!bypassAuth}
        autoComplete="current-password"
        className={styles.inputField}
      />

      <button type="submit" disabled={loading} className={styles.submitButton}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p className={styles.errorMessage}>{error}</p>}
      {message && <p className={styles.successMessage}>{message}</p>}

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        Don&apos;t have an account?{" "}
        <span
          style={{ color: "#0070f3", cursor: "pointer", fontWeight: "600" }}
          onClick={() => router.push("/signup")}
        >
          Sign Up
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
