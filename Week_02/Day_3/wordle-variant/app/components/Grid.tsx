import Tile from './Tile';
import { LetterResult } from '@/lib/gameLogic';

interface GridProps {
  guesses: LetterResult[][];
  currentGuess: string;
  currentRow: number;
  shake?: boolean;
}

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

export default function Grid({ guesses, currentGuess, currentRow, shake = false }: GridProps) {
  const empties = Array(MAX_GUESSES - guesses.length - 1).fill(null);

  return (
    <div className="grid gap-2 mb-6">
      {/* Previous guesses */}
      {guesses.map((guess, i) => (
        <div key={i} className="flex gap-2 justify-center">
          {guess.map((result, j) => (
            <Tile
              key={j}
              letter={result.letter}
              status={result.status}
              delay={j * 100}
            />
          ))}
        </div>
      ))}

      {/* Current guess row */}
      {currentRow < MAX_GUESSES && (
        <div className="flex gap-2 justify-center">
          {Array(WORD_LENGTH)
            .fill(null)
            .map((_, i) => (
              <Tile
                key={i}
                letter={currentGuess[i] || ''}
                status="empty"
                shake={shake}
              />
            ))}
        </div>
      )}

      {/* Empty rows */}
      {empties.map((_, i) => (
        <div key={`empty-${i}`} className="flex gap-2 justify-center">
          {Array(WORD_LENGTH)
            .fill(null)
            .map((_, j) => (
              <Tile key={j} letter="" status="empty" />
            ))}
        </div>
      ))}
    </div>
  );
}
