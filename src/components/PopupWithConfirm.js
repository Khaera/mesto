import {Popup} from './Popup.js';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleSubmitForm = handleSubmitForm;
  }

  _handleEnterSubmit(evt) {
    if(evt.key === 'Enter') {
      this._handleSubmitForm();
    }
  }

  open() {
    super.open();
    document.addEventListener("keydown", this._handleEnterSubmit);
  }

  close() {
    super.close();
    document.removeEventListener("keydown", this._handleEnterSubmit);
  }

  changeHandleSubmitForm(newHandleSubmitForm) {
    this._handleSubmitForm = newHandleSubmitForm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm();
    });
  }
}
