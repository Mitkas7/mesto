import { cardsArray, addBtn,
  editBtn, formAddCard, formEditProfile,
popupAdd, popupEdit, placeName, imageUrl,
nameInput, jobInput, profileName, profileJob} from './constants.js';
import { Card } from './card.js';
import { initialCards } from './initialcards.js';
import { openPopup, closePopup } from './utils/utils.js';
import { popupEditValidator, popupAddValidator} from './formValidator.js';
// Сгенерировать начальные карты
initialCards.forEach((data) => {
  const cardElement = createCard(data);
  cardsArray.prepend(cardElement);
});
//запуск валидатора
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
// для открытия попапа добавления карточки
addBtn.addEventListener('click', () => {
  openPopup(popupAdd);
  formAddCard.reset();
  popupAddValidator.resetForm();
  popupAddValidator.resetInputsErrors();
});
// для открытия попапа редактирования профиля
editBtn.addEventListener('click', () => {
  openPopup(popupEdit);
  popupEditValidator.resetInputsErrors();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
})
// для добавления новой карточки на страницу
formAddCard.addEventListener('submit', saveNewCard);
