import {Popup} from './Popup.js';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.popup__save-button');
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
    this._confirmButton.addEventListener('click', () => {
      this._handleSubmitForm();
    });
  }
}
