import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, sumbitForm) {
    super(popupSelector);
    this._submitForm = sumbitForm;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._submitButton = this._popupSelector.querySelector('.popup__button-submit');
  }
  _getInputValues() {
    this._inputsList = this._form.querySelectorAll('.popup__form-input');
    this._inputValues = {};
    this._inputsList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const data = this._getInputValues();
      this._submitForm(data);
    });
  }
  close() {
    this._form.reset();
    super.close();
  }
  changeButtonText(text) {
    this._submitButton.textContent = text;
  }
}


