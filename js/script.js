const popup = document.querySelector('.popup');
const closeBtn = popup.querySelector('.popup__close-button');
const editBtn = document.querySelector('.button_type_edit');
const saveBtn = popup.querySelector('.popup__form-button');
let likeBtn = document.querySelector('.button_type_like');
const addBtn = document.querySelector('.button_type_add');
// Открытие и закрытие попапа
function openPopup() {
  popup.classList.add('popup_status_opened');
}
function closePopup() {
  popup.classList.remove('popup_status_opened');
}
// Cохранение новых данных профиля
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.name-input');
let descrInput = formElement.querySelector('.job-input');

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  let profileName = document.querySelector('.profile__name');
  let profileDescr = document.querySelector('.profile__description');
  profileName.textContent = nameInput.value;
  profileDescr.textContent = descrInput.value;
  closePopup();
}
editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler, );
likeBtn.addEventListener('click', like);
// Поставить лайк карточке
function like() {
    likeBtn.classList.toggle('button_type_like-active');
  }




