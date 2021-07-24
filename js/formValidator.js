import { popupAdd, popupEdit } from "./constants.js";
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_status_disabled',
  inputErrorClass: 'popup__input-error_status_active',
  errorClass: 'popup__input-error'
};
export class FormValidator {
  constructor(config, formSelector){
    this._config = config;
    this._formSelector = formSelector;
    this._inputsList = Array.from(this._formSelector.querySelectorAll(this._config.inputSelector));
    this._submutButton = this._formSelector.querySelector(this._config.submitButtonSelector);
  }
  _setEventListeners = () => {
   this._toggleButtonState();
   this._inputsList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidty(inputElement);
      this._toggleButtonState();
    });
   });
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submutButton.classList.add(this._config.inactiveButtonClass);
      this._submutButton.setAttribute('disabled', true);
    } else {
      this._submutButton.classList.remove(this._config.inactiveButtonClass);
      this._submutButton.removeAttribute('disabled');
    }
  }
  _hasInvalidInput() {
    return Array.from(this._inputsList).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _checkInputValidty(inputElement){
    if (!inputElement.validity.valid) {
      this._showError(inputElement);
    } else {
      this._hideError(inputElement);
    }
  }
  _showError(inputElement){
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  _hideError(inputElement){
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }
  _resetValidation() {
    this._inputsList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
    this._toggleButtonState();
  }
  enableValidation = () => {
    this._setEventListeners();
  }
  resetInputsErrors() {
    this._inputsList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  }
  resetForm() {
    this._inputsList.forEach((inputElement) => {
      this._checkInputValidty(inputElement);
      this._toggleButtonState();
    });
  }
  disableSubmitButton() {
    this._toggleButtonState();
  }
}
// Валидаторы
export const popupAddValidator = new FormValidator(config, popupAdd);
export const popupEditValidator = new FormValidator(config, popupEdit);
