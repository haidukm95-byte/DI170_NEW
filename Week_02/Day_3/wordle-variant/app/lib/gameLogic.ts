export type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

export interface LetterResult {
  letter: string;
  status: LetterStatus;
}

export const checkGuess = (guess: string, answer: string): LetterResult[] => {
  const result: LetterResult[] = [];
  const answerArray = answer.split('');
  const guessArray = guess.split('');

  // Create a frequency map of letters in the answer
  const answerLetterCount: { [key: string]: number } = {};
  answerArray.forEach(letter => {
    answerLetterCount[letter] = (answerLetterCount[letter] || 0) + 1;
  });

  // First pass: mark correct letters (green)
  guessArray.forEach((letter, i) => {
    if (letter === answerArray[i]) {
      result[i] = { letter, status: 'correct' };
      answerLetterCount[letter]--;
    } else {
      result[i] = { letter, status: 'absent' };
    }
  });

  // Second pass: mark present letters (yellow)
  guessArray.forEach((letter, i) => {
    if (result[i].status !== 'correct') {
      if (answerLetterCount[letter] && answerLetterCount[letter] > 0) {
        result[i] = { letter, status: 'present' };
        answerLetterCount[letter]--;
      }
    }
  });

  return result;
};

export const isWinningGuess = (guess: string, answer: string): boolean => {
  return guess.toUpperCase() === answer.toUpperCase();
};
