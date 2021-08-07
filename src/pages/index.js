import '../pages/index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import { FormValidator } from '../components/FormValidator.js';
import {
  cardsArray, userName, userAbout, userAvatar,
  editProfileBtn, addCardBtn, editAvatarBtn,
  formEditProfile, formAddCard, formEditAvatar, config,
  popupAddCardSelector, popupEditProfileSelector, popupEditAvatarSelector, popupImagePreviewSelector, popupConfirmSelector
} from '../utils/constants.js';
let userId = null;
const api = new Api('https://nomoreparties.co/v1/cohort-26/', '2ceacd5c-fca2-4318-a334-9732db7cb6fc');
const userInfo = new UserInfo(userName, userAbout, userAvatar);
const cardsContainer = new Section({
  renderer: (item) => {
    cardsContainer.addItem(createCard(item));
  }
}, cardsArray);
const popupImagePreview = new PopupWithImage(popupImagePreviewSelector);
const popupConfirmation = new PopupWithConfirm(popupConfirmSelector);
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, (formData) => {
  popupEditProfile.changeButtonText(true);
  const profileInfo = {
    name: formData.name,
    about: formData.about
  }
  api.editUserInfo(profileInfo)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      popupEditProfile.close();
    })
    .catch((error) => {
      console.log('Ошибка, профиль не изменился');
    })
    .finally(() => {
      popupEditProfile.changeButtonText(false);
    })
});
const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, (updateAvatar) => {
  popupEditAvatar.changeButtonText(true);
  api.editUserAvatar(updateAvatar)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      popupEditAvatar.close();
    })
    .catch((error) => {
      console.log('Ошибка, аватар не поменялся');
    })
    .finally(() => {
      popupEditAvatar.changeButtonText(false);
    })
});
const addCardPopup = new PopupWithForm(popupAddCardSelector, (formData) => {
  addCardPopup.changeButtonText(true);
  const newCard = {
    name: formData.placeName,
    link: formData.imageUrl
  }
  api.addNewCard(newCard)
    .then((cardData) => {
      cardsContainer.addItem(createCard(cardData));
      addCardPopup.close();
    })
    .catch((error) => {
      console.log('Ошибка, карточка не добавлена');
    })
    .finally(() => {
      addCardPopup.changeButtonText(false);
    })
});
//
const popupEditProfileValidator = new FormValidator(config, formEditProfile);
const popupEditAvatarValidator = new FormValidator(config, formEditAvatar);
const popupAddCardValidator = new FormValidator(config, formAddCard);
popupEditProfileValidator.enableValidation();
popupAddCardValidator.enableValidation();
popupEditAvatarValidator.enableValidation();
popupImagePreview.setEventListeners();
popupConfirmation.setEventListeners();
addCardPopup.setEventListeners();
popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();
//
addCardBtn.addEventListener('click', () => {
  addCardPopup.open();
  popupAddCardValidator.resetValidation();
});
editProfileBtn.addEventListener('click', () => {
  popupEditProfileValidator.resetValidation();
  const currentUserInfo = userInfo.getUserInfo();
  formEditProfile.name.value = currentUserInfo.userName;
  formEditProfile.about.value = currentUserInfo.userAbout;
  popupEditProfile.open();
});
editAvatarBtn.addEventListener('click', () => {
  popupEditAvatarValidator.resetValidation();
  popupEditAvatar.open();
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    userId = userData._id;
    cardsContainer.render(cardData.reverse());
  })
  .catch((error) => {
    console.log(error);
  });
// Создание карты
function createCard(cardData) {
  const card = new Card({
    cardData: cardData,
    userId: userId,
    cardSelector: '.card-template',
    handleCardClick: (name, link) => {
      popupImagePreview.open(link, name);
    },
    handleDeleteClick: () => {
      popupConfirmation.open();
      popupConfirmation.submitConfirmation(() => {
        api.removeCard(cardData._id)
          .then(() => {
            card.removeCard();
            popupConfirmation.close();
          })
          .catch((error) => {
            console.log('Карта не удалена');
          })
      })
    },
    likeClick: (likesCounter) => {
      api.likeCard(cardData._id)
        .then((res) => {
          likesCounter.textContent = res.likes.length;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    dislikeClick: (likesCounter) => {
      api.dislikeCard(cardData._id)
        .then((res) => {
          likesCounter.textContent = res.likes.length;
        })
        .catch((error) => {
          console.log(error);
        })
    },
  });
  return card.getView();
}
