const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const emojis = [
  { emoji: "😀", name: "Grinning Face" },
  { emoji: "😆", name: "Grinning Squinting Face" },
  { emoji: "🤣", name: "Rolling on the Floor Laughing" },
  { emoji: "🥰", name: "Smiling Face with Hearts" },
  { emoji: "😍", name: "Smiling Face with Heart-Eyes" },
  { emoji: "😘", name: "Face Blowing a Kiss" },
  { emoji: "😎", name: "Smiling Face with Sunglasses" },
  { emoji: "🤔", name: "Thinking Face" },
  { emoji: "😴", name: "Sleeping Face" },
  { emoji: "🤯", name: "Exploding Head" },
  { emoji: "😱", name: "Face Screaming in Fear" },
  { emoji: "🤗", name: "Smiling Face with Open Hands" },
  { emoji: "😤", name: "Face with Steam from Nose" },
  { emoji: "😭", name: "Loudly Crying Face" },
  { emoji: "😂", name: "Face with Tears of Joy" },
  { emoji: "🌮", name: "Taco" },
  { emoji: "🍕", name: "Pizza" },
  { emoji: "🍔", name: "Hamburger" },
  { emoji: "🍦", name: "Soft Ice Cream" },
  { emoji: "🎉", name: "Party Popper" },
  { emoji: "🎸", name: "Guitar" },
  { emoji: "🚀", name: "Rocket" },
  { emoji: "🌈", name: "Rainbow" },
  { emoji: "🦄", name: "Unicorn" },
  { emoji: "🐶", name: "Dog Face" },
  { emoji: "🐱", name: "Cat Face" },
  { emoji: "🦊", name: "Fox" },
  { emoji: "🐸", name: "Frog" },
  { emoji: "🦋", name: "Butterfly" },
  { emoji: "🌻", name: "Sunflower" },
];

// In-memory leaderboard
const leaderboard = [];

// GET /api/question — returns a random emoji + 4 shuffled options
app.get('/api/question', (_req, res) => {
  const correctIndex = Math.floor(Math.random() * emojis.length);
  const correct = emojis[correctIndex];

  const options = [correct.name];
  while (options.length < 4) {
    const random = emojis[Math.floor(Math.random() * emojis.length)];
    if (!options.includes(random.name)) {
      options.push(random.name);
    }
  }
  options.sort(() => Math.random() - 0.5);

  res.json({ emoji: correct.emoji, correctName: correct.name, options });
});

// POST /api/guess — checks if the guess is correct
app.post('/api/guess', (req, res) => {
  const { guess, correctName } = req.body;
  res.json({ correct: guess === correctName, correctName });
});

// GET /api/leaderboard — top 10 scores
app.get('/api/leaderboard', (_req, res) => {
  const top = [...leaderboard].sort((a, b) => b.score - a.score).slice(0, 10);
  res.json(top);
});

// POST /api/leaderboard — submit a score
app.post('/api/leaderboard', (req, res) => {
  const { name, score } = req.body;
  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: 'Name and score are required' });
  }
  leaderboard.push({ name, score, date: new Date().toLocaleDateString() });
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Emoji game running at http://localhost:${PORT}`);
});
