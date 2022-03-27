//импортируем функцию открытия попапа картинок
import { openPopupTypeImage } from "./index.js";

export { Card };

//создаем класс создания карточек
class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  //шаблон карточки
  _getTemplate() {
    const cardElement = document.querySelector('#card-template')
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  _openPopup() {
    openPopupTypeImage(this._name, this._link);
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
      this._openPopup();
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
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._elementTitle.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}
