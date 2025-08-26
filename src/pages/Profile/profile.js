"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Profile.module.css";

export default function Profile() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/Home" },
    { name: "Quiz", href: "/Quiz" },
    { name: "Article", href: "/Article/article" },
    { name: "About", href: "/About/about" },
    { name: "Community", href: "/Community/community" },
    { name: "Profile", href: "/Profile/profile" },
  ];

  // Sample user data—replace with real user data
  const user = {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 9876543210",
    bio: "Cybersecurity enthusiast and community volunteer. Passionate about educating others on digital safety.",
  };

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

      {/* Profile Content */}
      <main className={styles.container}>
        <h1 className={styles.title}>Your Profile</h1>
        <p className={styles.intro}>
          Manage your personal information and track your activity.
        </p>

        <section className={styles.section}>
          <h2 className={styles.heading}>Personal Details</h2>
          <p className={styles.paragraph}>
            <strong>Name:</strong> {user.name}
          </p>
          <p className={styles.paragraph}>
            <strong>Email:</strong> {user.email}
          </p>
          <p className={styles.paragraph}>
            <strong>Phone:</strong> {user.phone}
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>About Me</h2>
          <p className={styles.paragraph}>{user.bio}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Activity</h2>
          <ul className={styles.list}>
            <li>Completed 5 quizzes</li>
            <li>Read 12 articles</li>
            <li>Helped 3 community members</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Achievements</h2>
          <ul className={styles.list}>
            <li>Cybersecurity Basics Badge</li>
            <li>Community Helper Award</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
