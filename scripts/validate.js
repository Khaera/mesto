//функция показа ошибки
const showError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  //переменная элемента ошибки
  const errorElement = inputElement.closest('.popup__field').querySelector('.popup__input-error');

  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
};

//функция скрытия ошибки
const hideError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = inputElement.closest('.popup__field').querySelector('.popup__input-error');

  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
};

//функция проверки валидности инпута формы
const checkFormValidity = (formElement, inputElement, rest) => {
  //переменная невалидного инпута
  const isInputInvalid = !inputElement.validity.valid;

  //условная конструкция, принимающая на вход невалидный инпут. показывает/скрывает ошибку
  if (isInputInvalid) {
    //переменная сообщения ошибки с дефолтным текстом ошибки браузера
    const errorMessage = inputElement.validationMessage;

    showError(formElement, inputElement, errorMessage, rest);
  } else {
    hideError(formElement, inputElement, rest);
  }
};


//функция дизейбла кнопки отправить
const toggleButtonState = (inputList, submitButtonElement, {inactiveButtonClass}) => {

  //получаем невалидный инпут из списка всех инпутов
  const hasInvalidInput = Array.from(inputList).some((inputElement => {
    return !inputElement.validity.valid;
  }));

  //условная конструкция, проверяющая валидный или невалидный инпут.
  if (hasInvalidInput) {
    submitButtonElement.classList.add(inactiveButtonClass);//добавляет класс кнопке
    submitButtonElement.setAttribute('disabled', true); //добавляет атрибут disabled в html разметку кнопке
  } else {
    submitButtonElement.classList.remove(inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled');
  }
};


//функция проверка валидности попапа (вызывается при его открытии)
const checkActualValidation = (popup) => {
  const inputList = Array.from(popup.querySelectorAll('.popup__input'));

  const submitButtonElement = popup.querySelector('.popup__save-button');

  inputList.forEach((inputElement) => {

    if (inputElement.validity.valid) {
      hideError(popup, inputElement, {inputErrorClass: 'popup__input_invalid', errorClass: 'popup__input-error_active'});
    }

    toggleButtonState(inputList, submitButtonElement, {inactiveButtonClass: 'popup__save-button_disabled'});
  })
}


//функция устанавливающая список событий на все инпуты
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {

  const inputList = Array.from(formElement.querySelectorAll(inputSelector)); //переменная списка инпутов

  const submitButtonElement = formElement.querySelector(submitButtonSelector); //переменная кнопки отправки формы

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkFormValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, submitButtonElement, rest);
    });
  });
};


//функция включения валидации, принимающая на вход объект настроек.
const enableValidation = ({formSelector, ...rest}) => {
  const formsList = Array.from(document.querySelectorAll(formSelector));
  formsList.forEach(form => {
    setEventListeners(form, rest);
  });
};

//вызов функции включения валидации форм, которая принимает в себя объект данных
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active',
});

