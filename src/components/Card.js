//создаем класс создания карточек
export class Card {
  constructor( {data, handleCardClick}, cardSelector) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

  _handleLikeCard(evt) {
    this._likeButton.classList.toggle('element__like_active');
  }

  _handleDeleteCard(evt) {
    this._element.remove(); //удаляет карточку
    this._element = null; //удаляет данные о карточке из памяти
  }

  //добавляем события
  _setEventListeners() {
    this._likeButton.addEventListener('click', (evt) => {
      this._handleLikeCard(evt);
    });

    this._deleteButton.addEventListener('click', (evt) => {
      this._handleDeleteCard(evt);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  //создание карточки
  generateCard() {
    //объявляем классовые переменные
    this._element = this._getTemplate();
    this._elementTitle = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('.element__delete-button');

    //наполняем атрибуты классовых переменных
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.place;
    this._elementTitle.textContent = this._data.place;

    this._setEventListeners();
    return this._element;
  }
}
