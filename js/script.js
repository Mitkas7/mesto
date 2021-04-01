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
let cardsArray = document.querySelector('.places__cards');
// попапы
let popupEdit = document.querySelector('.popup_type_edit');
let popupAdd = document.querySelector('.popup_type_add');
let popupImage = document.querySelector('.popup_type_image');
// кнопки
let editBtn = document.querySelector('.button_type_edit');
let saveBtn = document.querySelector('.button_type_save');
let addBtn = document.querySelector('.profile__button-add');
// поля форм
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__form-item_type_name');
let jobInput = formElement.querySelector('.popup__form-item_type_job');
let formAdd = document.querySelector('.popup__form_type_add');
let cardImage = document.querySelector('.popup__image');
let cardName = document.querySelector('.popup__place-caption');
// Сгенерировать новую карту
function createCard(newCard) {
  let cardTemplate = document.querySelector('.card-template');
  let card = cardTemplate.content.cloneNode(true);
  let placeImage = card.querySelector('.place__image');
  placeImage.src = newCard.link;
  placeImage.alt = newCard.name;
  let nameCard = card.querySelector('.place__name');
  nameCard.textContent = newCard.name;
  return card;
}
// Рендеринг начальных 6-и карт
function renderingCards(array) {
  array.reverse().forEach(item => {
    cardsArray.prepend(createCard(item));
  })
}
renderingCards(initialCards);
// Поставить лайк или удалить или открыть картинку
cardsArray.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('place__button-remove')) {
    let removeCard = evt.target.closest('.place');
    cardsArray.removeChild(removeCard);
  }
  else if (evt.target.classList.contains('button_type_like')) {
    evt.target.classList.toggle('button_type_like-active');
  }
  else if (evt.target.classList.contains('place__image')) {
    let imageUrl = evt.target.getAttribute('src');
    let placeName = evt.target.closest('.place').querySelector('.place__name').textContent;
    // console.log(evt.target);
    // console.log(cardImage);
    viewImage(imageUrl, placeName);
    document.querySelector('.popup_type_image').style.backgroundColor = "rgba(0,0,0,.9)";
    animate(popupImage);
    openPopup(popupImage);
  }
});
// Получить данные для разворачивания картинки
function viewImage(url, name) {
  cardImage.src = url;
  cardName.textContent = name;
  // console.log(cardName);
}
// Общая функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_status_opened');
}
// Анимация открытия попапов
function animate(popup) {
  popup.classList.add('animation-transition');
}


// Общая функция закрытия попапов
let closeBtnsArray = document.querySelectorAll('.popup__button-close');
function closePopups(evt) {
  if (evt.target.closest('.popup').classList.contains('popup_status_opened')) {
    evt.target.closest('.popup').classList.toggle('popup_status_opened');
  }
};
closeBtnsArray.forEach(function (elem) {
  elem.addEventListener('click', closePopups);
})
// Открытие попапа редактирования профиля
editBtn.addEventListener('click', (evt) => {
  animate(popupEdit);
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})
// Сохранение новых данных профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopups(evt);
}
formElement.addEventListener('submit', formSubmitHandler);
// открытие попапа добавления карточки
addBtn.addEventListener('click', (evt) => {
  animate(popupAdd);
  openPopup(popupAdd);
});
// Добававление новой карточки
formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  let placeName = formAdd.querySelector('.popup__form-item_type_place-name');
  let imageUrl = formAdd.querySelector('.popup__form-item_type_image-url');
  cardsRendering([{ name: placeName.value , link: imageUrl.value }]);
  closePopups(evt);
  formAdd.reset();
});

