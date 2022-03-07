//функция показа ошибки
const showError = (formElement, inputElement, errorMessage, config) => {
  //переменная элемента ошибки
  const errorElement = inputElement.closest('.popup__field').querySelector('.popup__input-error');

  errorElement.textContent = errorMessage;
  errorElement.classList.add(configValidation.errorClass);
  inputElement.classList.add(configValidation.inputErrorClass);
};

//функция скрытия ошибки
const hideError = (formElement, inputElement, config) => {
  const errorElement = inputElement.closest('.popup__field').querySelector('.popup__input-error');

  errorElement.textContent = '';
  errorElement.classList.remove(configValidation.errorClass);
  inputElement.classList.remove(configValidation.inputErrorClass);
};

//функция проверки валидности инпута формы
const checkFormValidity = (formElement, inputElement, config) => {
  //переменная невалидного инпута
  const isInputInvalid = !inputElement.validity.valid;

  //условная конструкция, принимающая на вход невалидный инпут. показывает/скрывает ошибку
  if (isInputInvalid) {
    //переменная сообщения ошибки с дефолтным текстом ошибки браузера
    const errorMessage = inputElement.validationMessage;

    showError(formElement, inputElement, errorMessage, configValidation);
  } else {
    hideError(formElement, inputElement, configValidation);
  }
};


//функция переключения состояния кнопки отправить
const toggleButtonState = (inputList, submitButtonElement, config) => {

  //получаем невалидный инпут из списка всех инпутов
  const hasInvalidInput = Array.from(inputList).some((inputElement => {
    return !inputElement.validity.valid;
  }));

  //условная конструкция, проверяющая валидный или невалидный инпут.
  if (hasInvalidInput) {
    submitButtonElement.classList.add(configValidation.inactiveButtonClass);//добавляет класс кнопке
    submitButtonElement.setAttribute('disabled', true); //добавляет атрибут disabled в html разметку кнопке
  } else {
    submitButtonElement.classList.remove(configValidation.inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled');
  }
};


//функция устанавливающая список событий на все инпуты
const setEventListeners = (formElement, config) => {

  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector)); //переменная списка инпутов

  const submitButtonElement = formElement.querySelector(configValidation.submitButtonSelector); //переменная кнопки отправки формы

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkFormValidity(formElement, inputElement, configValidation);
      toggleButtonState(inputList, submitButtonElement, configValidation);
    });
  });
};

//функция проверка валидности попапа (вызывается при его открытии)
const checkActualValidation = (popup, config) => {
  //получаем список инпутов
  const inputList = Array.from(popup.querySelectorAll(configValidation.inputSelector));

  const submitButtonElement = popup.querySelector(configValidation.submitButtonSelector);

  inputList.forEach((inputElement) => {

    //прорка валидности инпута и если валидно, ошибка скрывается.
    if (inputElement.validity.valid) {
      hideError(popup, inputElement, configValidation);
    }

    toggleButtonState(inputList, submitButtonElement, configValidation);
  })
}


//функция включения валидации, принимающая на вход объект настроек.
const enableValidation = (config) => {
  const formsList = Array.from(document.querySelectorAll(configValidation.formSelector));
  formsList.forEach(form => {
    setEventListeners(form, configValidation);
  });
};


//объект настроек валидации формы
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active',
};

//вызов функции включения валидации форм, которая принимает в себя объект данных
enableValidation(configValidation);

