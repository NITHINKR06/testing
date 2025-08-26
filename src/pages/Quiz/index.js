"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiLock, FiBarChart2, FiPlay, FiRefreshCw } from "react-icons/fi";

import QuizComponent from "../../components/Quiz/QuizComponent";
import AnalyticsDashboard from "../../components/Quiz/AnalyticsDashboard";
import SampleForm from "../../components/Quiz/SampleForm";
import PersonalizedTips from "../../components/Quiz/PersonalizedTips";

import "./Quiz.css";

const levels = [
  { id: 1, title: "Level 1 - Basics", description: "True/False questions" },
  { id: 2, title: "Level 2 - Intermediate", description: "Multiple choice questions" },
  { id: 3, title: "Level 3 - Advanced", description: "Scenario-based questions" },
];

export default function QuizPage() {
  const [userType, setUserType] = useState("");
  const [showTips, setShowTips] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [quizResults, setQuizResults] = useState({});
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Handle demographic selection
  const handleDemographicSelect = (selectedType) => {
    setUserType(selectedType);
    setShowTips(true);
    // Set initial level based on user type
    if (selectedType === "Student") setSelectedLevel(2);
    else if (selectedType === "Professional") setSelectedLevel(3);
    else setSelectedLevel(1);
  };

  // Handle continue from tips
  const handleContinueToQuiz = () => {
    setShowTips(false);
    localStorage.setItem("hasSeenTips", "true");
    localStorage.setItem("userType", userType);
  };

  // Handle quiz completion
  const handleLevelComplete = (levelId, score, userAnswers) => {
    const nextLevel = levelId + 1;
    if (nextLevel <= 3 && !unlockedLevels.includes(nextLevel)) {
      const newUnlocked = [...unlockedLevels, nextLevel];
      setUnlockedLevels(newUnlocked);
      localStorage.setItem("quizUnlockedLevels", JSON.stringify(newUnlocked));
    }

    const newResults = {
      ...quizResults,
      [levelId]: {
        score,
        completedAt: new Date().toISOString(),
        totalQuestions: userAnswers.length,
        correctAnswers: userAnswers.filter(a => a.isCorrect).length,
        userAnswers,
      },
    };
    setQuizResults(newResults);
    localStorage.setItem("quizResults", JSON.stringify(newResults));

    setSelectedLevel(null);
  };

  // Go back to level selection
  const handleBackToLevels = () => setSelectedLevel(null);

  // --- Step 1: Show SampleForm if userType is not selected ---
  if (!userType) return <SampleForm onSelect={handleDemographicSelect} />;

  // --- Step 2: Show tips based on userType ---
  if (showTips) return <PersonalizedTips demographic={userType} onContinue={handleContinueToQuiz} />;

  // --- Step 3: Show QuizComponent for the starting level ---
  if (selectedLevel) {
    return (
      <QuizComponent
        levelId={selectedLevel}
        userType={userType}
        onLevelComplete={handleLevelComplete}
        onBackToLevels={handleBackToLevels}
      />
    );
  }

  // --- Step 4: Level selection & progress dashboard ---
  return (
    <div className="quiz-container">
      <div className="quiz-content">
        <h1 className="quiz-title">CyberSaathi Quiz</h1>
        <p className="quiz-subtitle">
          Test your cybersecurity knowledge across three difficulty levels. Complete each level to unlock the next!
        </p>

        <div className="levels-grid">
          {levels.map((level) => {
            const isAllowedByUserType =
              (userType === "Others" && level.id === 1) ||
              (userType === "Student" && level.id <= 2) ||
              userType === "Professional";

            const isUnlocked = unlockedLevels.includes(level.id) && isAllowedByUserType;
            const levelResult = quizResults[level.id];
            const isCompleted = levelResult && levelResult.score >= 60;

            return (
              <motion.div
                key={level.id}
                whileHover={isUnlocked ? { scale: 1.02, y: -2 } : {}}
                whileTap={isUnlocked ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: level.id * 0.1 }}
                className={`level-card ${!isUnlocked ? "locked" : ""} ${isCompleted ? "completed" : ""}`}
              >
                <div className="level-header">
                  <div className="level-number">{level.id}</div>
                  <h2 className="level-title">{level.title}</h2>
                  <p className="level-description">{level.description}</p>

                  {isCompleted && (
                    <div className="level-stats">
                      <div className="level-score">Score: {levelResult.score}%</div>
                      <div className="level-correct">
                        {levelResult.correctAnswers}/{levelResult.totalQuestions} correct
                      </div>
                    </div>
                  )}

                  <div className="level-action">
                    {!isUnlocked ? (
                      <div className="locked-message">
                        <FiLock className="inline" />{" "}
                        {!isAllowedByUserType
                          ? `Available for ${level.id === 1 ? "general" : level.id === 2 ? "student" : "professional"} users only`
                          : "Complete previous level"}
                      </div>
                    ) : (
                      <button
                        className={`start-button ${isCompleted ? "secondary" : "primary"}`}
                        onClick={() => setSelectedLevel(level.id)}
                      >
                        {isCompleted ? (
                          <>
                            <FiRefreshCw /> Play Again
                          </>
                        ) : (
                          <>
                            <FiPlay /> Start Quiz
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {Object.keys(quizResults).length > 0 && (
          <div className="progress-section">
            <h3 className="progress-title">Your Progress</h3>
            <p className="progress-text">
              You&apos;ve completed {Object.keys(quizResults).length} level(s). Keep learning!
            </p>
            <button onClick={() => setShowAnalytics(true)} className="analytics-button">
              <FiBarChart2 /> View Analytics Dashboard
            </button>
          </div>
        )}

        {showAnalytics && <AnalyticsDashboard onClose={() => setShowAnalytics(false)} />}
      </div>
    </div>
  );
}
