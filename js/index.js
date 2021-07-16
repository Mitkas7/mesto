import { Card } from './card.js';
import { initialCards } from './initialcards.js';
import { config, FormValidator } from './formValidator.js';
const cardsArray = document.querySelector('.places__cards');
// Попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
// Кнопки
const editBtn = document.querySelector('.button_type_edit');
const saveBtn = document.querySelector('.button_type_save');
const addBtn = document.querySelector('.profile__button-add');
// инпуты
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const form = document.querySelector('.popup__form');
const nameInput = form.querySelector('.popup__form-input_type_name');
const jobInput = form.querySelector('.popup__form-input_type_job');
const formAdd = document.querySelector('.popup__form_type_add');
const placeName = formAdd.querySelector('.popup__form-input_type_place-name'); // - название места инпут
const imageUrl = formAdd.querySelector('.popup__form-input_type_image-url'); //- ссылка на фото для инпута
// Общая функция открытия попапов
export function openPopup(popup) {
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
});
// Функция сохранения новых данных профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
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

// для открытия попапа добавления карточки
addBtn.addEventListener('click', () => {
  openPopup(popupAdd);
});
// для добавления новой карточки на страницу
formAdd.addEventListener('submit', saveNewCard);
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
// Функция добавления карты в общий список
function addNewCard(cardItem) {
  cardsArray.prepend(createCard(cardItem));
}
// функция создания карты
function createCard(item) {
  const card = new Card(item, '.list-item-template');
  const cardList = card.getView();
  return cardList;
}
// Сгенерировать начальные карты
initialCards.forEach((data) => {
  const card = new Card(data);
  const cardElement = card.getView();
  cardsArray.prepend(cardElement);
});

const popupEditValidator = new FormValidator(config, popupEdit);
popupEditValidator.enableValidation();
const popuupAddValidator = new FormValidator(config, popupAdd);
popuupAddValidator.enableValidation();

