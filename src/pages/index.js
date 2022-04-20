import './index.css';
import { Card } from '../scripts/Card.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Section } from '../scripts/Section.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { UserInfo } from '../scripts/UserInfo.js';

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

//создаём попап редактирования информации профиля
const popupTypeProfile = new PopupWithForm(profilePopup,
  {
    handleSubmitForm: (data) => {
    userInfo.setUserInfo(data);
    popupTypeProfile.close();
  }
});

function openPopupTypeProfile() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  careerInput.value = userData.career;
  validateFormEditProfile.resetErrors();
  validateFormEditProfile.toggleButtonState();
  popupTypeProfile.open();
};

//создаём попап добавления карточки
const popupTypeCard = new PopupWithForm(cardPopup,
  {
    handleSubmitForm: (data) => {
    cards.addItem(data);
    popupTypeCard.close();
  }
});

function openPopupTypeCard() {
  validateFormAddCard.resetErrors();
  validateFormAddCard.toggleButtonState();
  popupTypeCard.open();
}

//добавляем карточки на страницу из массива
const cards = new Section({
  items: initialCards,
  renderer: item => {
    const card = new Card({
      data: item, handleCardClick: () => {
        const popupTypeImage = new PopupWithImage(imagePopup);
        popupTypeImage.open(item.place, item.link);
        popupTypeImage.setEventListeners();
      }
    }, '#card-template');
    const cardElement = card.generateCard();
    return cardElement;
  }
}, cardsList);

cards.renderItems(); //вызываем метод отображения карточек на странице


const validateFormEditProfile = new FormValidator(configValidation, popupFormProfile);
validateFormEditProfile.enableValidation();
const validateFormAddCard = new FormValidator(configValidation, popupFormCard);
validateFormAddCard.enableValidation();

popupTypeProfile.setEventListeners();
popupTypeCard.setEventListeners();

profileEditButton.addEventListener('click', openPopupTypeProfile);
profileAddButton.addEventListener('click', openPopupTypeCard);
