//функция показа ошибки
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = inputElement.closest('.popup__field').querySelector('.popup__input-error');

  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
  inputElement.classList.add('popup__input_invalid');
};

//функция скрытия ошибки
const hideError = (formElement, inputElement) => {
  const errorElement = inputElement.closest('.popup__field').querySelector('.popup__input-error');

  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
  inputElement.classList.remove('popup__input_invalid');
};

//функция проверки валидности инпута формы
const checkValidity = (formElement, inputElement) => {
  console.log(inputElement.validity);
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;


    showError(formElement, inputElement, errorMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = formElement.querySelectorAll('.popup__input');

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (event) => {
      console.log(event.target.name, event.target.value);

      checkValidity(formElement, inputElement);
    })
  })
}

const enableValidation = () => {
  const formsList = Array.from(document.querySelectorAll('.popup__form'));

  formsList.forEach(formElement => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();
