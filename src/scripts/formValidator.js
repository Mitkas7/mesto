export class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputsList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._submutButton = this._form.querySelector(this._config.submitButtonSelector);
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
  _checkInputValidty(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement);
    } else {
      this._hideError(inputElement);
    }
  }
  _showError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  _hideError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }
  resetValidation() {
    this._inputsList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
    this._toggleButtonState();
  }
  enableValidation = () => {
    this._setEventListeners();
  }
}
