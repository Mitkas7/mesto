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
    name: 'Ростов',
    link: 'https://images.unsplash.com/photo-1524214889128-d155b841834d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=684&q=80'
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
    name: 'Царицино',
    link: 'https://images.unsplash.com/photo-1560256443-d8d0e4598997?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80'
  },
 ];
let cardsArray = document.querySelector('.places__cards');
// let popup = document.querySelector('.popup');
let popupEdit = document.querySelector('.popup_type_edit');
let popupAdd = document.querySelector('.popup_type_add');
let editBtn = document.querySelector('.button_type_edit');
let saveBtn = document.querySelector('.button_type_save');
let closeBtn = document.querySelector('.popup__button-close');
let addBtn = document.querySelector('.profile__button-add');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__form-item_type_name');
let jobInput = formElement.querySelector('.popup__form-item_type_job');

let popupImage = document.querySelector('.popup_type_image');
let cardImage = document.querySelector('.popup__image');
let cardName = document.querySelector('.popup__title-image');
// Функция открытие попапов
function openPopup(popup) {
  console.log(popup, 'OPENED')
  popup.classList.add('popup_status_opened');
}
// Открытие попапа редактирования профиля
editBtn.addEventListener('click', (evt) => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})
// Функция закрытия попапов
 function closePopup(popup) {
   popup.classList.remove('popup_status_opened');
 }
// сохранение новых данных профиля
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}
formElement.addEventListener('submit', formSubmitHandler);

// closeBtn.addEventListener('click', (evt) => {
//   closePopup(popupEdit);
// });

closeBtn.addEventListener('click', (evt) => {
  console.log('clicked close btn');
  let eventTarget = evt.target.closest('.popup_status_opened');
  closePopup(eventTarget);
});

// открытие попапа добавления карточки
addBtn.addEventListener('click', (evt) => {
  openPopup(popupAdd);
})



function renderCard(array) {
    array.reverse().forEach(item => {
    cardsArray.prepend(createCard(item));
  })
}
renderCard(initialCards);

// Сгенерировать новую карту
function createCard(newCard) {
  let cardTemplate = document.querySelector('.card-template');
  let card = cardTemplate.content.cloneNode(true);
  let placeImage = card.querySelector('.place__image');
  placeImage.src = newCard.link;
  placeImage.alt = newCard.name;
  let nameCard = card.querySelector('.place__name');
  nameCard.textContent = newCard.name;
  console.log(placeImage.src);
  return card;

}
// Получить данные для разворачивания картинки
function viewImage(name, url) {
  cardImage.src = url;
  cardImage.alt = name;
  cardName.textContent = name;
}




// Поставить лайк или удалить или развернуть картинку
cardsArray.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('place__button-remove')) {
    let removeCard = evt.target.closest('.place');
    cardsArray.removeChild(removeCard);
  }
  else if (evt.target.classList.contains('button_type_like')) {
    evt.target.classList.toggle('button_type_like-active');
  }
  else if (evt.target.classList.contains('place__image')) {
    let cardImage = evt.target.getAttribute('src');
    let cardName = evt.target.closest('.place').querySelector('.place__name').textContent;
    viewImage(cardName, cardImage);
    openPopup(popupImage);
  }
});
