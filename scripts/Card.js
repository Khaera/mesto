import { openPopupTypeImage } from "./index.js";

export class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

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

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}
