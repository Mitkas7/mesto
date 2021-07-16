import {
  formEditProfile, formAdd,
  addBtn, editBtn, saveBtn,
 popupAdd, popupEdit,
nameInput, jobInput, placeName, imageUrl, profileName, profileJob} from '.././constants.js'
// Общая функция открытия попапов
export function openPopup(popup) {
  popup.classList.add('popup_status_opened');
  setListener(popup);
}
// Функция добавления слушателя событий закрытия по esc
export function setListener() {
  document.addEventListener('keydown', closeByEscape);
}
// Функция закрытия попапа по кнопке esc
export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_status_opened');
    closePopup(openedPopup);
  }
}
// Функция удаления обработчиков событий с попапов
export function removeCloseListener() {
  document.removeEventListener('keydown', closeByEscape);
}
// Общая функция закрытия попапов
export function closePopup(popup) {
  popup.classList.remove('popup_status_opened');
  removeCloseListener(popup);
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
// функция создания карты
export function createCard(item) {
  const card = new Card(item, '.list-item-template');
  const cardList = card.getView();
  return cardList;
}
// Функция добавления карты в общий список
export function addNewCard(cardItem) {
  cardsArray.prepend(createCard(cardItem));
}
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
// Функция сохранения новых данных профиля
export function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}
// Обработчики событий
// для сохранения новых данных профиля
formEditProfile.addEventListener('submit', submitEditProfileForm);
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
