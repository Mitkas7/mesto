import {
  setListener, closeByEscape, removeCloseListener,
  closePopup, openPopup, createCard,
  addNewCard, submitEditProfileForm,} from './utils/utils.js';

import { formEditProfile, formAdd, popupEdit, popupAdd} from './constants.js';
import { Card } from './card.js';
import { initialCards } from './initialcards.js';
import { config, FormValidator } from './formValidator.js';
const cardsArray = document.querySelector('.places__cards');
// Сгенерировать начальные карты
initialCards.forEach((data) => {
  const card = new Card(data);
  const cardElement = card.getView();
  cardsArray.prepend(cardElement);
});
//запуск валидатора
const popupEditValidator = new FormValidator(config, popupEdit);
popupEditValidator.enableValidation();
const popuupAddValidator = new FormValidator(config, popupAdd);
popuupAddValidator.enableValidation();

