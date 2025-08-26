"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SampleForm.module.css";

const SampleForm = ({ onSelect }) => {
  const pathname = usePathname();
  const [userType, setUserType] = useState("");

  const navLinks = [
    { name: "Home", href: "/Home" },
    { name: "Quiz", href: "/Quiz" },
    { name: "Article", href: "/Article/article" },
    { name: "About", href: "/About/about" },
    { name: "Community", href: "/Community/community" },
    { name: "Profile", href: "/Profile/profile" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userType) {
      alert("Please select a user type before proceeding!");
      return;
    }
    onSelect(userType);
  };

  const handleUserTypeSelect = (type) => {
    setUserType(type);
  };

  const userTypes = [
    { value: "Student", label: "Student", description: "Currently studying" },
    { value: "Professional", label: "Professional", description: "Working professional" },
    { value: "Others", label: "Other", description: "General user" }
  ];

  return (
    <div className={styles.page}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>CyberSaathi</div>
        <div className={styles.links}>
          {navLinks.map(({ name, href }) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? styles.activeLink : styles.link}
            >
              {name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Form Content */}
      <main className={styles.container}>
        <h1 className={styles.title}>CyberSaathi Quiz</h1>
        <p className={styles.intro}>
          Select your demographic to receive personalized cyber safety tips.
        </p>

        <section className={styles.section}>
          <h2 className={styles.heading}>Select Your Demographic</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.userTypeOptions}>
              {userTypes.map((type) => (
                <label
                  key={type.value}
                  className={`${styles.userTypeOption} ${userType === type.value ? styles.selected : ''}`}
                >
                  <input
                    type="radio"
                    value={type.value}
                    checked={userType === type.value}
                    onChange={() => handleUserTypeSelect(type.value)}
                    required
                    className={styles.radioInput}
                  />
                  <div>
                    <div className={styles.optionLabel}>{type.label}</div>
                    <div className={styles.optionDescription}>{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!userType}
            >
              Continue to Tips
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default SampleForm;
