import Popup from "./Popup.js";
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._form = this._popupSelector.querySelector('.popup__form');
    this._handleSubmit = handleSubmit;
  };
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this.card);
      this.close();
    });
  };
  close() {
    super.close();
  };
  open(card) {
    super.open();
    this.card = card;
  };
}
