import './styles/index.css';
import Card from '../src/scripts/Card';
import Section from '../src/scripts/Section.js';
import UserInfo from '../src/scripts/UserInfo.js';
import PopupWithForm from '../src/scripts/PopupWithForm.js';
import PopupWithImage from '../src/scripts/PopupWithImage.js';
import { initialCards } from '../src/scripts/initialcards.js';
import { popupEditValidator, popupAddValidator } from '../src/scripts/formValidator.js';
import { cardsArray, addBtn, editBtn, placeName, imageUrl, nameInput, jobInput, formAddCard } from '../src/scripts/constants.js';
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
// создание экземпляра класса пользовательской информации
const userInfo = new UserInfo('.profile__name', '.profile__job');
// создание попапа формы рекдактирования
const editProfilePopup = new PopupWithForm('.popup_type_edit', (data) => {
  submitEditProfileForm(data);
});
editProfilePopup.setEventListeners();
// открытие попапа рекдактирвоания
editBtn.addEventListener('click', () => {
  editProfilePopup.open();
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  popupEditValidator.resetForm();
});
// сохранение новых данных пользователя
function submitEditProfileForm(data) {
  userInfo.setUserInfo(data);
  editProfilePopup.close();
}
// создание попапа добавления карты
const addCardPopup = new PopupWithForm('.popup_type_add', (data) => {
  submitAddCardForm(data);
});
addCardPopup.setEventListeners();
// открытие попапа добавления карты
addBtn.addEventListener('click', () => {
  addCardPopup.open();
  placeName.value = '';
  imageUrl.value = '';
  formAddCard.reset();
  popupAddValidator.disableSubmitButton();
});
// сохранение данных форм добавленитя карты и доабвление ее непосредственно
function submitAddCardForm(data) {
  const newCard = {
    name: data.placeName,
    link: data.imageUrl,
    alt: data.placeName,
  }
  addNewCard(newCard);
  addCardPopup.close();
}
//запуск валидатора форм
popupEditValidator.enableValidation();
popupAddValidator.enableValidation();

// функция создания карты
function createCard(item) {
  const card = new Card(item, '.card-template', () => {
    popupImage.open(item.link, item.name);
  });
  const createdCard = card.getView();
  return createdCard;
}
// Функция добавления карты в общий список
function addNewCard(cardItem) {
  cardsArray.prepend(createCard(cardItem));
}
