'use strict'
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://images.unsplash.com/photo-1609788802533-66a4249ca2b9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80'
  },
  {
    name: 'Маяк Эргешельд',
    link: 'https://images.unsplash.com/photo-1610897592260-e61cdb60f6a9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1335&q=80'
  },
  {
    name: 'Алтайский край',
    link: 'https://images.unsplash.com/photo-1494791286225-ea86fc957ba7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1047&q=80'
  },
  {
    name: 'Эстосадок',
    link: 'https://images.unsplash.com/photo-1610043169421-bec04b55ab46?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80'
  },
  {
    name: 'Парк Рускеала',
    link: 'https://images.unsplash.com/photo-1548288242-d454d4648b55?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80'
  },
  {
    name: 'Приморский край',
    link: 'https://images.unsplash.com/photo-1531916978893-6cdfd5df4e91?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80'
  },
 ];
const cardsArray = document.querySelector('.places__cards');
// Попапы
let popupEdit = document.querySelector('.popup_type_edit');
let popupAdd = document.querySelector('.popup_type_add');
let popupImage = document.querySelector('.popup_type_image');
// Кнопки
let editBtn = document.querySelector('.button_type_edit');
let saveBtn = document.querySelector('.button_type_save');
let addBtn = document.querySelector('.profile__button-add');
// Поля форм
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__form-item_type_name');
let jobInput = formElement.querySelector('.popup__form-item_type_job');
let formAdd = document.querySelector('.popup__form_type_add');
let cardImage = document.querySelector('.popup__image');
let cardName = document.querySelector('.popup__place-caption');
const cardTemplate = document.querySelector(".card-template").content;
// Инициализировать карточку
function createCard(cardData) {
  const cardItem = cardTemplate.querySelector(".place").cloneNode(true);
  cardItem.querySelector(".place__image").src = cardData.link;
  cardItem.querySelector(".place__image").alt = cardData.name;
  cardItem.querySelector(".place__name").textContent = cardData.name;
  // Удалить карту
  const removeBtn = cardItem.querySelector(".place__button-remove");
  removeBtn.addEventListener("click", () => cardItem.remove())
  // Поставить лайк
  const likeBtn = cardItem.querySelector(".place__button-like");
    likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("button_type_like-active");
  })
  // Посмотреть фото
  cardItem.querySelector(".place__image").addEventListener("click", () => {
    openPopup(popupImage);
    cardImage.src = cardItem.querySelector(".place__image").src;
    cardName.textContent = cardItem.querySelector(".place__name").textContent;
  })
  return cardItem;
}
// Сгенерировать начальные карты
initialCards.reverse().forEach((item) => {
  addNewCard(createCard(item));
});
// Общая функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_status_opened');
}
// Общая функция закрытия попапов
const closeBtnsArray = document.querySelectorAll('.popup__button-close');
function closePopup(popup) {
  popup.classList.remove('popup_status_opened');
}
closeBtnsArray.forEach((closeBtn) => {
  closeBtn.addEventListener('click', (event) => {
    const popup = event.target.parentNode.parentNode;
    closePopup(popup);
  });
});
// Открытие попапа редактирования профиля
editBtn.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})
// Сохранение новых данных профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}
formElement.addEventListener('submit', formSubmitHandler);
// открытие попапа добавления карточки
addBtn.addEventListener('click', () => {
  openPopup(popupAdd);
});
// Добавление новой карточки в общий список
formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault(evt);
  let placeName = formAdd.querySelector('.popup__form-item_type_place-name');
  let imageUrl = formAdd.querySelector('.popup__form-item_type_image-url');
  const card = createCard({ name: placeName.value, link: imageUrl.value });
  addNewCard(card);
  closePopup(evt.target.closest('.popup'));
  formAdd.reset();
});
function addNewCard(cardItem) {
  cardsArray.prepend(cardItem);
}
