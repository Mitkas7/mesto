import { cardsArray, addBtn,
  editBtn, formAddCard, formEditProfile,
popupAdd, popupEdit, placeName, imageUrl,
nameInput, jobInput, profileName, profileJob} from './constants.js';
import { Card } from './card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import { initialCards } from './initialcards.js';
import { popupEditValidator, popupAddValidator} from './formValidator.js';
// Сгенерировать начальные карты
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
    }
}, '.places__cards');
cardList.render();
// создание попапа превью картинки
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();
// создание попапа формы рекдактирования
const editProfilePopup = new PopupWithForm('.popup_type_edit', (data) => {
  submitEditProfileForm(data);
});
editProfilePopup.setEventListeners();
// открытие попапа рекдактирвоания
editBtn.addEventListener('click', () => {
  editProfilePopup.open();
});


// создание попапа добавления карты
const addCardPopup = new PopupWithForm('.popup_type_add', (data) => {
  submitAddCardForm(data);
});
addCardPopup.setEventListeners();
// открытие попапа добавления карты
addBtn.addEventListener('click',() => {
  addCardPopup.open();
});

//запуск валидатора форм
popupEditValidator.enableValidation();
popupAddValidator.enableValidation();

// функция создания карты
function createCard(item) {
  const card = new Card(item, '.card-template');
  const createdCard = card.getView();
  return createdCard;
}
// Функция добавления карты в общий список
function addNewCard(cardItem) {
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
  closePopup(evt.target.closest('.popup_type_add'));
  formAddCard.reset();
}
// Функция сохранения новых данных профиля
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

// Обработчики событий
// для сохранения новых данных профиля
formEditProfile.addEventListener('submit', submitEditProfileForm);

// для добавления новой карточки на страницу
formAddCard.addEventListener('submit', saveNewCard);
