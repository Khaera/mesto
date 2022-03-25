import { Card } from './Card.js';
import { CardAddManual } from './Card.js';

export {openPopupTypeImage};

//переменная массива карточек - вынесена в отдельный файл для удобства чтения кода
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
    name: 'Тулиновка',
    link: './images/tulinovka.jpg'
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

//все попапы
const popups = document.querySelectorAll('.popup');

//переменные попапа редактирования инфы профиля
const popupTypeProfile = document.querySelector('.popup_type_profile'); //попап редактирования профиля
const nameInput = popupTypeProfile.querySelector('.popup__input_edit_name');
const careerInput = popupTypeProfile.querySelector('.popup__input_edit_career');
const popupFormProfile = popupTypeProfile.querySelector('.popup__form');
const profileContainer = document.querySelector('.profile');
const editButton = profileContainer.querySelector('.profile__edit-button');
const profileName = profileContainer.querySelector('.profile__name');
const profileCareer = profileContainer.querySelector('.profile__career');
const addButton = profileContainer.querySelector('.profile__add-button');

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

//список карточек (для вставки из массива)
const cardsList = document.querySelector('.elements__list');


//добавление карточек из массивая
function addCardsFromArray() {
  initialCards.forEach((data) => {
    const card = new Card(data, '#card-template');
    const cardElement = card.generateCard();
    cardsList.prepend(cardElement);
  });
}

//добавление карточки вручную
  function addCardManual() {
    const card = new CardAddManual(placeInput.value, linkInput.value, '#card-template');
    const cardElement = card.generateCard();
    cardsList.prepend(cardElement);
    resetInputsFormCard();
    closePopup(popupTypeCard);
  }

//функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  closePopupKeyEscape();
}

//функция открытия попапа редактирования профиля
function openPopupTypeProfile() {
  nameInput.value = profileName.textContent;  //добавления имени из данных профиля в поле ввода формы
  careerInput.value = profileCareer.textContent;   //добавления рода деятельности из данных профиля в поле ввода формы
  openPopup(popupTypeProfile);
  checkActualValidation(popupTypeProfile, configValidation);
};

//функция открытия попапа добавления карточек
function openPopupTypeCard() {
  resetInputsFormCard();
  openPopup(popupTypeCard);
  checkActualValidation(popupTypeCard, configValidation);
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
  removeKeyEscape();
};


//функция закрытия попапа при нажатии на крестик
popupCloseButtons.forEach((item) => {
  const popupWindow = item.closest('.popup');
  item.addEventListener('click', function() {
    closePopup(popupWindow);
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
  addCardManual();
  closePopup(popupTypeCard);
}

//отправка формы редактирования информации профиля
function handleSubmitProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCareer.textContent = careerInput.value;
  closePopup(popupTypeProfile);
}

//события, при нажатии на кнопки
editButton.addEventListener('click', openPopupTypeProfile);
addButton.addEventListener('click', openPopupTypeCard);
popupFormProfile.addEventListener('submit', handleSubmitProfileForm);
popupFormCard.addEventListener('submit', handleSubmitCardForm);

addCardsFromArray(); //вызов функции добавления карточек из массива
