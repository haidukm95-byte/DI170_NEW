export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
  };
}

const STATS_KEY = 'dev-wordle-stats';

export const getStats = (): GameStats => {
  if (typeof window === 'undefined') {
    return getDefaultStats();
  }

  const stored = localStorage.getItem(STATS_KEY);
  if (!stored) {
    return getDefaultStats();
  }

  try {
    return JSON.parse(stored);
  } catch {
    return getDefaultStats();
  }
};

export const getDefaultStats = (): GameStats => ({
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  },
});

export const saveStats = (stats: GameStats): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};

export const updateStatsAfterWin = (guessCount: number): GameStats => {
  const stats = getStats();

  stats.gamesPlayed++;
  stats.gamesWon++;
  stats.currentStreak++;
  stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);

  if (guessCount >= 1 && guessCount <= 6) {
    stats.guessDistribution[guessCount as keyof typeof stats.guessDistribution]++;
  }

  saveStats(stats);
  return stats;
};

export const updateStatsAfterLoss = (): GameStats => {
  const stats = getStats();

  stats.gamesPlayed++;
  stats.currentStreak = 0;

  saveStats(stats);
  return stats;
};

export const resetStats = (): GameStats => {
  const stats = getDefaultStats();
  saveStats(stats);
  return stats;
};
