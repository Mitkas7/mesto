import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, sumbitForm) {
    super(popupSelector);
    this._submitForm = sumbitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__button-submit');
    this._inputsList = this._form.querySelectorAll('.popup__form-input');
    this._currentButtonText = this._submitButton.textContent;
  }
  _getInputValues() {
    this._inputValues = {};
    this._inputsList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }
  close() {
    this._form.reset();
    super.close();
  }
  changeButtonText(isLoading, loadingText = 'Cохранение...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._currentButtonText;
    }
  }
}



