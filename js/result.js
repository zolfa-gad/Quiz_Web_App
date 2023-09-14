let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
let result = this.document.getElementById("resultText");
let score = this.document.getElementById("score");
let quizIndex = this.document.getElementById("quizNumber");

window.addEventListener("load", function () {
  if (currentUser.lives == 0) {
    result.innerHTML = "Better Luck Next Time";
  } else {
    result.innerHTML = "Congratulation";
  }

  score.innerHTML = currentUser.score;
  quizIndex.innerHTML = currentUser.quizIndex;
});

function onPlayAgain() {
  let newUser = {
    name: currentUser.name,
    email: currentUser.email,
    lives: 3,
    quizIndex: 0,
    score: 0,
  };
  sessionStorage.setItem("currentUser", JSON.stringify(newUser));
  // sessionStorage.removeItem("quizArray");

  location.replace("index.html");
}

function onBackHome() {
  sessionStorage.removeItem("currentUser");
  sessionStorage.removeItem("quizArray");
  location.replace("register.html");
}
