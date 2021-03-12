let closeButton = document.querySelector('.popup__close-button');
let editButton = document.querySelector('.button_type_edit');
let popup = document.querySelector('.popup');
editButton.addEventListener('click', function (event) {
  popup.classList.add('popup_status_opened');
});
closeButton.addEventListener('click', function (event) {
  popup.classList.remove('popup_status_opened');
});

