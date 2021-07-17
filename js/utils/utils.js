// Общая функция открытия попапов
export function openPopup(popup) {
  popup.classList.add('popup_status_opened');
  setListener(popup);
}
// Общая функция закрытия попапов
export function closePopup(popup) {
  popup.classList.remove('popup_status_opened');
  removeCloseListener(popup);
}
// Функция добавления слушателя событий закрытия по esc
function setListener() {
  document.addEventListener('keydown', closeByEscape);
}
// Функция закрытия попапа по кнопке esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_status_opened');
    closePopup(openedPopup);
  }
}
// Функция удаления обработчиков событий с попапов
function removeCloseListener() {
  document.removeEventListener('keydown', closeByEscape);
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
