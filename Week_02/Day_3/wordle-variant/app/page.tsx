'use client';

import { useState, useEffect } from 'react';
import Grid from './components/Grid';
import Keyboard from './components/Keyboard';
import StatsModal from './components/StatsModal';
import { checkGuess, isWinningGuess, LetterResult, LetterStatus } from './lib/gameLogic';
import { getRandomWord, isValidWord } from './lib/words';
import { getStats, updateStatsAfterWin, updateStatsAfterLoss, GameStats } from './lib/stats';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

type GameStatus = 'playing' | 'won' | 'lost';

export default function Home() {
  const [answer, setAnswer] = useState('');
  const [guesses, setGuesses] = useState<LetterResult[][]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [letterStatuses, setLetterStatuses] = useState<{ [key: string]: LetterStatus }>({});
  const [message, setMessage] = useState('');
  const [shake, setShake] = useState(false);
  const [stats, setStats] = useState<GameStats>(getStats());
  const [showStats, setShowStats] = useState(false);

  // Initialize game
  useEffect(() => {
    setAnswer(getRandomWord());
    setStats(getStats());
  }, []);

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus !== 'playing') return;

      if (e.key === 'Enter') {
        handleKeyPress('ENTER');
      } else if (e.key === 'Backspace') {
        handleKeyPress('BACKSPACE');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, guesses, gameStatus, answer]);

  const handleKeyPress = (key: string) => {
    if (gameStatus !== 'playing') return;

    if (key === 'ENTER') {
      if (currentGuess.length !== WORD_LENGTH) {
        showMessage('Not enough letters');
        triggerShake();
        return;
      }

      if (!isValidWord(currentGuess)) {
        showMessage('Not in word list');
        triggerShake();
        return;
      }

      submitGuess();
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
      setMessage('');
    } else if (currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(prev => prev + key);
      setMessage('');
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const submitGuess = () => {
    const result = checkGuess(currentGuess, answer);
    const newGuesses = [...guesses, result];
    setGuesses(newGuesses);

    // Update letter statuses for keyboard
    const newLetterStatuses = { ...letterStatuses };
    result.forEach(({ letter, status }) => {
      const currentStatus = newLetterStatuses[letter];
      // Only update if new status is better
      if (!currentStatus ||
          status === 'correct' ||
          (status === 'present' && currentStatus !== 'correct')) {
        newLetterStatuses[letter] = status;
      }
    });
    setLetterStatuses(newLetterStatuses);

    // Check win condition
    if (isWinningGuess(currentGuess, answer)) {
      setGameStatus('won');
      showMessage('You won!');
      const newStats = updateStatsAfterWin(newGuesses.length);
      setStats(newStats);
      setTimeout(() => setShowStats(true), 1500);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setGameStatus('lost');
      showMessage(`Game over! The word was ${answer}`);
      const newStats = updateStatsAfterLoss();
      setStats(newStats);
      setTimeout(() => setShowStats(true), 1500);
    }

    setCurrentGuess('');
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  const resetGame = () => {
    setAnswer(getRandomWord());
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setLetterStatuses({});
    setMessage('');
    setShowStats(false);
  };

  const generateShareText = () => {
    const emojiGrid = guesses.map(guess =>
      guess.map(({ status }) => {
        switch (status) {
          case 'correct': return '🟩';
          case 'present': return '🟨';
          default: return '⬛';
        }
      }).join('')
    ).join('\n');

    const statusText = gameStatus === 'won'
      ? `${guesses.length}/${MAX_GUESSES}`
      : 'X/6';

    return `Dev Wordle ${statusText}\n\n${emojiGrid}\n\nPlay at: ${window.location.href}`;
  };

  const handleShare = async () => {
    const shareText = generateShareText();

    try {
      if (navigator.share) {
        await navigator.share({ text: shareText });
      } else {
        await navigator.clipboard.writeText(shareText);
        showMessage('Copied to clipboard!');
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 font-mono">
      <div className="w-full max-w-lg">
        {/* Terminal-style header */}
        <div className="mb-6 border border-green-500 rounded-lg p-4 bg-black/50 backdrop-blur">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-green-400 text-sm">~/dev-wordle</span>
            </div>
            <button
              onClick={() => setShowStats(true)}
              className="text-green-400 hover:text-green-300 transition-colors"
              title="View Statistics"
            >
              📊
            </button>
          </div>
          <h1 className="text-3xl font-bold text-center text-green-400">
            <span className="text-gray-500">$</span> DEV WORDLE
          </h1>
          <p className="text-center text-gray-400 text-sm mt-1">
            {'>'} Guess the programming term in 6 tries
          </p>
        </div>

        {/* Message display */}
        {message && (
          <div className="text-center mb-4 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-yellow-400 font-semibold">
            {message}
          </div>
        )}

        {/* Grid */}
        <Grid
          guesses={guesses}
          currentGuess={currentGuess}
          currentRow={guesses.length}
          shake={shake}
        />

        {/* Keyboard */}
        <Keyboard
          onKeyPress={handleKeyPress}
          letterStatuses={letterStatuses}
        />

        {/* Reset button */}
        {gameStatus !== 'playing' && (
          <div className="text-center mt-6">
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-colors border-2 border-green-300"
            >
              <span className="text-gray-900">$</span> NEW_GAME
            </button>
          </div>
        )}

        {/* Instructions - Terminal style */}
        <div className="mt-8 text-sm text-gray-400 border border-gray-700 rounded p-4 bg-black/30">
          <div className="mb-2 text-green-400">// Legend:</div>
          <p className="flex items-center gap-2">
            <span className="inline-block w-5 h-5 bg-green-600 rounded"></span>
            <code>correct_position()</code>
          </p>
          <p className="flex items-center gap-2 mt-1">
            <span className="inline-block w-5 h-5 bg-yellow-500 rounded"></span>
            <code>wrong_position()</code>
          </p>
          <p className="flex items-center gap-2 mt-1">
            <span className="inline-block w-5 h-5 bg-gray-600 rounded"></span>
            <code>not_found()</code>
          </p>
        </div>
      </div>

      {/* Stats Modal */}
      <StatsModal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        stats={stats}
        onShare={gameStatus !== 'playing' ? handleShare : undefined}
      />
    </main>
  );
}
