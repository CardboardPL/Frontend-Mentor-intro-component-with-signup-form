'use strict';

const registrationForm = document.querySelector('.registration__form');
const registrationFormInputs = [
  document.querySelector('.registration__input[name="firstName"]'),
  document.querySelector('.registration__input[name="lastName"]'),
  document.querySelector('.registration__input[name="emailAddress"]'),
  document.querySelector('.registration__input[name="password"]'),
];

// Helper functions

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getParentElement(element) {
  return element.parentElement;
}

function getInputType(input) {
  return input.getAttribute('type');
}

function validateName(name) {
  const pattern = /^[A-Za-zÀ-ÖØ-öø-ÿ ']{1,50}$/;
  return pattern.test(name.trim());
}

// Validation functions
function validateEmail(email) {
  const pattern =
    /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w-]+(?:\.[\w-]+)*\.[a-zA-Z]{2,}|(?:\d{1,3}\.){3}\d{1,3})(:\d{1,5})?$/;
  return pattern.test(email);
}

function validatePassword(password) {
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+[\]{}|;:,.<>?]).{8,20}$/;
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

// State management functions
function determineErrorMessage(inputType, input) {
  const inputName = input.name.split(/(?=[A-Z])/);
  inputName[0] = capitalizeFirstLetter(inputName[0]);
  const formattedName = inputName.join(' ');

  const errorMessages = {
    blankInput: 'cannot be empty',
    email: 'Looks like this is not an email',
    password: 'Looks like this is not a valid password',
  };
  const isEmpty = input.value.trim().length === 0;

  if (isEmpty) {
    return `${formattedName} ${errorMessages.blankInput}`;
  }

  return `${errorMessages[inputType]}`;
}

function displayErrorMessage(errorMessageContainer, errorMessage) {
  errorMessageContainer.textContent = errorMessage;
  errorMessageContainer.removeAttribute('aria-hidden');
}

function hideErrorMessage(errorMessageContainer) {
  errorMessageContainer.textContent = '';
  errorMessageContainer.setAttribute('aria-hidden', true);
}

function addInvalidState(input, inputType) {
  const errorMessage = determineErrorMessage(inputType, input);
  const parentElement = getParentElement(input);
  const errorMessageContainer = parentElement.querySelector(
    '.registration__error-message'
  );
  parentElement.classList.add('registration__input-wrapper--invalid');
  input.classList.add('registration__input--invalid');
  input.setAttribute('aria-describedby', errorMessageContainer.id);
  displayErrorMessage(errorMessageContainer, errorMessage);
}

function removeInvalidState(input) {
  const parentElement = getParentElement(input);
  const errorMessageContainer = parentElement.querySelector(
    '.registration__error-message'
  );

  parentElement.classList.remove('registration__input-wrapper--invalid');
  input.classList.remove('registration__input--invalid');
  input.removeAttribute('aria-describedby');
  hideErrorMessage(errorMessageContainer);
}

function manageInputState(input, inputType, isValidInput) {
  isValidInput ? removeInvalidState(input) : addInvalidState(input, inputType);
}

// Handler function
function validateInputHandler(input) {
  const inputType = getInputType(input);
  const isValidInput = validateInput(inputType, input.value);
  manageInputState(input, inputType, isValidInput);
  return isValidInput;
}

registrationForm.addEventListener('submit', e => {
  e.preventDefault();

  const isValid = [];

  // Determine Input Validity and add their respective styles.
  registrationFormInputs.forEach(input => {
    isValid.push(validateInputHandler(input));
  });

  // Checks if all of the input fields are valid
  if (isValid.includes(false)) {
    return;
  }
  registrationForm.reset();
});

registrationFormInputs.forEach(input => {
  input.addEventListener('input', () => {
    validateInputHandler(input);
  });
});
