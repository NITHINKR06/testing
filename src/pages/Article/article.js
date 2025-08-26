"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Article.module.css";

export default function Article() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/Home" },
    { name: "Quiz", href: "/Quiz" },
    { name: "Article", href: "/Article/article" },
    { name: "About", href: "/About/about" },
    { name: "Community", href: "/Community/community" },
    { name: "Profile", href: "/Profile/profile" },
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

      {/* Article Content */}
      <main className={styles.container}>
        <h1 className={styles.header}>Safety and Security in the Digital Age</h1>

        <section className={styles.section}>
          <h2 className={styles.subheader}>The Growing Challenge of Cyber Fraud in India</h2>
          <p className={styles.paragraph}>
            With cyber fraud cases rapidly increasing in India—from phishing emails and fake OTP calls to UPI scams and identity theft—different demographics such as students, professionals, homemakers, rural users, and senior citizens face unique risks and challenges.
          </p>
          <p className={styles.paragraph}>
            Your task is to design an innovative and adaptable platform that raises awareness, educates users, and empowers them to recognize, prevent, and respond to such threats.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subheader}>Our Cyber Safety Mission</h2>
          <p className={styles.paragraph}>
            The solution should make cyber safety simple, relatable, and trustworthy, while remaining flexible enough to reach diverse groups.
          </p>
          <p className={styles.paragraph}>
            By educating and empowering users, we aim to reduce the risks posed by increasingly sophisticated cyberattacks and build a safer digital community for all.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.subheader}>Key Focus Areas</h2>
          <ul className={styles.list}>
            <li>Raising awareness through clear, accessible information tailored to all user groups.</li>
            <li>Providing tools and resources that enable recognition and prevention of cyber threats.</li>
            <li>Delivering timely, actionable updates on emerging cybercrime incidents.</li>
            <li>Fostering a trustworthy platform where users feel supported to report and respond to threats.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
