let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.button_type_edit');
let saveBtn = popup.querySelector('.button_type_save');
let closeBtn = popup.querySelector('.popup__close-button');
// let addBtn = document.querySelector('.button_type_add');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__form-item_type_name');
let jobInput = formElement.querySelector('.popup__form-item_type_job');


// Открытие и закрытие попапа
function openPopup() {
  popup.classList.add('popup_status_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
function closePopup() {
  popup.classList.remove('popup_status_opened');
}
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

editBtn.addEventListener('click', () => {
  openPopup();
})
closeBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);


// Поставить лайк карточке
// можно не удалять а оставить закоментированным?)
// let likeBtn = document.querySelectorAll('.button_type_like');
// for (let i = 0; i < likeBtn.length; i++) {
//   likeBtn[i].addEventListener('click', like);
//   function like() {
//     likeBtn[i].classList.toggle('button_type_like-active');
//   }
// }


