window.addEventListener("load", function () {
  let result = this.document.getElementById("resultText");
  let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (currentUser.lives == 0) {
    result.innerHTML = "Good Luck Next Time";
  } else {
    result.innerHTML = "Congratulation";
  }
});
