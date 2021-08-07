export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popup.classList.add('popup_status_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove('popup_status_opened');
    document.removeEventListener('click', this._handleEscClose);
  }
  setEventListeners() {
    this._popup.querySelector('.popup__button-close').addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  _handleOverlayClose(evt) {
    const openedPopup = document.querySelector('.popup_status_opened');
    if (evt.target === openedPopup) {
      this.close();
    }
  }
}
