import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

export { openPopupTypeImage }; //экспорт функции открытия попапа картинок в Card.js

//массив карточек
const initialCards = [
  {
    name: 'Москва',
    link: './images/moscow.jpg'
  },
  {
    name: 'Владивосток',
    link: './images/vladivostok.jpg'
  },
  {
    name: 'Дагестан',
    link: './images/dagestan.jpg'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/saint-petersburg.jpg'
  },
  {
    name: 'Краснодарский край',
    link: './images/krasnodarskiy-kray.jpg'
  },
  {
    name: 'Остров Ольхон',
    link: './images/olkhon-island.jpg'
  }
];

//объект настроек валидации
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active',
};

//все попапы
const popups = document.querySelectorAll('.popup');

//переменные попапа редактирования инфы профиля
const popupTypeProfile = document.querySelector('.popup_type_profile'); //попап редактирования профиля
const nameInput = popupTypeProfile.querySelector('.popup__input_edit_name');
const careerInput = popupTypeProfile.querySelector('.popup__input_edit_career');
const popupFormProfile = popupTypeProfile.querySelector('.popup__form');
const profileContainer = document.querySelector('.profile');
const profileEditButton = profileContainer.querySelector('.profile__edit-button');
const profileName = profileContainer.querySelector('.profile__name');
const profileCareer = profileContainer.querySelector('.profile__career');
const profileAddButton = profileContainer.querySelector('.profile__add-button');

//переменные попапа добавления карточек
const popupTypeCard = document.querySelector('.popup_type_card-add'); //попап добавления карточки
const placeInput = popupTypeCard.querySelector('.popup__input_edit_place');
const linkInput = popupTypeCard.querySelector('.popup__input_edit_link');
const popupFormCard = popupTypeCard.querySelector('.popup__form');

//переменные попапа увеличения изображения
const popupTypeImage = document.querySelector('.popup_type_picture');
const cardImage = popupTypeImage.querySelector('.popup__image');
const cardCaption = popupTypeImage.querySelector('.popup__caption');

//все кнопки "крестики"
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

//элемент, куда мы будем вставлять карточки
const cardsList = document.querySelector('.elements__list');

//создание карточки из класса
function createCard(name, link, cardSelector) {
  const card = new Card(name, link, cardSelector);
  const cardElement = card.generateCard();
  return cardElement;
};

//добавление карточек из массивая
function addCardsFromArray() {
  initialCards.forEach((data) => {
    const newCard = createCard(data.name, data.link, '#card-template');
    cardsList.prepend(newCard);
  });
};

//добавление карточки вручную
function addCardManually() {
  const newCard = createCard(placeInput.value, linkInput.value, '#card-template');
  cardsList.prepend(newCard);
};

//функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  closePopupKeyEscape();
};

//функция открытия попапа редактирования профиля
function openPopupTypeProfile() {
  nameInput.value = profileName.textContent;  //добавления имени из данных профиля в поле ввода формы
  careerInput.value = profileCareer.textContent;   //добавления рода деятельности из данных профиля в поле ввода формы
  validateFormEditProfile.resetErrors(); //сбрасываем показанные ошибки если они были
  validateFormEditProfile.toggleButtonState();
  openPopup(popupTypeProfile);
};

//функция открытия попапа добавления карточек
function openPopupTypeCard() {
  resetInputsFormCard();
  validateFormAddCard.resetErrors(); //сбрасываем показанные ошибки если они были
  validateFormAddCard.disableSubmitButton(); //отключаем кнопку отправки формы
  openPopup(popupTypeCard);
};

//функция открытия попапа, увеличивающего изображения. экспортируется сразу при создании
function openPopupTypeImage(name, link) {
  cardImage.src = link;
  cardImage.alt = name;
  cardCaption.textContent = name;
  openPopup(popupTypeImage);
};

//функция очистки полей формы добавления карточек
function resetInputsFormCard() {
  popupFormCard.reset();
};

//закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  validateFormAddCard._setEventListeners();
  validateFormEditProfile._setEventListeners();
  removeKeyEscape();
};

//функция закрытия попапа при нажатии на крестик
popupCloseButtons.forEach((item) => {
  const popup = item.closest('.popup');
  item.addEventListener('click', function() {
    closePopup(popup);
  });
});

//функция закрытия попапа при нажатии на Esc
function closeKeyEscape (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

function closePopupKeyEscape() {
  document.addEventListener('keydown', closeKeyEscape);
};

function removeKeyEscape() {
  document.removeEventListener('keydown', closeKeyEscape);
};

//закрытие попапа при нажатии на оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    };
  });
});

//отправка формы попапа добавления карточек
function handleSubmitCardForm(evt) {
  evt.preventDefault();
  addCardManually();
  closePopup(popupTypeCard);
};

//отправка формы редактирования информации профиля
function handleSubmitProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCareer.textContent = careerInput.value;
  closePopup(popupTypeProfile);
};

//добавление валидации форм через конструктор
const validateFormEditProfile = new FormValidator(configValidation, popupFormProfile);
validateFormEditProfile.enableValidation();
const validateFormAddCard = new FormValidator(configValidation, popupFormCard);
validateFormAddCard.enableValidation();

//события, при нажатии на кнопки
profileEditButton.addEventListener('click', openPopupTypeProfile);
profileAddButton.addEventListener('click', openPopupTypeCard);
popupFormProfile.addEventListener('submit', handleSubmitProfileForm);
popupFormCard.addEventListener('submit', handleSubmitCardForm);

addCardsFromArray(); //вызов функции добавления карточек из массива
