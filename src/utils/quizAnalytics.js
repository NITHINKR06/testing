// Quiz Analytics Utility
// Handles tracking, storage, and analysis of quiz performance data

const QUIZ_ANALYTICS_KEY = 'cybersaathi_quiz_analytics';

/**
 * Initialize analytics storage
 */
export const initAnalytics = () => {
  if (typeof window !== 'undefined' && !localStorage.getItem(QUIZ_ANALYTICS_KEY)) {
    localStorage.setItem(QUIZ_ANALYTICS_KEY, JSON.stringify({
      sessions: [],
      overallStats: {
        totalQuizzes: 0,
        totalQuestions: 0,
        totalCorrect: 0,
        totalTimeSpent: 0,
        averageScore: 0,
        bestScore: 0,
        levelsCompleted: {}
      },
      lastUpdated: new Date().toISOString()
    }));
  }
};

/**
 * Record a quiz session
 * @param {Object} sessionData - The quiz session data
 */
export const recordQuizSession = (sessionData) => {
  if (typeof window === 'undefined') return;

  try {
    const analytics = getAnalyticsData();
    const session = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...sessionData,
      analytics: calculateSessionAnalytics(sessionData)
    };

    analytics.sessions.unshift(session);
    updateOverallStats(analytics, session);
    analytics.lastUpdated = new Date().toISOString();
    
    localStorage.setItem(QUIZ_ANALYTICS_KEY, JSON.stringify(analytics));
    
    return session;
  } catch (error) {
    console.error('Error recording quiz session:', error);
  }
};

/**
 * Get all analytics data
 * @returns {Object} Analytics data
 */
export const getAnalyticsData = () => {
  if (typeof window === 'undefined') return { sessions: [], overallStats: {} };
  
  try {
    const data = localStorage.getItem(QUIZ_ANALYTICS_KEY);
    return data ? JSON.parse(data) : { sessions: [], overallStats: {} };
  } catch (error) {
    console.error('Error getting analytics data:', error);
    return { sessions: [], overallStats: {} };
  }
};

/**
 * Calculate analytics for a single session
 * @param {Object} sessionData - Session data
 * @returns {Object} Analytics metrics
 */
const calculateSessionAnalytics = (sessionData) => {
  const { userAnswers, totalQuestions, score } = sessionData;
  
  const totalTime = userAnswers.reduce((sum, answer) => sum + answer.timeSpent, 0);
  const averageTime = totalTime / userAnswers.length;
  const accuracy = (userAnswers.filter(a => a.isCorrect).length / userAnswers.length) * 100;
  
  const difficultyAnalysis = userAnswers.reduce((acc, answer) => {
    const difficulty = getQuestionDifficulty(answer.timeSpent);
    acc[difficulty] = (acc[difficulty] || 0) + 1;
    return acc;
  }, {});

  const timeDistribution = {
    fast: userAnswers.filter(a => a.timeSpent < 8).length,
    medium: userAnswers.filter(a => a.timeSpent >= 8 && a.timeSpent <= 20).length,
    slow: userAnswers.filter(a => a.timeSpent > 20).length
  };

  return {
    totalTime,
    averageTime: Math.round(averageTime * 100) / 100,
    accuracy: Math.round(accuracy * 100) / 100,
    difficultyAnalysis,
    timeDistribution,
    performanceScore: calculatePerformanceScore(accuracy, averageTime)
  };
};

/**
 * Update overall statistics
 * @param {Object} analytics - Analytics data
 * @param {Object} session - New session data
 */
const updateOverallStats = (analytics, session) => {
  const { overallStats } = analytics;
  const { levelId, score, totalQuestions, userAnswers, analytics: sessionAnalytics } = session;

  // Update basic stats
  overallStats.totalQuizzes += 1;
  overallStats.totalQuestions += totalQuestions;
  overallStats.totalCorrect += userAnswers.filter(a => a.isCorrect).length;
  overallStats.totalTimeSpent += sessionAnalytics.totalTime;
  overallStats.averageScore = calculateRunningAverage(overallStats.averageScore, overallStats.totalQuizzes, score);
  
  // Update best score
  if (score > (overallStats.bestScore || 0)) {
    overallStats.bestScore = score;
  }

  // Update level-specific stats
  if (!overallStats.levelsCompleted[levelId]) {
    overallStats.levelsCompleted[levelId] = {
      attempts: 0,
      completions: 0,
      bestScore: 0,
      averageScore: 0,
      totalTime: 0
    };
  }

  const levelStats = overallStats.levelsCompleted[levelId];
  levelStats.attempts += 1;
  levelStats.totalTime += sessionAnalytics.totalTime;
  
  if (score >= 60) {
    levelStats.completions += 1;
  }
  
  if (score > levelStats.bestScore) {
    levelStats.bestScore = score;
  }
  
  levelStats.averageScore = calculateRunningAverage(levelStats.averageScore, levelStats.attempts, score);
};

/**
 * Calculate running average
 */
const calculateRunningAverage = (currentAverage, totalCount, newValue) => {
  return ((currentAverage * (totalCount - 1)) + newValue) / totalCount;
};

/**
 * Calculate performance score (0-100)
 */
const calculatePerformanceScore = (accuracy, averageTime) => {
  // Weight accuracy more heavily than speed
  const accuracyWeight = 0.7;
  const speedWeight = 0.3;
  
  // Normalize time (lower time is better, max 30s per question)
  const maxTimePerQuestion = 30;
  const timeScore = Math.max(0, 1 - (averageTime / maxTimePerQuestion)) * 100;
  
  return Math.round((accuracy * accuracyWeight) + (timeScore * speedWeight));
};

/**
 * Determine question difficulty based on response time
 */
const getQuestionDifficulty = (timeSpent) => {
  if (timeSpent < 8) return 'easy';
  if (timeSpent <= 20) return 'medium';
  return 'hard';
};

/**
 * Get analytics for a specific level
 * @param {number} levelId - Level ID
 * @returns {Object} Level analytics
 */
export const getLevelAnalytics = (levelId) => {
  const analytics = getAnalyticsData();
  const levelSessions = analytics.sessions.filter(session => session.levelId === levelId);
  
  if (levelSessions.length === 0) return null;

  const latestSession = levelSessions[0];
  const bestSession = levelSessions.reduce((best, session) => 
    session.score > best.score ? session : best, levelSessions[0]
  );

  const totalAttempts = levelSessions.length;
  const completions = levelSessions.filter(s => s.score >= 60).length;
  const completionRate = (completions / totalAttempts) * 100;

  return {
    levelId,
    totalAttempts,
    completions,
    completionRate: Math.round(completionRate * 100) / 100,
    bestScore: bestSession.score,
    latestScore: latestSession.score,
    averageScore: Math.round(levelSessions.reduce((sum, s) => sum + s.score, 0) / totalAttempts * 100) / 100,
    sessions: levelSessions
  };
};

/**
 * Get overall progress analytics
 * @returns {Object} Progress analytics
 */
export const getProgressAnalytics = () => {
  const analytics = getAnalyticsData();
  const { overallStats } = analytics;

  return {
    totalQuizzes: overallStats.totalQuizzes,
    totalQuestionsAnswered: overallStats.totalQuestions,
    overallAccuracy: overallStats.totalQuestions > 0 
      ? Math.round((overallStats.totalCorrect / overallStats.totalQuestions) * 100 * 100) / 100
      : 0,
    averageScore: Math.round(overallStats.averageScore * 100) / 100,
    bestScore: overallStats.bestScore,
    totalTimeSpent: overallStats.totalTimeSpent,
    levels: Object.entries(overallStats.levelsCompleted).map(([levelId, stats]) => ({
      levelId: parseInt(levelId),
      attempts: stats.attempts,
      completions: stats.completions,
      completionRate: Math.round((stats.completions / stats.attempts) * 100 * 100) / 100,
      bestScore: stats.bestScore,
      averageScore: Math.round(stats.averageScore * 100) / 100,
      averageTime: stats.attempts > 0 ? Math.round(stats.totalTime / stats.attempts * 100) / 100 : 0
    }))
  };
};

/**
 * Export analytics data as JSON
 * @returns {string} JSON string of analytics data
 */
export const exportAnalyticsData = () => {
  return JSON.stringify(getAnalyticsData(), null, 2);
};

/**
 * Clear all analytics data
 */
export const clearAnalyticsData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(QUIZ_ANALYTICS_KEY);
    initAnalytics();
  }
};

/**
 * Get streak information
 * @returns {Object} Streak data
 */
export const getStreakData = () => {
  const analytics = getAnalyticsData();
  const sessions = analytics.sessions;
  
  if (sessions.length === 0) return { currentStreak: 0, longestStreak: 0 };

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let lastDate = null;

  sessions.forEach(session => {
    const sessionDate = new Date(session.timestamp).toDateString();
    
    if (sessionDate !== lastDate) {
      if (session.score >= 60) {
        tempStreak++;
        currentStreak = tempStreak;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
      lastDate = sessionDate;
    }
  });

  return { currentStreak, longestStreak };
};

// Initialize analytics on import
if (typeof window !== 'undefined') {
  initAnalytics();
}
