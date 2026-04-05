const express = require("express");
const router = express.Router();

const triviaQuestions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", answer: "Mars" },
  {
    question: "What is the largest mammal in the world?",
    answer: "Blue whale",
  },
  { question: "The highest tower in the world?", answer: "Burj Khalifa" },
  { question: "The only continent populated with tigers", answer: "Asia" },
  {
    question: 'What year is referred as "The year of Africa"?',
    answer: "1960",
  },
  {
    question: "The very first human to step on the Moon",
    answer: "Neil Armstrong",
  },
  {
    question: "The best known capital of the cinema industry",
    answer: "Hollywood",
  },
  { question: "The island Pacific state of the USA", answer: "Hawaii" },
  { question: "Highest peak of North America", answer: "Mount McKinley" },
  {
    question: "The only continent where no state is formally settled",
    answer: "Antarctica",
  },
  { question: "The largest river of Israel", answer: "Jordan River" },
  { question: "Country most infamous of sea piracy", answer: "Somalia" },
  { question: "Year of the Internet launching", answer: "1990" },
  { question: "The highest peak of Israel", answer: "Mount Hermon" },
  {
    question: "Which city is the capital of Papua New Guinea?",
    answer: "Port Moresby",
  },
  { question: "The most famous structure of Paris", answer: "Eiffel Tower" },
  {
    question: "Which country is the biggest crude oil exporter in Africa?",
    answer: "Nigeria",
  },
  {
    question:
      "The most stereotypically famous and one of the first global fast food networks",
    answer: "McDonalds",
  },
  { question: "The most populous island of Indonesia", answer: "Java" },
  { question: "The origin country of Ceylon Tea", answer: "Sri Lanka" },
  {
    question:
      "Which country had increased its land with sea dams building and sea bottom draining?",
    answer: "The Netherlands",
  },
  {
    question: "Country where the city of Casablanca is situated",
    answer: "Morocco",
  },
  {
    question:
      "Is Maltese language descendant mostly from Phoenician or Italian? (or any other variant)",
    answer: "Phoenician",
  },
  { question: "The deepest land point in the world", answer: "Dead Sea" },
  {
    question: "How was Istanbul called before 1453 Ottoman conquest?",
    answer: "Constantinople",
  },
  {
    question: "The only country which is formally a confederation",
    answer: "Switzerland",
  },
  { question: "Which city is world southernmost?", answer: "Ushuaia" },
  { question: "The biggest country of Central Asia?", answer: "Kazakhstan" },
  { question: "The highest peak of Europe", answer: "Mont Blanc" },
];

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// GET /quiz — start quiz, first question
router.get("/", (req, res) => {
  req.session.pts = 0;
  req.session.index = 0;
  req.session.shuffledQuestions = shuffle([...triviaQuestions]);

  const { shuffledQuestions, index } = req.session;
  res.json({
    question: shuffledQuestions[index].question,
    questionNumber: index + 1,
    total: shuffledQuestions.length,
  });
});

// POST /quiz — submit answer, next question
router.post("/", (req, res) => {
  const { answer } = req.body;
  const { shuffledQuestions, index } = req.session;

  if (!answer || answer.trim() === "") {
    return res.status(400).json({ error: "Answer is required" });
  }

  const correct =
    answer.trim().toLowerCase() ===
    shuffledQuestions[index].answer.toLowerCase();
  const feedback = correct
    ? "Correct!"
    : `Wrong! The answer was: ${shuffledQuestions[index].answer}`;

  if (correct) req.session.pts++;
  req.session.index++;

  const nextIndex = req.session.index;

  if (nextIndex >= shuffledQuestions.length) {
    return res.json({ correct, feedback, finished: true });
  }

  res.json({
    correct,
    feedback,
    finished: false,
    question: shuffledQuestions[nextIndex].question,
    questionNumber: nextIndex + 1,
    total: shuffledQuestions.length,
  });
});

// GET /quiz/score — final score
router.get("/score", (req, res) => {
  const pts = req.session.pts ?? 0;
  const total = triviaQuestions.length;
  res.json({
    score: pts,
    total,
    message: `Congratulations! You scored ${pts} out of ${total}!`,
  });
});

module.exports = router;
