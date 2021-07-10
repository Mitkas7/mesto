// Функция создания карточки
export class Card {
  constructor(cardData) {
    this.name = cardData.name;
    this.link = cardData.link;
  }
  getView() {
    this.element = cardTemplate.querySelector('.place').cloneNode(true);
    const cardImage = this.element.querySelector('.place__image');
    const cardName = this.element.querySelector('.place__name');
    cardImage.src = this.link;
    cardImage.alt = this.name;
    cardName.textContent = this.name;
    this.cardImage = cardImage;
    this.cardName = cardName;
    this.setEventListeners();
    return this.element;
  }
  setEventListeners() {
    this.element.querySelector('.place__button-remove').addEventListener('click', () => this.removeCard());
    this.element.querySelector('.place__button-like').addEventListener('click', () => this.likeCard());
    this.element.querySelector('.place__image').addEventListener('click', () => this.openCardPreview());
  }
  removeCard() {
    this.element.remove();
  }
  likeCard() {
    this.element.querySelector('.place__button-like').classList.toggle('button_type_like-active');
  }
  openCardPreview() {
    openPopup(popupImage);
    popupPic.src = this.cardImage.src;
    popupPic.alt = this.cardName.textContent;
    popupName.textContent = this.cardName.textContent;
  }

}
