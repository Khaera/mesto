//экспортируем класс при создании
export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showError(inputElement) {
    this._errorElement = inputElement.closest('label').querySelector('.popup__input-error');
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideError(inputElement) {
    this._errorElement = inputElement.closest('label').querySelector('.popup__input-error');
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  //проверяем валидный ли инпут
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement);
    } else {
      this._hideError(inputElement);
    }
  }

  //если есть хоть один невалидный инпут
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //активация-деактивая кнопки отправки
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButtonElement.classList.add(this._inactiveButtonClass);//добавляет класс кнопке
      this._submitButtonElement.setAttribute('disabled', true); //добавляет атрибут disabled в html разметку кнопке
    } else {
      this._submitButtonElement.classList.remove(this._inactiveButtonClass);
      this._submitButtonElement.removeAttribute('disabled');
    }
  }

  //добавим обработчики событий
  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.toggleButtonState();
        this._checkInputValidity(inputElement);
      });
    });
  }

  //включение валидации
  enableValidation() {
    this._formsList = Array.from(document.querySelectorAll(this._formSelector));
    this._formsList.forEach(form => {
      this._setEventListeners();
    });
  }
}
