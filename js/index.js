import { cardsArray } from './constants.js';
import { Card } from './card.js';
import { initialCards } from './initialcards.js';
import { popupEditValidator, popupAddValidator} from './formValidator.js';
import { createCard } from './utils/utils.js';
// Сгенерировать начальные карты
initialCards.forEach((data) => {
  const cardElement = createCard(data);
  cardsArray.prepend(cardElement);
});
//запуск валидатора
popupEditValidator.enableValidation();
popupAddValidator.enableValidation();
