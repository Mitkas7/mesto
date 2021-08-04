import './styles/index.css';
import Api from '../src/scripts/Api.js';
import Card from '../src/scripts/Card.js';
import Section from '../src/scripts/Section.js';
import UserInfo from '../src/scripts/UserInfo.js';
import PopupWithForm from '../src/scripts/PopupWithForm.js';
import PopupWithImage from '../src/scripts/PopupWithImage.js';
import PopupWithConfirm from '../src/scripts/PopupWithConfirm.js';
// import { popupEditValidator, popupAddValidator } from '../src/scripts/formValidator.js';
import { userName, userAbout, userAvatar,
  editBtn, addBtn, editAvatarBtn, removeBtn,
popupEdit,popupEditAvatar, pop} from '../src/scripts/constants.js';
const api = new Api('https://nomoreparties.co/v1/cohort-26/', '2ceacd5c-fca2-4318-a334-9732db7cb6fc');
const userData = new UserInfo(userName, userAbout, userAvatar);
function handleUserInfo(data) {
  userData.setUserInfo(data.name, data.about, data._id);
}
function handleUserAvatar(data) {
  userData.setUserAvatar(data.avatar)
}
function handleCardLike() {
  const cardArr = this.isLiked() ? api.deleteLike(this.cardId) : api.likeCard(this.cardId);
  cardArr.then((response) => {
    this.likes = response.likes;
    this.handleToggleLike();
    this.setCounter(response.likes.length);
  })
}
// function handleCardDelete() {
//   popupDelete.open(this);
//   console.log(this);
// }

const popupConfirm = new PopupWithConfirm('.popup_type_confirm', (card) => {
  api.deleteCard(card.cardId)
    .then((res) => {
      if (res.message === "Пост удалён") {
        card.removeElement();
      }
    })
    .catch((err) => console.log(err))
});
popupConfirm.setEventListeners();

//-----------------функции для сборки карточек-----------------------
const createCard = (item) => {
  const userId = userData.getUserId();
  return new Card(item, '.card-template',
    function handleCardClick() { popupImage.open(item.link, item.name) },
    handleCardLike,
    // handleCardDelete,
    userId);
};

const renderCard = (item) => {
  return createCard(item).getView();
};

const renderCards = new Section(
  function renderer(item) {
    renderCards.addItem(renderCard(item));
  },
  '.places__cards');

//-------------------------API--------------------------------------
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    renderCards.render(cardsData);
    handleUserInfo(userData);
    handleUserAvatar(userData);
    const currentUserInfo = userData.getUserInfo();
    userData.getUserId();

    //---------------рендер карточек--------------------------------


    //---------добавление карточки на сервер------------------------
    const popupAdd = new PopupWithForm('.popup_type_add', (dataCard) => {
      cardValidate.changeButtonText('Создание...');
      api.postNewCard(dataCard.name, dataCard.link)
        .then((data) => {
          renderCards.addItem(renderCard(data));
          popupAdd.close();
          cardValidate.changeButtonText('Создать');
        })
        .catch((err) => console.log(err))
    });
    popupAdd.setEventListeners();

    //----------добавление данных профиля на сервер-----------------
    const popupEdit = new PopupWithForm('.popup_type_edit', (userInfo) => {
      // userValidate.changeButtonText('Сохранение...');
      api.editUserInfo(userInfo.name, userInfo.about)
        .then(() => {
          handleUserInfo(userInfo);
          popupEdit.close();
          // userValidate.changeButtonText('Сохранить');
        })
        .catch((err) => console.log(err))
    });
    popupEdit.setEventListeners();

    //----------добавление аватарки профиля на сервер---------------
    const popupAvatar = new PopupWithForm('.popup_type_edit-avatar', (userInfo) => {
      avatarValidate.changeButtonText('Сохранение...');
      api.editUserAvatar(userInfo.avatar)
        .then(() => {
          handleUserAvatar(userInfo);
          popupAvatar.close();
          avatarValidate.changeButtonText('Сохранить');
        })
        .catch((err) => console.log(err))
    });
    popupAvatar.setEventListeners();

    //-------------слушатели-----------------------------------------
    editBtn.addEventListener('click', () => {
      userForm.name.value = currentUserInfo.name;
      userForm.about.value = currentUserInfo.about;
      // userValidate.resetErrorText();
      popupUser.open();
    });

    addBtn.addEventListener('click', () => {
      cardValidate.resetErrorText();
      popupAdd.open();
    });

    editAvatarBtn.addEventListener('click', () => {
      avatarValidate.resetErrorText();
      popupAvatar.open();
    });

    removeBtn.addEventListener('click', () => {
      popupConfirm.open();
    })


  })
  .catch((err) => {
    console.log(err);
  });

const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

//-----------------------------
// // Сгенерировать начальные карты
// const cardList = new Section({
//   items: initialCards,
//   renderer: (item) => {
//     cardList.addItem(createCard(item));
//   }
// }, '.places__cards');
// cardList.render();
// // создание попапа превью картинки
// const popupImage = new PopupWithImage('.popup_type_image');
// popupImage.setEventListeners();
// // создание экземпляра класса пользовательской информации
// const userInfo = new UserInfo('.profile__name', '.profile__job');
// // создание попапа формы рекдактирования
// const editProfilePopup = new PopupWithForm('.popup_type_edit', (data) => {
//   submitEditProfileForm(data);
// });
// editProfilePopup.setEventListeners();
// // открытие попапа рекдактирвоания
// editBtn.addEventListener('click', () => {
//   editProfilePopup.open();
//   const data = userInfo.getUserInfo();
//   nameInput.value = data.name;
//   jobInput.value = data.job;
//   popupEditValidator.resetForm();
// });
// // сохранение новых данных пользователя
// function submitEditProfileForm(data) {
//   userInfo.setUserInfo(data);
//   editProfilePopup.close();
// }
// // создание попапа добавления карты
// const addCardPopup = new PopupWithForm('.popup_type_add', (data) => {
//   submitAddCardForm(data);
// });
// addCardPopup.setEventListeners();
// // открытие попапа добавления карты
// addBtn.addEventListener('click', () => {
//   addCardPopup.open();
//   placeName.value = '';
//   imageUrl.value = '';
//   formAddCard.reset();
//   popupAddValidator.disableSubmitButton();
// });
// // сохранение данных форм добавленитя карты и доабвление ее непосредственно
// function submitAddCardForm(data) {
//   const newCard = {
//     name: data.placeName,
//     link: data.imageUrl,
//     alt: data.placeName,
//   }
//   addNewCard(newCard);
//   addCardPopup.close();
// }
// //запуск валидатора форм
// popupEditValidator.enableValidation();
// popupAddValidator.enableValidation();

// // функция создания карты
// function createCard(item) {
//   const card = new Card(item, '.card-template', () => {
//     popupImage.open(item.link, item.name);
//   });
//   const createdCard = card.getView();
//   return createdCard;
// }
// // Функция добавления карты в общий список
// function addNewCard(cardItem) {
//   cardsArray.prepend(createCard(cardItem));
// }
