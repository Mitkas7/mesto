import {openPopup} from './index.js'
const popupImage = document.querySelector('.popup_type_image');
const popupPic = document.querySelector('.popup__image');
const popupName = document.querySelector('.popup__place-caption');
const cardTemplate = document.querySelector('.card-template').content;
export class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }
  getView() {
    this._element = cardTemplate.querySelector('.place').cloneNode(true);
    const cardImage = this._element.querySelector('.place__image');
    const cardName = this._element.querySelector('.place__name');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardName.textContent = this._name;
    this.cardImage = cardImage;
    this.cardName = cardName;
    this._setEventListeners();
    return this._element;
  }
  _setEventListeners() {
    this._element.querySelector('.place__button-remove').addEventListener('click', () => this._removeCard());
    this._element.querySelector('.place__button-like').addEventListener('click', () => this._likeCard());
    this._element.querySelector('.place__image').addEventListener('click', () => this._openCardPreview());
  }
  _removeCard() {
    this._element.remove();
  }
  _likeCard() {
    this._element.querySelector('.place__button-like').classList.toggle('button_type_like-active');
  }
  _openCardPreview() {
    openPopup(popupImage);
    popupPic.src = this.cardImage.src;
    popupPic.alt = this.cardName.textContent;
    popupName.textContent = this.cardName.textContent;
  }
}
