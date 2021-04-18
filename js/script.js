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
const closeBtnsArray = document.querySelectorAll('.popup__button-close');
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
closeBtnsArray.forEach((closeBtn) => {
  closeBtn.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup_status_opened');
    closePopup(popup);
  });
});
// Функция закрытия попапов по клику на оверлей
function alternateClosing(evt) {
  const openedPopup = document.querySelector('.popup_status_opened');
  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  }
}
// Функция инициализации карточки
function createCard(cardData) {
  const cardItem = cardTemplate.querySelector('.place').cloneNode(true);
  const cardImage = cardItem.querySelector('.place__image');
  const cardName = cardItem.querySelector('.place__name');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardName.textContent = cardData.name;
  // Удалить карту
  const removeBtn = cardItem.querySelector('.place__button-remove');
  removeBtn.addEventListener('click', () => cardItem.remove())
  // Поставить лайк
  const likeBtn = cardItem.querySelector('.place__button-like');
  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('button_type_like-active');
  })
  // Посмотреть фото
  cardImage.addEventListener('click', () => {
    openPopup(popupImage);
    popupPic.src = cardImage.src;
    popupPic.alt = cardName.textContent;
    popupName.textContent = cardName.textContent;
  })
  return cardItem;
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
// для открытия попапа добавления карточки
addBtn.addEventListener('click', () => {
  openPopup(popupAdd);
});
// для добавления новой карточки на страницу
formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault(evt);
  const placeName = formAdd.querySelector('.popup__form-input_type_place-name');
  const imageUrl = formAdd.querySelector('.popup__form-input_type_image-url');
  const card = createCard({ name: placeName.value, link: imageUrl.value });
  addNewCard(card);
  closePopup(evt.target.closest('.popup'));
  formAdd.reset();
});
// Сгенерировать начальные карты
initialCards.reverse().forEach((item) => {
  addNewCard(createCard(item));
});
