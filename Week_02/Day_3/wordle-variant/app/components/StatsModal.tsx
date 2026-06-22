import { GameStats } from '@/lib/stats';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: GameStats;
  onShare?: () => void;
}

export default function StatsModal({ isOpen, onClose, stats, onShare }: StatsModalProps) {
  if (!isOpen) return null;

  const winPercentage = stats.gamesPlayed > 0
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
    : 0;

  const maxGuessCount = Math.max(...Object.values(stats.guessDistribution));

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-green-500 rounded-lg max-w-md w-full p-6 font-mono shadow-2xl shadow-green-500/20">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-400">
            <span className="text-gray-500">$</span> STATISTICS
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-green-400 text-2xl w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{stats.gamesPlayed}</div>
            <div className="text-xs text-gray-400">Played</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{winPercentage}</div>
            <div className="text-xs text-gray-400">Win %</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{stats.currentStreak}</div>
            <div className="text-xs text-gray-400">Current</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{stats.maxStreak}</div>
            <div className="text-xs text-gray-400">Max</div>
          </div>
        </div>

        {/* Guess Distribution */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-green-400 mb-3">
            {'>'} GUESS DISTRIBUTION
          </h3>
          <div className="space-y-1">
            {Object.entries(stats.guessDistribution).map(([guess, count]) => (
              <div key={guess} className="flex items-center gap-2">
                <div className="text-green-400 w-4">{guess}</div>
                <div className="flex-1 bg-gray-800 rounded overflow-hidden">
                  <div
                    className="bg-green-600 text-white text-xs px-2 py-1 text-right font-bold"
                    style={{
                      width: maxGuessCount > 0 ? `${(count / maxGuessCount) * 100}%` : '0%',
                      minWidth: count > 0 ? '2rem' : '0',
                    }}
                  >
                    {count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share Button */}
        {onShare && (
          <button
            onClick={onShare}
            className="w-full px-6 py-3 bg-green-500 text-gray-900 font-bold rounded hover:bg-green-400 transition-colors border-2 border-green-300"
          >
            <span className="text-gray-900">$</span> SHARE
          </button>
        )}
      </div>
    </div>
  );
}
