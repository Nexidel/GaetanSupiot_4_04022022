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
const submitBtn = document.getElementById("button-submit")

// Gaétan
const contentModal = document.querySelector(".modal-body")
const confirmModal = document.querySelector(".confirm")


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

// launch confirm modal
function confirmMessage() {
  contentModal.classList.add("display-none");
  confirmModal.classList.remove("display-none");
  submitBtn.value = 'Fermer'
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


function validate() {
  // test prenom
  if (firstName.value.length < 2) {
    dataNotValid(firstName);
    return false
  } else {
    dataValid(firstName);
  }
  // test nom
  if (lastName.value.length < 2) {
    dataNotValid(lastName);
    return false
  } else {
    dataValid(lastName);
  }
  // test mail
  if (regexMail.test(email.value)) {
    dataValid(email);
  } else {
    dataNotValid(email);
    return false
  }
  // test date naissance
  if (birthDate.value == "") {
    dataNotValid(birthDate);
    return false
  } else {
    dataValid(birthDate);
  }
  // test chiffres
  if (regexNumber.test(quantity.value)) {
    dataValid(quantity);
  } else {
    dataNotValid(quantity);
    return false
  }

  // Que 1 radio à été bien choisi
  isChecked = 0;
  for (let i = 0; i < locations.length - 1; i++) {
    if (locations[i].checked) {
      isChecked++;
    }
  }
  if (isChecked == 0) {
    dataNotValid(location1);
    return false
  } else {
    dataValid(location1);
  }

  // Vérifie que les conditions d'utilisations soient acceptées
  if (conditions.checked) {
    dataValid(conditions);
  } else {
    dataNotValid(conditions);
    return false
  }
  return true

}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validate();
  if (validate()==true) {
    confirmMessage();
  }
});
