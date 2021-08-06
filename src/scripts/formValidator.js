export class FormValidator {
  constructor(config, formSelector) {
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
  _checkInputValidty(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement);
    } else {
      this._hideError(inputElement);
    }
  }
  _showError(inputElement) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  _hideError(inputElement) {
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
  _resetInputsErrors() {
    this._inputsList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  }
  resetForm() {
    this._inputsList.forEach((inputElement) => {
      this._checkInputValidty(inputElement);
      this._resetInputsErrors();
      this._toggleButtonState();
    });
  }
  disableSubmitButton() {
    this._toggleButtonState();
  }
}
// export class FormValidator {
//   constructor(config, formSelector) {
//     this._config = config;
//     this._formSelector = this._config.formSelector;
//     this._inputSelector = this._config.inputSelector;
//     this._submitButton = this._config.submitButtonSelector;
//     this._errorClass = this._config.errorClass;
//     this._inactiveButton = this._config.inactiveButtonClass;
//     this._inputError = this._config.inputErrorClass;
//     this._inputsList = Array.from(formSelector.querySelectorAll(this._inputSelector));
//     this._errorsArray = Array.from(formSelector.querySelectorAll(this._inputSelector));
//     this._currentForm = formSelector;
//   }
//   _setEventListeners() {
//     // this._toggleButtonState();
//     this._inputsList.forEach((inputElement) => {
//       inputElement.addEventListener('input', () => {
//         this._checkInputValidty(inputElement);
//         // this._toggleButtonState();
//       });
//     });
//   }
//   _toggleButtonState() {
//     if (this._hasInvalidInput()) {
//       this._submutButton.classList.add('popup__button-submit_status_disabled');
//       this._submutButton.setAttribute('disabled', true);
//     } else {
//       this._submutButton.classList.remove('popup__button-submit_status_disabled');
//       this._submutButton.removeAttribute('disabled');
//     }
//   }
//   _hasInvalidInput() {
//     return Array.from(this._inputsList).some((inputElement) => {
//       return !inputElement.validity.valid;
//     });
//   }
//   _checkInputValidty(inputElement) {
//     if (!inputElement.validity.valid) {
//       this._showError(inputElement);
//     } else {
//       this._hideError(inputElement);
//     }
//   }
//   _showError(inputElement) {
//     const errorElement = this._currentForm.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(this._config.inputErrorClass);
//     errorElement.classList.add(this._config.errorClass);
//     errorElement.textContent = inputElement.validationMessage;
//   }
//   _hideError(inputElement) {
//     const errorElement = this._currentForm.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(this._config.inputErrorClass);
//     errorElement.classList.remove(this._config.errorClass);
//     errorElement.textContent = '';
//   }
//   _resetValidation() {
//     this._inputsList.forEach((inputElement) => {
//       this._hideError(inputElement);
//     });
//     // this._toggleButtonState();
//   }
//   enableValidation = () => {
//     this._setEventListeners();
//   }
//   resetInputsErrors() {
//     this._inputsList.forEach((inputElement) => {
//       this._hideError(inputElement);
//     });
//   }
//   resetForm() {
//     this._submitButton.classList.add('popup__button-submit_status_disabled');
//     this._submitButton.setAttribute('disabled', true);
//     this._inputList.forEach((inputElement) => {
//       inputElement.classList.remove(this._inputError);
//     });
//     this._errorsArray.forEach(function (errorElement) {
//       errorElement.textContent = "";
//     });
//   }
// }
