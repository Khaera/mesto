import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

import { initialCards,
  configValidation,
  profilePopup,
  cardPopup,
  imagePopup,
  nameInput,
  careerInput,
  popupFormProfile,
  profileEditButton,
  profileAddButton,
  popupFormCard,
  cardsList} from '../utils/constants.js';

//данные о пользователе из DOM
const userInfo = new UserInfo( {
  nameSelector: '.profile__name',
  careerSelector: '.profile__career',
});

//создаём попап открытия изображений
const popupTypeImage = new PopupWithImage(imagePopup);

//создаём попап редактирования информации профиля
const popupTypeProfile = new PopupWithForm(profilePopup,
  {
    handleSubmitForm: (data) => {
    userInfo.setUserInfo(data);
    popupTypeProfile.close();
  }
});

//функция создания карточки
function createCard(item) {
  const card = new Card({
    data: item,
    handleCardClick: (place, link) => {
      popupTypeImage.open(place, link);
    }
  }, '#card-template');
  return card.generateCard();
};

//создаём попап добавления карточки
const popupTypeCard = new PopupWithForm(cardPopup,
  {
    handleSubmitForm: (item) => {
    cards.addItem(createCard(item));
    popupTypeCard.close();
  }
});

//создаём карточки из массива
const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCards = createCard(item);
    cards.addItem(newCards);
  }
}, cardsList);

cards.renderItems(); //отображаем массив карточек на странице

//добавляем валидацию формам
const validateFormEditProfile = new FormValidator(configValidation, popupFormProfile);
validateFormEditProfile.enableValidation();
const validateFormAddCard = new FormValidator(configValidation, popupFormCard);
validateFormAddCard.enableValidation();

function openPopupTypeProfile() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  careerInput.value = userData.career;
  validateFormEditProfile.resetErrors();
  validateFormEditProfile.toggleButtonState();
  popupTypeProfile.open();
};

function openPopupTypeCard() {
  validateFormAddCard.resetErrors();
  validateFormAddCard.toggleButtonState();
  popupTypeCard.open();
};

//навешиваем обработчики на попапы
popupTypeCard.setEventListeners();
popupTypeImage.setEventListeners();
popupTypeProfile.setEventListeners();

profileEditButton.addEventListener('click', openPopupTypeProfile);
profileAddButton.addEventListener('click', openPopupTypeCard);
