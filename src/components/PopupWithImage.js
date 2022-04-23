import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = this._popup.querySelector('.popup__image');
    this._cardCaption = this._popup.querySelector('.popup__caption');
  }

  open(place, link) {
    this._cardImage.src = link;
    this._cardImage.alt = place;
    this._cardCaption.textContent = place;

    super.open();
  }
}
