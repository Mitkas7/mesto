import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, sumbitForm) {
    super(popupSelector);
    this._submitForm = sumbitForm;
    this._form = this._popupSelector.querySelector('.popup__form');
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) =>{
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  setEventListeners() {
    this._form.addEventListener('submit', (evt) =>{
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
  close() {
    this._form.reset();
    super.close();
  }
}
