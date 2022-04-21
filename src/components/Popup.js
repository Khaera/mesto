export class Popup {
  constructor( popupSelector ) {
    this._popupSelector = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupSelector.querySelector('.popup__close-button');
    this._escBinded = this._handleEscClose.bind(this);
  }

    open() {
      this._popupSelector.classList.add('popup_opened');
      document.addEventListener('keydown', this._escBinded);
    }

    close() {
      this._popupSelector.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._escBinded);
    }

    _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close();
      }
    }

    setEventListeners() {
      this._popupCloseButton.addEventListener('click', () => {
        this.close();
      });

      this._popupSelector.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          this.close();
        };
      });
    }
}
