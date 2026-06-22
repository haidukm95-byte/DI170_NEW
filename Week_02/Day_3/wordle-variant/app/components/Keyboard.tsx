import { LetterStatus } from '@/lib/gameLogic';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  letterStatuses: { [key: string]: LetterStatus };
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

export default function Keyboard({ onKeyPress, letterStatuses }: KeyboardProps) {
  const getKeyColor = (key: string) => {
    const status = letterStatuses[key];
    switch (status) {
      case 'correct':
        return 'bg-green-600 text-white border-green-500 shadow-lg shadow-green-500/30';
      case 'present':
        return 'bg-yellow-500 text-gray-900 border-yellow-400 shadow-lg shadow-yellow-500/30';
      case 'absent':
        return 'bg-gray-700 text-gray-400 border-gray-600';
      default:
        return 'bg-gray-800 text-green-400 border-gray-700 hover:bg-gray-700';
    }
  };

  const getKeySize = (key: string) => {
    if (key === 'ENTER' || key === 'BACKSPACE') {
      return 'px-4 text-xs';
    }
    return 'w-10';
  };

  return (
    <div className="w-full max-w-lg mx-auto font-mono">
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`${getKeySize(key)} h-14 rounded font-bold uppercase flex items-center justify-center cursor-pointer hover:opacity-90 transition-all duration-200 border-2 ${getKeyColor(key)}`}
            >
              {key === 'BACKSPACE' ? '⌫' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
