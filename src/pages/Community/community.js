"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Community.module.css";
import Image from "next/image";

// Updated expert data
const experts = [
  {
    name: "Niharika",
    email: "niharikaniranjan688@gmail.com",
    phone: "+91 8792128973",
    linkedin: "https://www.linkedin.com/in/niharika-niranjan-19778a290/",
    avatar: "/Niharika.jpg",
  },
  {
    name: "Shravya R",
    email: "shravyar235@gmail.com",
    phone: "+91 7892848220",
    linkedin: "https://www.linkedin.com/in/shravya-r-32913028b/",
    avatar: "/shravya.jpg",
  },
  {
    name: "Shreeraksha M",
    email: "mshreeraksha3@gmail.com",
    phone: "+91 9663475838",
    linkedin: "https://www.linkedin.com/in/shreeraksha-m-4ab1b8295/",
    avatar: "/shreeraksha.jpg",
  },
  {
    name: "Sandeep Pai Kulyadi",
    email: "sandeeppaikulyadi05@gmail.com",
    phone: "+91 7899056907",
    linkedin: "https://www.linkedin.com/in/sandeep-pai-kulyadi-14a43a266/",
    avatar: "/sandeep.jpg",
  },
];

export default function Community() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/Home" },
    { name: "Quiz", href: "/Quiz" },
    { name: "Article", href: "/Article/article" },
    { name: "About", href: "/About/about" },
    { name: "Community", href: "/Community/community" },
    { name: "profile", href: "/Profile/profile" },
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

      {/* Header */}
      <header className={styles.header}>
        <h1>Meet Our CyberSaathi Volunteers</h1>
        <p>
          Dedicated experts committed to guiding you on your Cyber Safety
          journey!
        </p>
      </header>

      {/* Cards grid */}
      <section className={styles.cardGrid}>
        {experts.map((expert, idx) => (
          <article className={styles.card} key={idx}>
            <Image
              src={expert.avatar}
              alt={expert.name}
              className={styles.avatar}
              width={100}
              height={100}
            />
            <div className={styles.cardContent}>
              <h2 className={styles.name}>{expert.name}</h2>
              <p className={styles.info}>
                <strong>Email:</strong> {expert.email}
              </p>
              <p className={styles.info}>
                <strong>Phone:</strong>{" "}
                <a href={`tel:${expert.phone}`} className={styles.link}>
                  {expert.phone}
                </a>
              </p>
              <p>
                <a
                  href={expert.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  View LinkedIn Profile
                </a>
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
