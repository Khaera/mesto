//импортируем функцию открытия попапа картинок
import { openPopupTypeImage } from "./index.js";

export { Card };
export { CardAddManual };

//создаем класс создания карточек
class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
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

  _likeCard() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._element.querySelector('.element__delete-button').closest('li').remove(); //находит ближайший li и удаляет
  }

  //добавляем события
  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeCard();
    });

    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopup();
    });
  }

  //создание карточки
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}

//класс создания карточки вручную
class CardAddManual extends Card {
  constructor(name, link, cardSelector) {
    super(cardSelector);
    this._name = name;
    this._link = link;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}
