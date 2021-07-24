export default class Popup {
  constructor(popupSelector, handleCardClick) {
    this._popupSelector = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
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
    this._popupSelector.querySelector('.popup__button-close').addEventListener('click', this.close());
    this._popupSelector.addEventListener('mousedown', this._handleOverlayClose.bind(this));

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
