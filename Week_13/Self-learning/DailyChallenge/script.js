const quizBody = document.querySelector(".quiz-body");
const question = document.querySelector(".question");
const answer = document.querySelector(".answer");
const nextQ = document.querySelector(".next-q");

async function firstQuestion() {
  const res = await fetch("/quiz");
  const data = await res.json();
  quizBody.style.display = "flex";
  question.textContent = data.question;
  answer.value = "";
}

async function scoreWindow() {
  const res = await fetch("/quiz/score");
  const data = await res.json();

  const score = document.querySelector("#score");
  const congr = document.querySelector("#congr");
  const restart = document.querySelector("#restart");
  const finish = document.querySelector("#finish");

  quizBody.style.display = "none";
  score.style.display = "flex";
  congr.textContent = data.message;

  restart.addEventListener("click", () => {
    score.style.display = "none";
    firstQuestion();
  });
  finish.addEventListener("click", () => {
    score.style.display = "none";
  });
}

nextQ.addEventListener("click", async () => {
  if (answer.value.trim() === "") return;

  const res = await fetch("/quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer: answer.value.trim() }),
  });
  const data = await res.json();

  nextQ.disabled = true;
  quizBody.style.backgroundColor = data.correct ? "green" : "red";

  setTimeout(() => {
    quizBody.style.backgroundColor = "aquamarine";
    nextQ.disabled = false;
    if (data.finished) {
      scoreWindow();
    } else {
      question.textContent = data.question;
      answer.value = "";
    }
  }, 1000);
});

firstQuestion();
