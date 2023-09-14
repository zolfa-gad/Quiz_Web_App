let alphaIcons = [
  '<i class="fa-solid fa-a text-mint fa-lg fs-3 "></i>',
  '<i class="fa-solid fa-b text-mint fa-lg fs-3 "></i>',
  '<i class="fa-solid fa-c text-mint fa-lg fs-3 "></i>',
  '<i class="fa-solid fa-d text-mint fa-lg fs-3 "></i>',
  '<i class="fa-solid fa-e text-mint fa-lg fs-3 "></i>',
  '<i class="fa-solid fa-f text-mint fa-lg fs-3 "></i>',
];
let choicesBtns = document.getElementsByClassName("choice");
let quizElement = document.getElementById("quiz");
let scoreElement = document.getElementById("score");
let liveElement = document.getElementById("lives");
let choiceList = document.getElementById("choiceList");
let quizNumber = document.getElementById("quizNumber");
let scoreValue = 0;
let quizArray = [];
let quizIndex = 0;

let currentUser = null;

let barBack = document.getElementById("barBack");
let barActive = document.getElementById("barActive");
let precentage = barBack.getBoundingClientRect().width / 10;

if (sessionStorage.getItem("quizArray") != null) {
  quizArray = JSON.parse(sessionStorage.getItem("quizArray"));
  console.log(quizArray, "array");
}

if (sessionStorage.getItem("currentUser") != null) {
  currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  console.log(currentUser, "currentUser");
  scoreValue = currentUser.score;
  scoreElement.innerHTML = scoreValue;
  quizIndex = currentUser.quizIndex;
  quizElement.innerHTML = quizArray[quizIndex].question;
  quizNumber.innerHTML = quizIndex + 1;
  displayLivesElement(currentUser.lives);
  displayNextQuiz();
}

function displayLivesElement(count) {
  // let live = '<li><i class="fa-solid fa-leaf"></i></li>';
  // let live = '<li><i class="fa-solid fa-seedling"></i></li>';
  let live =
    '<li><i class="fa-solid fa-lightbulb fa-xl text-default"></i></li>';
  // let emptyLive = '<li><i class="fa-regular fa-leaf"></i></li>';
  // let emptyLive = '<li><i class="fa-light fa-seedling"></i></li>';
  let emptyLive =
    '<li><i class="fa-regular fa-lightbulb fa-xl text-dark"></i></li>';
  let cartona = "";
  if (count == 3) {
    for (let i = 0; i < count; i++) {
      cartona += live;
      // cartona += `<li><i class="fa-solid fa-heart text-danger fa-lg"></i></li>`;
    }
  } else {
    for (let i = 0; i < count; i++) {
      cartona += live;
      // cartona += `<li><i class="fa-solid fa-heart text-danger fa-lg"></i></li>`;
    }
    for (let i = count; i < 3; i++) {
      cartona += emptyLive;
      // cartona += `<li><i class="fa-regular fa-heart text-danger fa-lg"></i></li>`;
      // cartona += `<li><i class="fa-regular fa-heart text-danger fa-lg"></i></li>`;
    }
  }

  liveElement.innerHTML = cartona;
}

function displayNextQuiz() {
  console.log(quizArray);
  console.log(quizArray[quizIndex]);
  console.log(quiz.value);

  quizElement.innerHTML = quizArray[quizIndex].question;
  quizNumber.innerHTML = quizIndex + 1;

  document.getElementById("barActive").style.width = `${
    precentage * (quizIndex + 1)
  }px`;

  let answers = [];
  answers.push(quizArray[quizIndex].correct_answer);

  for (let i = 0; i < quizArray[quizIndex].incorrect_answers.length; i++) {
    answers.push(quizArray[quizIndex].incorrect_answers[i]);
    console.log(answers);
  }
  diplayChoiceButtons(answers);
}

function diplayChoiceButtons(answers) {
  let cartona = "";

  for (let i = 0; i < quizArray[quizIndex].incorrect_answers.length + 1; i++) {
    let randomNum = Math.floor(Math.random() * answers.length);
    console.log(randomNum, "random");

    cartona += `<button
        class="answer btn btn-dark p-3 m-2 fs-4 align-self-center d-flex align-items-center justify-content-center gap-3" onclick="checkIfCorrectAnswer(this)"> ${alphaIcons[i]}  ${answers[randomNum]} </button>`;

    answers.splice(randomNum, 1);

    console.log(answers);
  }

  choiceList.innerHTML = cartona;
}

function checkIfCorrectAnswer(self) {
  console.log("click");
  console.log(self);
  console.log(self.innerText, "valu");
  console.log(quizIndex, "current");

  if (self.innerText == quizArray[quizIndex].correct_answer) {
    quizIndex++;
    currentUser.quizIndex=quizIndex;
    scoreValue += 100;
    scoreElement.innerHTML = scoreValue;
    currentUser.score = scoreValue;

    self.classList.remove("btn-dark");
    self.classList.add("btn-success");
    displayNextQuiz();
  } else {
    self.setAttribute("disabled", "disabled");
    currentUser.lives -= 1;
    displayLivesElement(currentUser.lives);
  }
  sessionStorage.setItem("currentUser", JSON.stringify(currentUser));

  // if the index is the last you finished successfully
  // else if the lives is 0 good luck in the next time "Better luck next time"

  if (quizIndex == quizArray.length) {
    quizIndex = quizArray.length;
    console.log("Finished Successfully");
    location.replace("result.html");
  } else if (currentUser.lives == 0) {
    console.log("Better luck next time");
    location.replace("result.html");
  }
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

// let cartona = "";
// for (let i = 0; i < alphaIcons.length; i++) {
//   cartona += alphaIcons[i];
//   // console.log(cartona);
// }
// document.getElementById("choiceList").innerHTML = cartona;
// console.log(barBack, "bar");
// document.getElementById("barActive").style.width = `${precentage}px`;
// console.log(
// document.getElementById("barActive").getBoundingClientRect().width,
// "test"
// );
// console.log(precentage, "pre");

// if (sessionStorage.getItem("quizIndex") != null) {
//   quizIndex = JSON.parse(sessionStorage.getItem("quizIndex"));
// }
// let score = 0;
// if (sessionStorage.getItem("score") != null) {
//   score = Number(JSON.parse(sessionStorage.getItem("quizIndex")));
// }
// quizArray = JSON.parse(sessionStorage.getItem("quizArray"));

// quizNum.innerHTML = quizIndex + 1;

// function setUpPage() {
// displayNextQuiz();
// setTimeout(function () {
// changeQuiz();
//   }, 1000);
//   if (JSON.parse(sessionStorage.getItem("quizArray") != null)) {
// quiz.innerHTML = quizArray[quizIndex].question;
// answersBtn[0].innerHTML = quizArray[quizIndex].correct_answer;
// for (let i = 0; i < quizArray[quizIndex].incorrect_answers.length; i++) {
//   answersBtn[i + 1].innerHTML = quizArray[quizIndex].incorrect_answers[i];
// }
// quizIndex++;
//   }
// }

// // function creatAnswerButton() {
// //   let cartona = "";
// //   for (let i = 0; i < quizArray[quizIndex].incorrect_answers.length + 1; i++) {
// //     let button = document.createElement("button");
// //     cartona += `<button
// // class="answer btn btn-primary p-3 m-2 fs-4 w-50 align-self-center"
// // >
// // ${9}
// // </button>`;
// //   }
// //   answersList.innerHTML = cartona;
// // }
