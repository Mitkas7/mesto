export const cardsArray = document.querySelector('.places__cards');
export const userName = document.querySelector('.profile__name');
export const userAbout = document.querySelector('.profile__about');
export const userAvatar = document.querySelector('.profile__avatar');

// Формы
export const formEditProfile = document.querySelector('.popup__form');
export const formAddCard = document.querySelector('.popup__form_type_add');
// Кнопки
export const editBtn = document.querySelector('.button_type_edit');
export const saveBtn = document.querySelector('.button_type_save');
export const addBtn = document.querySelector('.profile__button-add');
export const editAvatarBtn = document.querySelector('.profile__button-edit-avatar');
export const removeBtn = document.querySelector('.place__button-remove')
// Попапы
// export const popupEdit = document.querySelector('.popup_type_edit');
// export const popupAdd = document.querySelector('.popup_type_add');
// export const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
export const popupEdit = '.popup_type_edit';
export const popupAdd = '.popup_type_add';
export const popupEditAvatar = '.popup_type_edit-avatar';
export const popupConfirm = '.popup_type_confirm';

// инпуты
export const nameInput = formEditProfile.querySelector('.popup__form-input_type_name');
export const jobInput = formEditProfile.querySelector('.popup__form-input_type_job');
export const placeName = formAddCard.querySelector('.popup__form-input_type_place-name'); // - название места инпут
export const imageUrl = formAddCard.querySelector('.popup__form-input_type_image-url'); //- ссылка на фото для инпута
