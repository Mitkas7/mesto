
import { initialCards } from "./initialcards.js";
const cardsArray = document.querySelector('.places__cards');
// Попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
// Кнопки
const editBtn = document.querySelector('.button_type_edit');
const saveBtn = document.querySelector('.button_type_save');
const addBtn = document.querySelector('.profile__button-add');
// Поля форм
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const form = document.querySelector('.popup__form');
const nameInput = form.querySelector('.popup__form-input_type_name');
const jobInput = form.querySelector('.popup__form-input_type_job');
const formAdd = document.querySelector('.popup__form_type_add');
const popupPic = document.querySelector('.popup__image');
const popupName = document.querySelector('.popup__place-caption');
const cardTemplate = document.querySelector('.card-template').content;
// const closeBtnsArray = document.querySelectorAll('.popup__button-close');
const placeName = formAdd.querySelector('.popup__form-input_type_place-name'); // - название места инпут
const imageUrl = formAdd.querySelector('.popup__form-input_type_image-url'); //- ссылка на фото для инпута
// Общая функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_status_opened');
  setListener(popup);
}
// Функция закрытия попапа по кнопке esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_status_opened');
    closePopup(openedPopup);
  }
}
// Функция добавления слушателя событий закрытия по esc
function setListener() {
  document.addEventListener('keydown', closeByEscape);
}
// Функция удаления обработчиков событий с попапов
function delListener() {
  document.removeEventListener('keydown', closeByEscape);
}
// Общая функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_status_opened');
  delListener(popup);
}
// закрытие попапов по кнопке закрытия
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_status_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup);
    }
  })
})
// Функция создания карточки
class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }
  _getView() {
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
// Функция сохранения новых данных профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}
// Функция добавления карты
function addNewCard(cardItem) {
  cardsArray.prepend(cardItem);
}
// Обработчики событий
// для сохранения новых данных профиля
form.addEventListener('submit', formSubmitHandler);
// для открытия попапа редактирования профиля
editBtn.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})
// функция добавления новой карты на страницу
function saveNewCard(evt) {
  evt.preventDefault(evt);
  const newCard = {
    name: placeName.value,
    link: imageUrl.value,
    alt: placeName.value,
  }
  addNewCard(newCard);
  closePopup(evt.target.closest('.popup'));
  formAdd.reset();
}

// для открытия попапа добавления карточки
addBtn.addEventListener('click', () => {
  openPopup(popupAdd);
});
// для добавления новой карточки на страницу
formAdd.addEventListener('submit', saveNewCard);
// Сгенерировать начальные карты
initialCards.forEach((data) => {
  const card = new Card(data);
  const cardElement = card._getView();
  cardsArray.prepend(cardElement);
});
