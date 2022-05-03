//создаем класс создания карточек
export class Card {
  constructor(data,
    handleCardClick,
    handleLikeCard,
    handleDeleteCard,
    userId,
    cardSelector) {
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteCard = handleDeleteCard;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner;
  }

  //шаблон карточки
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  _updateLikeFilling() {
    this.isLiked() ? this.putLike() : this.removeLike();
  }

  addLikes(newLikes) {
    this._likes = newLikes;
    this._likesCounter.textContent = this._likes.length;
  }


  isLiked() {
    return this._likes.map((userInfo) => userInfo._id).includes(this._userId);
  }

  putLike() {
    this._likeButton.classList.add('element__like_active');
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  removeLike() {
    this._likeButton.classList.remove('element__like_active');
  }

  //добавляем события
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard(this);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCard(this);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  //создание карточки
  generateCard() {
    //объявляем классовые переменные
    this._element = this._getTemplate();
    this._elementTitle = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-image');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._likesCounter = this._element.querySelector('.element__like-count');

    if (this._owner._id !== this._userId) {
      this._deleteButton.remove();
    }


    //наполняем атрибуты классовых переменных
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._elementTitle.textContent = this._name;

    this._setEventListeners();
    this.addLikes(this._likes);
    this._updateLikeFilling();
    return this._element;
  }
}
