let categoryListElement = document.getElementById("categoryList");

let userName = JSON.parse(sessionStorage.getItem("currentUser")).name;
console.log(userName, "user");

document.getElementById("greeting").innerText += ` ${
  userName.charAt(0).toUpperCase() + userName.slice(1)
}`;

async function getCategoriesFromApi(callback) {
  let categoryURL = "https://opentdb.com/api_category.php";
  console.log(location.href.endsWith("index.html"), "href");
  if (location.href.endsWith("index.html")) {
    const httpRequest = await fetch(categoryURL);
    const response = await httpRequest.json();
    console.log(response);
    let categoryObjects = response.trivia_categories;

    console.log(categoryObjects);

    callback(categoryObjects);
  }
}

function displayListCategories(categoryObjects) {
  let resultCategory = "";

  for (let i = 1; i < categoryObjects.length; i++) {
    console.log(categoryObjects[i].name);
    resultCategory += `<span onclick='changeBackgroundColor(this,"categoryItem")' id="${categoryObjects[i].id}" class="categoryItem p-3 rounded-3   bg-default text-light fs-5">
    ${categoryObjects[i].name}
  </span>`;

    // resultCategory += `
    //       <option  value="${categoryObjects[i].id}" >${categoryObjects[i].name}</option>
    //          `;

    // resultCategory += `
    //       <li id='-1' onclick="addCategory(this)">${categoryObjects[i].name}</li>
    //          `;
  }
  categoryListElement.innerHTML = resultCategory;
}

async function getSelectedQuestions() {
  let baseURL = "https://opentdb.com/api.php?amount=10";

  if (selectedCategory != "") {
    baseURL += `&category=${selectedCategory}`;
  }

  if (selectedDifficulty != "") {
    baseURL += `&difficulty=${selectedDifficulty}`;
  }

  console.log(baseURL, "url");

  const httpRequest = await fetch(baseURL);
  const response = await httpRequest.json();

  let quizResult = response["results"];

  sessionStorage.setItem("quizArray", JSON.stringify(quizResult));

  // setTimeout(function () {
  document.getElementsByTagName("body").innerHTML = "<p>Wait</p>";
  location.replace("quiz.html");
  // }, 50);
}

let selectedCategory = "";
let selectedDifficulty = "";

function changeBackgroundColor(self, className) {
  let elements = document.getElementsByClassName(className);

  for (let i = 0; i < elements.length; i++) {
    if (elements[i] == self) {
      elements[i].classList.add("bg-dark");
      if (className == "categoryItem") {
        selectedCategory = self.id;
      } else if (className == "difficultyItem") {
        selectedDifficulty = self.id;
      }
    } else {
      elements[i].classList.add("bg-default");
      elements[i].classList.remove("bg-dark");
    }
  }

  console.log(selectedCategory, "cat");
  console.log(selectedDifficulty, "dif");
}

// .name;

// the start
// function setUpPage() {
//   getCategoriesFromApi();
// }

// async function getDataFromApi(url) {
//   const httpRequest = await fetch(url);
//   const response = await httpRequest.json();
//   return response;
// }
//   let httpRequest = new XMLHttpRequest();
//   httpRequest.open("GET", `${categoryURL}`);
//   httpRequest.send();

//   httpRequest.onreadystatechange = function () {
//     if (httpRequest.readyState == 4 && httpRequest.status == 200) {
//       let responseCat = JSON.parse(httpRequest.response);
//       let categoryObjects = responseCat["trivia_categories"];
//       let resultCategory = "";

//       //   console.log(, "result");

//       for (let i = 1; i < categoryObjects.length; i++) {
//         console.log(categoryObjects[i].name);
//         // let imgFullPath = imgPath + moviesResult[i].poster_path;
//         // let title = "";
//         // console.log(moviesResult[i].release_date.split('-')[0])

//         resultCategory += `
//         <option value="${categoryObjects[i].id}" >${categoryObjects[i].name}</option>
//            `;
//         // categoryListEle.innerHTML = resultCategory;
//       }
//       categoryListEle.innerHTML += resultCategory;
//     }
//   };
