"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./ResultSummary.module.css";

const MotionDiv = dynamic(() => import("framer-motion").then(mod => mod.motion.div), { ssr: false });
const MotionButton = dynamic(() => import("framer-motion").then(mod => mod.motion.button), { ssr: false });

export default function ResultSummary({ 
  levelId, 
  score, 
  totalQuestions, 
  userAnswers, 
  onRetry, 
  onContinue,
  onViewAnalytics 
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/Home" },
    { name: "Quiz", href: "/Quiz" },
    { name: "Article", href: "/Article/article" },
    { name: "About", href: "/About/about" },
    { name: "Community", href: "/Community/community" },
    { name: "Profile", href: "/Profile/profile" },
  ];

  const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const passed = percentage >= 60;

  // Calculate analytics
  useEffect(() => {
    if (userAnswers && userAnswers.length > 0) {
      const totalTime = userAnswers.reduce((sum, answer) => sum + answer.timeSpent, 0);
      const averageTime = Math.round(totalTime / userAnswers.length);
      const fastestAnswer = Math.min(...userAnswers.map(a => a.timeSpent));
      const slowestAnswer = Math.max(...userAnswers.map(a => a.timeSpent));
      
      const difficultyBreakdown = {
        easy: userAnswers.filter(a => a.timeSpent < 10).length,
        medium: userAnswers.filter(a => a.timeSpent >= 10 && a.timeSpent <= 20).length,
        hard: userAnswers.filter(a => a.timeSpent > 20).length
      };

      setAnalytics({
        totalTime,
        averageTime,
        fastestAnswer,
        slowestAnswer,
        difficultyBreakdown,
        completionDate: new Date().toISOString()
      });
    }
  }, [userAnswers]);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding! 🎯";
    if (percentage >= 80) return "Excellent! 🌟";
    if (percentage >= 70) return "Great job! 👍";
    if (percentage >= 60) return "Good work! ✅";
    return "Keep practicing! 📚";
  };

  const getTimeSpentMessage = () => {
    if (!analytics) return "";
    const avg = analytics.averageTime;
    if (avg < 8) return "Lightning fast! ⚡";
    if (avg < 15) return "Quick thinking! 🚀";
    if (avg < 25) return "Steady pace! 🏃";
    return "Take your time! 🧘";
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

      {/* Quiz Result Content */}
      <main className={styles.container}>
        <MotionDiv
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className={styles.resultCard}
          role="region"
          aria-label="Quiz Results Summary"
        >
          {/* Header */}
          <div className={styles.resultHeader}>
            <div className={styles.scoreCircle}>
              <span>{percentage}%</span>
            </div>
            <h1 className={styles.title}>
              {passed ? "Level Complete! 🎉" : "Practice Makes Perfect"}
            </h1>
            <p className={styles.performanceMessage}>{getPerformanceMessage()}</p>
            <p className={styles.levelInfo}>
              Level {levelId} • {correctAnswers} of {totalQuestions} correct
            </p>
          </div>

          {/* Score Breakdown */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{correctAnswers}</div>
              <div className={styles.statLabel}>Correct</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{totalQuestions - correctAnswers}</div>
              <div className={styles.statLabel}>Incorrect</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{totalQuestions}</div>
              <div className={styles.statLabel}>Total</div>
            </div>
          </div>

          {/* Analytics Summary */}
          {analytics && (
            <div className={styles.analyticsSummary}>
              <h2 className={styles.heading}>Performance Insights</h2>
              <div className={styles.analyticsGrid}>
                <div>
                  <span className={styles.analyticsLabel}>Avg. time per question:</span>
                  <span className={styles.analyticsValue}>{analytics.averageTime}s</span>
                </div>
                <div>
                  <span className={styles.analyticsLabel}>Total time:</span>
                  <span className={styles.analyticsValue}>{analytics.totalTime}s</span>
                </div>
                <div>
                  <span className={styles.analyticsLabel}>Fastest answer:</span>
                  <span className={styles.analyticsValue}>{analytics.fastestAnswer}s</span>
                </div>
                <div>
                  <span className={styles.analyticsLabel}>Slowest answer:</span>
                  <span className={styles.analyticsValue}>{analytics.slowestAnswer}s</span>
                </div>
              </div>
              <p className={styles.timeMessage}>{getTimeSpentMessage()}</p>
            </div>
          )}

          {/* Detailed Results Toggle */}
          <div className={styles.toggleSection}>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className={styles.toggleButton}
              aria-expanded={showDetails}
              aria-controls="detailed-results"
            >
              {showDetails ? "Hide detailed results" : "Show detailed results"} ↓
            </button>
          </div>

          {/* Detailed Results */}
          {showDetails && (
            <MotionDiv
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              id="detailed-results"
              className={styles.detailedResults}
            >
              <h2 className={styles.heading}>Question Breakdown</h2>
              <div className={styles.questionList}>
                {userAnswers.map((answer, index) => (
                  <div
                    key={index}
                    className={`${styles.questionItem} ${
                      answer.isCorrect ? styles.correct : styles.incorrect
                    }`}
                  >
                    <div className={styles.questionHeader}>
                      <span>Q{index + 1}</span>
                      <span className={answer.isCorrect ? styles.correctBadge : styles.incorrectBadge}>
                        {answer.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                      </span>
                    </div>
                    <p className={styles.questionText}>{answer.question}</p>
                    <div className={styles.questionMeta}>
                      Time: {answer.timeSpent}s • 
                      Your answer: {answer.userAnswer} • 
                      Correct: {answer.correctAnswer}
                    </div>
                  </div>
                ))}
              </div>
            </MotionDiv>
          )}

          {/* Action Buttons */}
          <div className={styles.actionsGrid}>
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRetry}
              className={styles.actionButton}
              aria-label="Retry this level"
            >
              🔄 Retry Level
            </MotionButton>
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContinue}
              className={styles.actionButton}
              aria-label="Continue to next level"
            >
              {passed ? "➡️ Continue" : "Back to Levels"}
            </MotionButton>
          </div>

          {/* Analytics Button */}
          {analytics && (
            <div className={styles.viewAnalytics}>
              <button
                onClick={() => onViewAnalytics && onViewAnalytics(analytics)}
                className={styles.viewAnalyticsButton}
              >
                View detailed analytics →
              </button>
            </div>
          )}
        </MotionDiv>
      </main>
    </div>
  );
}
