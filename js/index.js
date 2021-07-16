import { cardsArray } from './constants.js';
import { Card } from './card.js';
import { initialCards } from './initialcards.js';
import { popupEditValidator, popupAddValidator} from './formValidator.js';
// Сгенерировать начальные карты
initialCards.forEach((data) => {
  const card = new Card(data);
  const cardElement = card.getView();
  cardsArray.prepend(cardElement);
});
//запуск валидатора
popupEditValidator.enableValidation();
popupAddValidator.enableValidation();
