"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiX, FiDownload, FiTrash2, FiRefreshCw, FiTrendingUp, FiAward, FiClock, FiBarChart2 } from "react-icons/fi";
import styles from "./AnalyticsDashboard.module.css";

// Import analytics utilities (make sure these are in your utils)
import { getProgressAnalytics, getLevelAnalytics, getStreakData, exportAnalyticsData, clearAnalyticsData } from "../../utils/quizAnalytics";

export default function AnalyticsDashboard({ onClose }) {
  const [analytics, setAnalytics] = useState(null);
  const [levelAnalytics, setLevelAnalytics] = useState({});
  const [streakData, setStreakData] = useState({});
  const [selectedLevel, setSelectedLevel] = useState(null);

  const pathname = usePathname();
  const navLinks = [
    { name: "Home", href: "/Home" },
    { name: "Quiz", href: "/Quiz" },
    { name: "Article", href: "/Article/article" },
    { name: "About", href: "/About/about" },
    { name: "Community", href: "/Community/community" },
    { name: "Profile", href: "/Profile/profile" },
  ];

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    const progress = getProgressAnalytics();
    const streak = getStreakData();
    
    setAnalytics(progress);
    setStreakData(streak);
    
    // Load analytics for each level
    const levelData = {};
    [1, 2, 3].forEach(levelId => {
      const levelStats = getLevelAnalytics(levelId);
      if (levelStats) {
        levelData[levelId] = levelStats;
      }
    });
    setLevelAnalytics(levelData);
  };

  const handleExport = () => {
    const data = exportAnalyticsData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cybersaathi-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all analytics data? This action cannot be undone.')) {
      clearAnalyticsData();
      loadAnalytics();
    }
  };

  if (!analytics) {
    return (
      <div className={styles.page}>
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
        <main className={styles.container}>
          <p className={styles.paragraph}>Loading analytics...</p>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
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

      <main className={styles.container}>
        <div className={styles.analyticsHeader}>
          <div className={styles.analyticsHeaderContent}>
            <h1 className={styles.title}>Quiz Analytics Dashboard</h1>
            <button
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Close analytics"
            >
              <FiX />
            </button>
          </div>

          {/* Overall Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{analytics.totalQuizzes}</div>
              <div className={styles.statLabel}>Total Quizzes</div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statValue}>{analytics.overallAccuracy}%</div>
              <div className={styles.statLabel}>Overall Accuracy</div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statValue}>{analytics.bestScore}%</div>
              <div className={styles.statLabel}>Best Score</div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statValue}>{Math.round(analytics.totalTimeSpent / 60)}m</div>
              <div className={styles.statLabel}>Total Time</div>
            </div>
          </div>

          {/* Streak Information */}
          <div className={styles.section}>
            <h2 className={styles.heading}>
              <FiAward /> Current Streak
            </h2>
            <div className={styles.streakValue}>{streakData.currentStreak} days</div>
            <p className={styles.streakSubtext}>Longest streak: {streakData.longestStreak} days</p>
          </div>
        </div>

        {/* Level-wise Analytics */}
        <div className={styles.section}>
          <h2 className={styles.heading}>Level Performance</h2>
          <div className={styles.levelsGrid}>
            {[1, 2, 3].map(levelId => {
              const levelStats = levelAnalytics[levelId];
              if (!levelStats) return null;

              return (
                <motion.div
                  key={levelId}
                  whileHover={{ scale: 1.02 }}
                  className={styles.levelCard}
                  onClick={() => setSelectedLevel(selectedLevel === levelId ? null : levelId)}
                >
                  <div className={styles.levelHeader}>
                    <div className={styles.levelNumber}>{levelId}</div>
                    <h3 className={styles.levelTitle}>Level {levelId}</h3>
                    
                    <div className={styles.levelStats}>
                      <div>
                        <div className={styles.statNumber}>{levelStats.totalAttempts}</div>
                        <div className={styles.statLabel}>Attempts</div>
                      </div>
                      <div>
                        <div className={styles.statNumber}>{levelStats.completionRate}%</div>
                        <div className={styles.statLabel}>Completion</div>
                      </div>
                    </div>
                    
                    {selectedLevel === levelId && (
                      <div className={styles.levelDetails}>
                        <div>Best: {levelStats.bestScore}%</div>
                        <div>Average: {levelStats.averageScore}%</div>
                        <div>Latest: {levelStats.latestScore}%</div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Progress Chart Placeholder */}
        <div className={styles.section}>
          <h2 className={styles.heading}>Progress Over Time</h2>
          <div className={styles.chartPlaceholder}>
            <p>Progress chart visualization would be implemented here</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.section}>
          <h2 className={styles.heading}>Actions</h2>
          <div className={styles.actionsGrid}>
            <button
              onClick={handleExport}
              className={styles.actionButton}
            >
              <FiDownload /> Export Data
            </button>
            
            <button
              onClick={handleClear}
              className={styles.actionButtonRed}
            >
              <FiTrash2 /> Clear Data
            </button>
            
            <button
              onClick={loadAnalytics}
              className={styles.actionButtonGray}
            >
              <FiRefreshCw /> Refresh
            </button>
          </div>
        </div>

        {/* Quick Tips */}
        <div className={styles.section}>
          <h2 className={styles.heading}><FiTrendingUp /> Improvement Tips</h2>
          <ul className={styles.list}>
            <li>Practice regularly to maintain your streak</li>
            <li>Review questions you got wrong</li>
            <li>Aim for consistency across all levels</li>
            <li>Take your time to understand scenarios</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
