import Popup from "./Popup.js";
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupSelector.querySelector('.popup__form');
    this._handleSubmit = null;
  };
  submitConfirmation(handler) {
    this._handleSubmit = handler;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
      this.close();
    });
  };
  open(card) {
    super.open();
    this.card = card;
  };
  close() {
    super.close();
  };

}
