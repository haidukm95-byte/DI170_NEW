import { LetterStatus } from '@/lib/gameLogic';

interface TileProps {
  letter: string;
  status: LetterStatus;
  delay?: number;
  shake?: boolean;
}

export default function Tile({ letter, status, delay = 0, shake = false }: TileProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'correct':
        return 'bg-green-600 border-green-500 text-white shadow-lg shadow-green-500/50';
      case 'present':
        return 'bg-yellow-500 border-yellow-400 text-gray-900 shadow-lg shadow-yellow-500/50';
      case 'absent':
        return 'bg-gray-700 border-gray-600 text-gray-300';
      default:
        return 'bg-gray-800 border-gray-600 text-green-400';
    }
  };

  const getAnimationClass = () => {
    if (shake) return 'animate-shake';
    if (status !== 'empty' && letter) return 'animate-flip';
    return '';
  };

  return (
    <div
      className={`w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold uppercase font-mono ${getStatusColor()} ${getAnimationClass()} transition-all duration-300`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {letter}
    </div>
  );
}
