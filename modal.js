function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal | Gaétan
function closeModal() {
  modalbg.style.display = "none";
}

// récupère les élements du form dans des constantes
const form = document.getElementById("form");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthDate = document.getElementById("birthDate");
const quantity = document.getElementById("quantity");
const locations = document.getElementsByName("location");
const conditions = document.getElementById("checkbox1");

var isChecked;

// regex de validation de champ du form
const regexNumber = new RegExp("^[0-9]+$");
const regexMail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

const dataValid = function (element) {
  element.parentElement.classList.remove("error");
  element.parentElement.classList.add("success");
  element.parentElement.setAttribute("data-error-visible", "false");
};

const dataNotValid = function (element) {
  element.parentElement.classList.remove("success");
  element.parentElement.classList.add("error");
  element.parentElement.setAttribute("data-error-visible", "true");
};

const ConfirmMessage = () => {
  const message = document.querySelector(".confirmation");
  message.style.display = "block";

  setTimeout(() => {
    modalbg.style.display = "none";
  }, 4000);
  setTimeout(() => {
    message.style.display = "none";
  }, 3000);
};

function validate() {
  // test prenom
  if (firstName.value.length < 2) {
    dataNotValid(firstName);
  } else {
    dataValid(firstName);
  }
  // test nom
  if (lastName.value.length < 2) {
    dataNotValid(lastName);
  } else {
    dataValid(lastName);
  }
  // test mail
  if (regexMail.test(email.value)) {
    dataValid(email);
  } else {
    dataNotValid(email);
  }
  // test date naissance
  if (birthDate.value == "") {
    dataNotValid(birthDate);
  } else {
    dataValid(birthDate);
  }
  // test chiffres
  if (regexNumber.test(quantity.value)) {
    dataValid(quantity);
  } else {
    dataNotValid(quantity);
  }

  // vérifie qu'au moins 1 checkbox soit coché
  isChecked = 0;
  for (let i = 0; i < locations.length - 1; i++) {
    if (locations[i].checked) {
      isChecked++;
    }
  }
  if (isChecked == 0) {
    dataNotValid(location1);
  } else {
    dataValid(location1);
  }

  // Vérifie que les conditions d'utilisations soient acceptées
  if (conditions.checked) {
    dataValid(conditions);
  } else {
    dataNotValid(conditions);
  }

  const error = document.querySelector(".error");
  if (error === null) {
    ConfirmMessage();
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validate();
});
