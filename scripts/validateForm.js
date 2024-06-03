'use strict';

const registrationForm = document.querySelector('.registration__form');
const registrationFormInputs = [
  document.querySelector('.registration__input[name="firstName"]'),
  document.querySelector('.registration__input[name="lastName"]'),
  document.querySelector('.registration__input[name="emailAddress"]'),
  document.querySelector('.registration__input[name="password"]')
]

function getInputType(input) {
  return input.getAttribute('type');
}

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

function validateInput(inputType, value) {
  let isValidInput;

  switch (inputType) {
    case 'email':
      isValidInput = validateEmail(value);
      
      break;
    case 'password':
      isValidInput = validatePassword(value);
      break;
    default:
      isValidInput = validateName(value);
  }

  return isValidInput;
}

function styleInputState(input, isValidInput) {
  isValidInput ? removeInvalidState(input) : addInvalidState(input) 
}

function manageInputState(input, isValidInput) {
  styleInputState(input, isValidInput)
}

function validateInputHandler(input) {
  const inputType = getInputType(input);
  const isValidInput = validateInput(inputType, input.value);
  manageInputState(input, isValidInput)
  return isValidInput;
}

function addInvalidState(element) {
  element.classList.add('registration__input--invalid');
  element.parentElement.classList.add('registration__input-wrapper--invalid');
}

function removeInvalidState(element) {
  element.classList.remove('registration__input--invalid');
  element.parentElement.classList.remove('registration__input-wrapper--invalid');
}

registrationForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let isValid = [];

  registrationFormInputs.forEach(input => {
    isValid.push(validateInputHandler(input));
  })

  if (isValid.includes(false)) {
    return;
  }
  registrationForm.reset();
});

registrationFormInputs.forEach(input => {
  input.addEventListener('input', () => {
    validateInputHandler(input);
  })
})