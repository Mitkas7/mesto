import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupSelector.querySelector('.popup__image');
    this._popupCaption = this._popupSelector.querySelector('.popup__caption');
  }
  open() {
    super.open();
    this._popupImage.src = link;
    this._cardImage.alt = caption;
    this._popupCaption.textContent = caption;
  }
}
