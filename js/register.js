let userName = document.getElementById("name");
let userEmail = document.getElementById("email");

function submitUserData() {
  if (userName.value && userEmail.value) {
    let currentUser = {
      name: userName.value,
      email: userEmail.value,
      score: 0,
      lives: 3,
      quizIndex: 0,
    };
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
    location.replace("index.html");
    console.log(userName.value, "name");
    console.log(userEmail.value, "email");
    console.log(currentUser, "current");
  }
}
