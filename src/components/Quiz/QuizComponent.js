"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiClock, FiCheck, FiX, FiArrowLeft, FiAward } from "react-icons/fi";
import styles from "./QuizComponent.module.css";

import level1 from "../../Data/Quiz/level1";
import level2 from "../../Data/Quiz/level2";
import level3 from "../../Data/Quiz/level3";
import ResultSummary from "@/components/Quiz/ResultSummary";
import { recordQuizSession } from "../../utils/quizAnalytics";

// Dynamically import motion for suspense boundary compatibility
const MotionDiv = dynamic(() => import("framer-motion").then(mod => mod.motion.div), { ssr: false });
const MotionButton = dynamic(() => import("framer-motion").then(mod => mod.motion.button), { ssr: false });

const QUIZ_DATA = { 1: level1, 2: level2, 3: level3 };

export default function QuizComponent({ levelId, onLevelComplete, onBackToLevels }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const questions = QUIZ_DATA[levelId];
  const currentQ = questions[currentQuestion];

  const pathname = usePathname();
  const navLinks = [
    { name: "Home", href: "/Home" },
    { name: "Quiz", href: "/Quiz" },
    { name: "Article", href: "/Article/article" },
    { name: "About", href: "/About/about" },
    { name: "Community", href: "/Community/community" },
    { name: "Profile", href: "/Profile/profile" },
  ];

  const handleAnswer = useCallback((answer) => {
    const correct = Array.isArray(currentQ.options)
      ? answer === currentQ.answer
      : answer === currentQ.answer.toString();

    setIsCorrect(correct);
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
    }

    // Record user answer
    setUserAnswers(prev => [...prev, {
      questionId: currentQ.id,
      question: currentQ.question,
      userAnswer: answer,
      correctAnswer: currentQ.answer,
      isCorrect: correct,
      timeSpent: 30 - timeLeft
    }]);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(30);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setQuizCompleted(true);
        const finalScore = (score + (correct ? 1 : 0)) / questions.length * 100;
        onLevelComplete(levelId, finalScore, userAnswers);
      }
    }, 1500);
  }, [currentQ, score, timeLeft, currentQuestion, questions, onLevelComplete, levelId, userAnswers]);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showFeedback) {
      handleAnswer(null); // Time's up
    }
  }, [timeLeft, showFeedback, quizCompleted, handleAnswer]);

  const handleRetry = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setQuizCompleted(false);
    setUserAnswers([]);
  };

  if (quizCompleted) {
    const finalScore = Math.round((score / questions.length) * 100);
    const passed = finalScore >= 60;

    return (
      <ResultSummary
        levelId={levelId}
        score={finalScore}
        totalQuestions={questions.length}
        userAnswers={userAnswers}
        onRetry={handleRetry}
        onContinue={passed ? onBackToLevels : handleRetry}
        onViewAnalytics={(analytics) => {
          console.log('Analytics data:', analytics);
          // This will be integrated with the analytics system later
        }}
      />
    );
  }

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

      {/* Quiz Content */}
      <main className={styles.container}>
        <div className={styles.quizHeader}>
          <div className={styles.quizHeaderTop}>
            <button
              onClick={onBackToLevels}
              className={styles.backButton}
            >
              <FiArrowLeft /> Back to Levels
            </button>
            <div className={styles.questionCounter}>
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className={styles.progressContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Timer */}
          <div className={styles.timerContainer}>
            <div className={`${styles.timer} ${timeLeft <= 10 ? styles.warning : ''}`}>
              <FiClock /> {timeLeft}s
            </div>
          </div>

          {/* Score */}
          <div className={styles.scoreBadge}>
            Score: {score}
          </div>
        </div>

        {/* Question Card */}
        <MotionDiv
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.questionCard}
        >
          <h2 className={styles.questionText}>
            {currentQ.question}
          </h2>

          {/* Answer Options */}
          <div className={styles.optionsContainer}>
            {Array.isArray(currentQ.options) ? (
              // Multiple Choice
              currentQ.options.map((option, index) => {
                let buttonClass = styles.optionButton;
                if (showFeedback) {
                  if (option === currentQ.answer) {
                    buttonClass += ` ${styles.correct}`;
                  } else if (option === selectedAnswer) {
                    buttonClass += ` ${styles.incorrect}`;
                  }
                } else if (selectedAnswer === option) {
                  buttonClass += ` ${styles.selected}`;
                }

                return (
                  <MotionButton
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => !showFeedback && handleAnswer(option)}
                    disabled={showFeedback}
                    className={buttonClass}
                  >
                    {option}
                  </MotionButton>
                );
              })
            ) : (
              // True/False
              <>
                <MotionButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => !showFeedback && handleAnswer("true")}
                  disabled={showFeedback}
                  className={`${styles.optionButton} ${
                    showFeedback
                      ? "true" === currentQ.answer.toString() ? styles.correct : selectedAnswer === "true" ? styles.incorrect : ""
                      : selectedAnswer === "true" ? styles.selected : ""
                  }`}
                >
                  True
                </MotionButton>
                <MotionButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => !showFeedback && handleAnswer("false")}
                  disabled={showFeedback}
                  className={`${styles.optionButton} ${
                    showFeedback
                      ? "false" === currentQ.answer.toString() ? styles.correct : selectedAnswer === "false" ? styles.incorrect : ""
                      : selectedAnswer === "false" ? styles.selected : ""
                  }`}
                >
                  False
                </MotionButton>
              </>
            )}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <MotionDiv
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${styles.feedbackContainer} ${
                isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect
              }`}
            >
              <div className={styles.feedbackIcon}>
                {isCorrect ? '✅' : '❌'}
              </div>
              <div className={styles.feedbackTitle}>
                {isCorrect ? 'Correct!' : 'Incorrect!'}
              </div>

              {/* Scenario Explanation for Level 3 */}
              {currentQ.scenario && (
                <div className={styles.scenarioExplanation}>
                  <strong>Explanation:</strong> {currentQ.scenario}
                </div>
              )}

              <div className={styles.correctAnswer}>
                Correct answer: {Array.isArray(currentQ.options) ? currentQ.answer : currentQ.answer.toString()}
              </div>
            </MotionDiv>
          )}
        </MotionDiv>
      </main>
    </div>
  );
}