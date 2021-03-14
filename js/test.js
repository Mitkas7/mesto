const popup = document.querySelector('.popup');
const closeBtn = popup.querySelector('.popup__close-button');
const editBtn = document.querySelector('.button_type_edit');
const saveBtn = popup.querySelector('.popup__form-button');
const likeBtns = Array.from(document.querySelectorAll('.button_type_like'));
const addBtn = document.querySelector('.button_type_add');
// Открытие и закрытие попапа
function openPopup() {
  popup.classList.add('popup_status_opened');
}
function closePopup() {
  popup.classList.remove('popup_status_opened');
}
// Cохранение новых данных профиля
// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.name-input');
let jobInput = formElement.querySelector('.job-input');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  let nameValue = nameInput.getAttribute('value');
  let jobValue = jobInput.getAttribute('value');
  // Выберите элементы, куда должны быть вставлены значения полей
  let profileName = document.querySelector('.profile__name');
  let profilejob = document.querySelector('.profile__description');
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profilejob.textContent = jobInput.value;
  closePopup();

}

// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler,);




// let profileName = document.querySelector('.profile__name');
// let profileDescr = document.querySelector('.profile__description');
// let formPopup = document.querySelector('.popup__form');
// let nameInput = formPopup.querySelector('input[name="name"]');
// let descrInput = formPopup.querySelector('input[name="description"]');
// let nameValue = nameInput.getAttribute('value');
// let descrValue = descrInput.getAttribute('value');

// console.log(profileName, profileDescr);


// profileName.textContent = nameValue.value;
// profileDescr.textContent = descrValue.value;

// saveBtn.onclick = function newvalues() {
//   profileName.textContent = nameValue.value;
//   profileDescr.textContent = descrValue.value;
// }


// редактирвоание профиля через форму в попапе








// function saveNewValues(evt) {
//   evt.preventDefault();
//   //получить содержимое полей формы попапа


//   //выбрать заменяемые новыми данными элементы
//   profileName = document.querySelector('.profile__name');
//   profileDescr = document.querySelector('.profile__description');
//   // заменить содержимое элементов данными из формы
//   profileName.textContent = nameValue
//   profileDescr.textContent = descrValue;
//   saveButton.addEventListener('submit', formSubmitHandler);

// }
// formSubmitHandler();

// console.log(closeButton);
// console.log(editButton);

editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
