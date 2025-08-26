"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./About.module.css";

export default function About() {
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

      {/* About Content */}
      <main className={styles.container}>
        <h1 className={styles.title}>About CyberSaathi</h1>
        <p className={styles.intro}>
          <strong>CyberSaathi</strong> is your trusted companion for navigating the digital world safely and securely.
        </p>

        <section className={styles.section}>
          <h2 className={styles.heading}>Our Mission</h2>
          <p className={styles.paragraph}>
            With cyber fraud cases rapidly increasing in India—from phishing emails, fake OTP calls, UPI scams, to identity theft—every demographic including students, professionals, homemakers, rural users, and senior citizens faces unique risks and challenges.
            Our goal is to bridge this gap through a platform that raises awareness, educates, and empowers everyone to recognize, prevent, and respond to cyber threats.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>What We Offer</h2>
          <ul className={styles.list}>
            <li>Educational resources tailored for various user groups</li>
            <li>Community forums for support and expert advice</li>
            <li>Real-life scenarios and example cases</li>
            <li>Flexible, relatable, and trustworthy safety solutions</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>Why Choose CyberSaathi?</h2>
          <p className={styles.paragraph}>
            We make cyber safety simple, reliable, and accessible to all. Whether you are new to the internet or an experienced user, our easy-to-use resources ensure you learn at your own pace and gain confidence in your online safety.
          </p>
          <p className={styles.callToAction}>
            Let CyberSaathi be your guide to a safer digital world!
          </p>
        </section>
      </main>
    </div>
  );
}
