export default class Card {
  constructor({ cardData, userId, cardSelector, handleCardClick, handleDeleteClick, likeClick, dislikeClick}) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likesArray = cardData.likes;
    this._likes = cardData.likes;
    this._userId = userId;
    this._cardOwnerId = cardData.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likeClick = likeClick;
    this._dislikeClick = dislikeClick;
    this._likesSum = cardData.likes.length;
  }
  getView() {
    const cardTemplate = document.querySelector(this._cardSelector).content;
    this._element = cardTemplate.querySelector('.place').cloneNode(true);
    this._likeBtn = this._element.querySelector('.place__button-like');
    this._likeCounter = this._element.querySelector('.place__counter-likes');
    this._removeBtn = this._element.querySelector('.place__button-remove');
    this._cardImage = this._element.querySelector('.place__image');
    this._cardName = this._element.querySelector('.place__name');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;
    this._likeCounter.textContent = this._likesSum;
    this._setEventListeners();
    this._checkOwner();
    this._setUserLike();
    return this._element;
  }
  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._removeBtn.addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
  removeCard() {
    this._element.remove();
    this._element = null;
  }
  _handleToggleLike() {
    this._likeBtn.classList.toggle('button_type_like-active');
  }
  _handleLikeClick() {
    if (this._likeBtn.classList.contains('button_type_like-active')) {
      this._dislikeClick(this._likeCounter);
    } else {
      this._likeClick(this._likeCounter);
    };
    this._handleToggleLike();
  }
  _checkOwner() {
    if (this._userId === this._cardOwnerId) {
      this._removeBtn.classList.add('place__button-remove_status-active');
    } else {
      this._removeBtn.classList.remove('place__button-remove_status-active');
    }
  }
  _setUserLike() {
    this._activeLike = (this._likesArray.find((like) => {
      return this._userId === like._id;
    }))
    if (this._activeLike) {
      this._likeBtn.classList.add('button_type_like-active');
    }
  }

}



// const popupImage = document.querySelector('.popup_type_image');
// const popupPic = document.querySelector('.popup__image');
// const popupName = document.querySelector('.popup__place-caption');
// export default class Card {
//   constructor(cardData, cardSelector, handleCardClick) {
//     this._name = cardData.name;
//     this._link = cardData.link;
//     this._cardSelector = cardSelector;
//     this._handleCardClick = handleCardClick;
//   }
//   getView() {
//     const cardTemplate = document.querySelector(this._cardSelector).content;
//     this._element = cardTemplate.querySelector('.place').cloneNode(true);
//     const cardImage = this._element.querySelector('.place__image');
//     const cardName = this._element.querySelector('.place__name');
//     cardImage.src = this._link;
//     cardImage.alt = this._name;
//     cardName.textContent = this._name;
//     this.cardImage = cardImage;
//     this.cardName = cardName;
//     this._setEventListeners();
//     return this._element;
//   }
//   _setEventListeners() {
//     this._element.querySelector('.place__button-remove').addEventListener('click', () => this._removeCard());
//     this._element.querySelector('.place__button-like').addEventListener('click', () => this._likeCard());
//     this._element.querySelector('.place__image').addEventListener('click', () => this._handleCardClick());
//   }
//   removeCard() {
//     this._element.remove();
//     this._element = null;
//   }
//   _likeCard() {
//     this._element.querySelector('.place__button-like').classList.toggle('button_type_like-active');
//   }
// }
