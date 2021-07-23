export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._escape = escape;
  }
  open() {
    this._popupSelector.classList.add('popup_status_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popupSelector.classList.remove('popup_status_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  setEventListeners(){
    this._popupSelector.querySelector('.popup__button-close')
    .addEventListener('click', this._close());
    this._popupSelector.addEventListener('mousedown', this._close());
  }
  _handleEscClose() {
    if (evt.key === 'Escape') {
      this._close();
    }
  }
}
