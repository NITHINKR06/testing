"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiShield, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { getRandomTips } from "../../Data/Quiz/tipsData";
import styles from "./PersonalizedTips.module.css";

const PersonalizedTips = ({ demographic, onContinue }) => {
  const pathname = usePathname();
  const tips = getRandomTips(demographic, 5);

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

      {/* Tips Content */}
      <main className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.tipsContent}
        >
          <div className={styles.tipsHeader}>
            <FiShield className={styles.tipsIcon} size={32} />
            <h1 className={styles.title}>Personalized Cyber Safety Tips</h1>
            <p className={styles.intro}>
              Based on your selection as a <strong>{demographic}</strong>, here are some important tips:
            </p>
          </div>

          <div className={styles.tipsList}>
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={styles.tipItem}
              >
                <FiCheckCircle className={styles.tipIcon} />
                <span>{tip}</span>
              </motion.div>
            ))}
          </div>

          <div className={styles.tipsFooter}>
            <p className={styles.tipsNote}>
              <FiAlertCircle className={styles.noteIcon} />
              Remember to practice these safety measures regularly to protect yourself online.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContinue}
              className={styles.continueButton}
            >
              Start Quiz
            </motion.button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PersonalizedTips;
