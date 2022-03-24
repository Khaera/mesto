import { openPopUp } from './index.js';

export class Card {
  constructor(name, link, cardSelector) {
    this.name = name;
    this.link = link;
    this.cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector('#card-template')
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  _likeCard(event) {
    event.target.classList.toggle('element__like_active');
  }

  _deleteCard(event) {
    event.target.closest('.element').remove();
  }

  _openPopUpImage(link, name) {
      const popUpImage = document.querySelector('.popup_type_picture');
      const popupCardImage = popUpImage.querySelector('.popup__image');
      const popupCardCaption = popUpImage.querySelector('.popup__caption');

      popupCardImage.src = link.src;
      popupCardImage.alt = name.textContent;
      popupCardCaption.textContent = name.textContent;
      openPopUp(popUpImage);
  }

  _setEventListeners(like, remove) {
    like.addEventListener('click', () => {
      this._likeCard(event);
    });

    remove.addEventListener('click', () => {
      this._deleteCard(event);
    });
  }

  generateCard() {
    this.element = this._getTemplate();
    const newElementImage = this.element.querySelector('.element__image');
    const newElementTitle = this.element.querySelector('.element__title');
    const newElementLike = this.element.querySelector('.element__like');
    const newElementDelete = this.element.querySelector('.element__delete-button');
    newElementImage.src = this.link;
    newElementImage.alt = this.name;
    newElementTitle.textContent = this.name;
    newElementImage.addEventListener('click', () => {
      this._openPopUpImage(newElementImage, newElementTitle);
    })
    this._setEventListeners(newElementLike, newElementDelete);

    return this.element;
  }
}
