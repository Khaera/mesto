import { Card } from './Card.js';

export {openPopUp};
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


const popUps = document.querySelectorAll('.popup');

//переменные попапа редактирования инфы профиля
const popUpProfile = document.querySelector('.popup_type_profile');
const nameInput = popUpProfile.querySelector('.popup__input_edit_name');
const careerInput = popUpProfile.querySelector('.popup__input_edit_career');
const profileContainer = document.querySelector('.profile');
const editButton = profileContainer.querySelector('.profile__edit-button');
const profileName = profileContainer.querySelector('.profile__name');
const profileCareer = profileContainer.querySelector('.profile__career');
const popUpFormProfile = popUpProfile.querySelector('.popup__form');

//переменные попапа добавления карточек
const addButton = document.querySelector('.profile__add-button')
const popUpCard = document.querySelector('.popup_type_card-add');
const placeInput = popUpCard.querySelector('.popup__input_edit_place');
const linkInput = popUpCard.querySelector('.popup__input_edit_link');
const popUpFormCard = popUpCard.querySelector('.popup__form');

//переменная кнопок закрытия
const popUpCloseButtons = document.querySelectorAll('.popup__close-button');
const cardsList = document.querySelector('.elements__list');


//добавление карточек из массивая
function addCardsFromArray() {
  initialCards.forEach((data) => {
    const card = new Card(data.name, data.link, '#card-template');
    const newCardFromTemplate = card.generateCard();
    cardsList.append(newCardFromTemplate);
  });
}

  function addCardManual() {
    const card = new Card(placeInput.value, linkInput.value, '#card-template');
    const newCardFromTemplate = card.generateCard();
    cardsList.prepend(newCardFromTemplate);
    resetInputsFormCard();
    closePopUp(popUpCard);
  }

//функция открытия попапов
function openPopUp(popup) {
  popup.classList.add('popup_opened');
  closePopUpKeyEscape();
}

//функция открытия попапа редактирования профиля
function openPopUpProfile() {
  nameInput.value = profileName.textContent;  //добавления имени из данных профиля в поле ввода формы
  careerInput.value = profileCareer.textContent;   //добавления рода деятельности из данных профиля в поле ввода формы
  openPopUp(popUpProfile);
  checkActualValidation(popUpProfile, configValidation);
};


//функция открытия попапа добавления карточек
function openPopUpCard() {
  resetInputsFormCard();
  openPopUp(popUpCard);
  checkActualValidation(popUpCard, configValidation);
};

//функция очистки полей формы добавления карточек

function resetInputsFormCard() {
  popUpFormCard.reset();
};

//закрытие попапа
function closePopUp(popup) {
  popup.classList.remove('popup_opened');
  removeKeyEscape();
};


//функция закрытия попапа при нажатии на крестик
popUpCloseButtons.forEach((item) => {
  const popUpWindow = item.closest('.popup');
  item.addEventListener('click', function() {
    closePopUp(popUpWindow);
  });
});

//функция закрытия попапа при нажатии на Esc
function closeKeyEscape (evt) {
  if (evt.key === 'Escape') {
    const openedPopUp = document.querySelector('.popup_opened');
    closePopUp(openedPopUp);
  }
};

function closePopUpKeyEscape() {
  document.addEventListener('keydown', closeKeyEscape);
};

function removeKeyEscape() {
  document.removeEventListener('keydown', closeKeyEscape);
};

//закрытие попапа при нажатии на оверлей

popUps.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopUp(popup)
    };
  });
});


//отправка формы попапа добавления карточек
function handleSubmitCardForm(evt) {
  evt.preventDefault();
  addCardManual();
  closePopUp(popUpCard);
}

//отправка формы редактирования информации профиля
function handleSubmitProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCareer.textContent = careerInput.value;
  closePopUp(popUpProfile);
}



//события, при нажатии на кнопки
editButton.addEventListener('click', openPopUpProfile);
addButton.addEventListener('click', openPopUpCard);
popUpFormProfile.addEventListener('submit', handleSubmitProfileForm);
popUpFormCard.addEventListener('submit', handleSubmitCardForm);
addCardsFromArray();
