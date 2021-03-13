// Открытие и закрытие попапа
let closeButton = document.querySelector('.popup__close-button');
let editButton = document.querySelector('.button_type_edit');
let popup = document.querySelector('.popup');
editButton.addEventListener('click', function (event) {
  popup.classList.add('popup_status_opened');
});
closeButton.addEventListener('click', function (event) {
  popup.classList.remove('popup_status_opened');
});
// передача данных в попап
let formProfile = document.querySelector('.popup__form');
let nameInput = formProfile.querySelector('input[name="name"]');
let descrInput = formProfile.querySelector('input[name="description"]');


function formSubmitHadler() {

  nameValue = nameInput.getAttribute('value');
  descrValue = descrInput.getAttribute('value');
  profileName = document.querySelector('.profile__name');
  profileDescr = document.querySelector('.profile__description');



}
formSubmitHadler();
console.log(nameValue);
console.log(descrValue);
console.log(profileName);
console.log(profileDescr);
