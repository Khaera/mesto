//функция показа ошибки
const showError = (inputElement, errorMessage) => {
  //переменная элемента ошибки
  const errorElement = inputElement.closest('.popup__field').querySelector('.popup__input-error');


  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
  inputElement.classList.add('popup__input_invalid');
};

//функция скрытия ошибки
const hideError = (inputElement) => {
  const errorElement = inputElement.closest('.popup__field').querySelector('.popup__input-error');


  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
  inputElement.classList.remove('popup__input_invalid');
};

//функция проверки валидности инпута формы
const checkFormValidity = (formElement, inputElement) => {
  //переменная невалидного инпута
  const isInputInvalid = !inputElement.validity.valid;

  //условная конструкция, принимающая на вход невалидный инпут. показывает/скрывает ошибку
  if (isInputInvalid) {
    //переменная сообщения ошибки с дефолтным текстом ошибки браузера
    const errorMessage = inputElement.validationMessage;

    showError(inputElement, errorMessage);
  } else {
    hideError(inputElement);
  }
};


//функция дизейбла кнопки отправить
const toggleButtonState = (inputList, submitButton) => {

  //получаем невалидный инпут из списка всех инпутов
  const hasInvalidInput = Array.from(inputList).some((inputElement => {
    return !inputElement.validity.valid;
  }));

  //условная конструкция, проверяющая валидный или невалидный инпут.
  if (hasInvalidInput) {
    submitButton.classList.add('popup__save-button_disabled');//добавляет класс кнопке
    submitButton.setAttribute('disabled', true); //добавляет атрибут disabled в html разметку кнопке
  } else {
    submitButton.classList.remove('popup__save-button_disabled');
    submitButton.removeAttribute('disabled');
  }
};

//функция устанавливающая список событий на все инпуты
const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll('.popup__input'); //переменная списка инпутов
  const submitButton = formElement.querySelector('.popup__save-button'); //переменная кнопки отправки формы
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (event) => {
      checkFormValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButton);
    });
  });
  toggleButtonState(inputList, submitButton);
};

//объект настроек валидации
const objectValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error_visible',
};

//функция включения валидации, принимающая на вход объект настроек.
const enableValidation = (objectValidation) => {
  const formsList = [...document.querySelectorAll(objectValidation.formSelector)];

  formsList.forEach(formElement => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement);
  });
};


enableValidation(objectValidation);

