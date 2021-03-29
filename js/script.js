'use strict'
let popup = document.querySelector('.popup');
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
// Открытие попапа редактирования профиля
function openPopup() {
  popup.classList.add('popup_status_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
// Закрытие попапоа редактирования профиля
function closePopup() {
  popup.classList.remove('popup_status_opened');

}
// сохранение новых данных профиля
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}
editBtn.addEventListener('click', () => {
  openPopup();
})
// closeBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
// открытие и закрытие попапа добавления карточки
function openPopupAdd() {
  popupAdd.classList.add('popup_status_opened');
}
function closePopupAdd() {
  popupAdd.classList.remove('popup_status_opened');
}

addBtn.addEventListener('click', () => {
  openPopupAdd();
})
// Удалить карточку
let placeCard = document.querySelectorAll('.place');
let delBtn = document.querySelectorAll('.place__button-remove');
for (let i = 0; i < delBtn.length; i++) {
  delBtn[i].addEventListener('click', remove);
  function remove() {
    placeCard[i].remove();
  }
  for (let i = 0; i < placeCard.length; i++) {
    function remove() {
      placeCard[i].remove();
    }
}
}

// Поставить лайк карточке
let likeBtn = document.querySelectorAll('.button_type_like');
for (let i = 0; i < likeBtn.length; i++) {
  likeBtn[i].addEventListener('click', like);
  function like() {
    likeBtn[i].classList.toggle('button_type_like-active');
  }
}



