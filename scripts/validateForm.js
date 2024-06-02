'use strict';

const registrationForm = document.querySelector('.registration__form');
const registrationFormInputs = [
  document.querySelector('.registration__input[name="firstName"]'),
  document.querySelector('.registration__input[name="lastName"]'),
  document.querySelector('.registration__input[name="emailAddress"]'),
  document.querySelector('.registration__input[name="password"]')
]

function validateName(name) {
  const pattern = /^[A-Za-zÀ-ÖØ-öø-ÿ ']{1,50}$/
  return pattern.test(name.trim());
}

function validateEmail(email) {
  const pattern = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w-]+(?:\.[\w-]+)*\.[a-zA-Z]{2,}|(?:\d{1,3}\.){3}\d{1,3})(:\d{1,5})?$/;
  return pattern.test(email);
}

function validatePassword(password) {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+[\]{}|;:,.<>?]).{8,20}$/;
  return pattern.test(password.trim());
}

function addInvalidStyle(element) {
  element.classList.add('registration__input--invalid')
}

function removeInvalidStyle(element) {
  element.classList.remove('registration__input--invalid')
}

registrationForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let isValid = [];

  registrationFormInputs.forEach(input => {
    const inputType = input.getAttribute('type');
    let isValidInput;

    switch (inputType) {
      case 'email':
        isValidInput = validateEmail(input.value);
        !isValidInput ? addInvalidStyle(input) : removeInvalidStyle(input);
        isValid.push(isValidInput);
        break;
      case 'password':
        isValidInput = validatePassword(input.value);
        !isValidInput ? addInvalidStyle(input) : removeInvalidStyle(input);
        isValid.push(isValidInput);
        break;
      default:
        isValidInput = validateName(input.value);
        !isValidInput ? addInvalidStyle(input) : removeInvalidStyle(input);
        isValid.push(isValidInput);
    }
  })

  if (isValid.includes(false)) {
    return;
  }
  registrationForm.reset();
}) 