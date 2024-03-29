import { initialCards } from '../utils/constants.js';
export default class FormValidator {

  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  _showError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
  }

  _hideError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.textContent = '';
    input.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideError(input);
    } else {
      this._showError(input);
    }
  }

  _setEventListeners() {
    const inputList = this._form.querySelectorAll(this._config.inputSelector);
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.setSubmitButtonState(this._form.checkValidity());
      });
    });
  }
  setSubmitButtonState(isActive) {
    const button = this._form.querySelector(this._config.submitButtonSelector);
    if (isActive) {
      button.classList.remove(this._config.inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(this._config.inactiveButtonClass);
      button.disabled = true;
    }
  }

  resetValidation() {
    const inputList = this._form.querySelectorAll(this._config.inputSelector);
    inputList.forEach((input) => {
      this._hideError(input);
    });

  }

  enableValidation() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    this._setEventListeners();

  }












}

