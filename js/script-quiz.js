let quizArray = [];
let answersBtn = document.getElementsByClassName("answer");
let quiz = document.getElementById("quiz");
let quizNum = document.getElementById("quizNum");
let scoreValue = document.getElementById("score");
let lifesValue = document.getElementById("life");
// let answersList = document.getElementById("answersList");
let quizIndex = 0;

if (sessionStorage.getItem("quizIndex") != null) {
  quizIndex = JSON.parse(sessionStorage.getItem("quizIndex"));
}
let score = 0;
if (sessionStorage.getItem("score") != null) {
  score = Number(JSON.parse(sessionStorage.getItem("quizIndex")));
}
quizArray = JSON.parse(sessionStorage.getItem("quizArray"));

quizNum.innerHTML = quizIndex + 1;

function setUpPage() {
  // setTimeout(function () {
  changeQuiz();
  //   }, 1000);
  //   if (JSON.parse(sessionStorage.getItem("quizArray") != null)) {
  // quiz.innerHTML = quizArray[quizIndex].question;
  // answersBtn[0].innerHTML = quizArray[quizIndex].correct_answer;
  // for (let i = 0; i < quizArray[quizIndex].incorrect_answers.length; i++) {
  //   answersBtn[i + 1].innerHTML = quizArray[quizIndex].incorrect_answers[i];
  // }
  // quizIndex++;
  //   }
}

// function creatAnswerButton() {
//   let cartona = "";
//   for (let i = 0; i < quizArray[quizIndex].incorrect_answers.length + 1; i++) {
//     let button = document.createElement("button");
//     cartona += `<button
// class="answer btn btn-primary p-3 m-2 fs-4 w-50 align-self-center"
// >
// ${9}
// </button>`;
//   }
//   answersList.innerHTML = cartona;
// }

function changeQuiz() {
  console.log(quizArray);
  console.log(quizArray[quizIndex]);
  console.log(quiz.value);
  quizNum.innerHTML = quizIndex + 1;
  quiz.innerHTML = quizArray[quizIndex].question;

  let answers = [];
  answers.push(quizArray[quizIndex].correct_answer);

  for (let i = 0; i < quizArray[quizIndex].incorrect_answers.length; i++) {
    answers.push(quizArray[quizIndex].incorrect_answers[i]);
    console.log(answers);
  }

  let cartona = "";

  for (let i = 0; i < quizArray[quizIndex].incorrect_answers.length + 1; i++) {
    let randomNum = Math.floor(Math.random() * answers.length);
    console.log(randomNum, "random");

    cartona += `<button 
        class="answer btn btn-dark p-3 m-2 fs-4 align-self-center"
        onclick="checkIfCorrectAnswer(this)"
        >
        ${answers[randomNum]}
        </button>`;

    // answersBtn[i].innerHTML = answers[randomNum];
    answers.splice(randomNum, 1);

    console.log(answers);
  }

  answersList.innerHTML = cartona;

  //   if (quizIndex == quizArray.length) {
  //     // quizIndex--;
  //     quizIndex = quizArray.length ;
  //     console.log("finally");
  //   }
}

function checkIfCorrectAnswer(self) {
  console.log("click");
  console.log(self);
  console.log(self.innerText, "valu");
  // console.log(quizArray[quizIndex - 1].correct_answer, "correct");
  console.log(quizIndex, "current");

  if (self.innerText == quizArray[quizIndex].correct_answer) {
    quizIndex++;
    sessionStorage.setItem("quizIndex", quizIndex);
    console.log(quizIndex, "index");
    console.log("changeQuiz");
    score += 100;
    scoreValue.innerHTML = score;
    console.log(scoreValue.innerHTML);
    self.classList.add("btn-success");
    changeQuiz();
  } else {
    self.classList.add("btn-danger");
    lifesValue -= 1;
  }

  if (quizIndex == quizArray.length) {
    // quizIndex--;
    quizIndex = quizArray.length;
    // quiz.innerHTML = "Finish";
    // show score
    console.log("finally");
  }
  //  else {
  //   changeQuiz();
  // }
}

// window.onbeforeunload = function() {
//     return "Dude, are you sure you want to leave? Think of the kittens!";
// }

// window.addEventListener("unload", (event) => {
//     console.log("I am the 4th and last one…");
//   });

// let x =['dsbf','dcv','dsjkcv','jkdcv']

// for(let i in x)
// {
//     console.log(i);
// }
