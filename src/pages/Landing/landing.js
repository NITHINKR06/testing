"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const Landing = () => {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push('/signup'); // Navigate to Signup page on click
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to CYBERSAATHI</h1>
      <p style={styles.text}>
        Empowering you to navigate the digital world safely. Learn to recognize,
        prevent, and respond to cyber threats—whether you are a student, professional,
        homemaker, rural user, or senior citizen.
      </p>
      <p style={styles.callToAction}>Start your journey towards better online safety and security!</p>
      <button style={styles.button} onClick={handleExploreClick}>
        Explore
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '2rem auto',
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    color: '#333',
    lineHeight: '1.6',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#0D47A1',
    marginBottom: '1.5rem',
    textTransform: 'uppercase',
  },
  text: {
    fontSize: '1.25rem',
    fontWeight: '500',
    marginBottom: '2rem',
    color: '#444',
  },
  callToAction: {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#0D47A1',
    marginBottom: '2rem',
  },
  button: {
    padding: '0.75rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: '#0D47A1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default Landing;
