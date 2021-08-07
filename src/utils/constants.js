export const cardsArray = document.querySelector('.places__cards');
export const userName = document.querySelector('.profile__name');
export const userAbout = document.querySelector('.profile__about');
export const userAvatar = document.querySelector('.profile__avatar');

// Формы
export const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
export const formAddCard = document.querySelector('.popup__form_type_add');
export const formEditAvatar = document.querySelector('.popup__form_type_edit-avatar');
// Кнопки
export const editProfileBtn = document.querySelector('.button_type_edit');
export const saveBtn = document.querySelector('.button_type_save');
export const addCardBtn = document.querySelector('.profile__button-add');
export const editAvatarBtn = document.querySelector('.profile__button-edit-avatar');
export const removeBtn = document.querySelector('.place__button-remove')
// Попапы
export const popupEditProfileSelector = '.popup_type_edit';
export const popupAddCardSelector = '.popup_type_add';
export const popupEditAvatarSelector = '.popup_type_edit-avatar';
export const popupImagePreviewSelector = '.popup_type_image';
export const popupConfirmSelector = '.popup_type_confirm';
// инпуты
export const nameInput = formEditProfile.querySelector('.popup__form-input_type_name');
export const jobInput = formEditProfile.querySelector('.popup__form-input_type_job');
export const placeName = formAddCard.querySelector('.popup__form-input_type_place-name'); // - название места инпут
export const imageUrl = formAddCard.querySelector('.popup__form-input_type_image-url'); //- ссылка на фото для инпута
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_status_disabled',
  inputErrorClass: 'popup__input-error_status_active',
  errorClass: 'popup__input-error'
};
