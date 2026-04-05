const express = require("express");
const session = require("express-session");
const path = require("path");

const quizRouter = require("./routes/quiz");

const app = express();
const PORT = 5800;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "quiz-secret",
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(express.static(path.join(__dirname)));

app.use("/quiz", quizRouter); // mount the router

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
