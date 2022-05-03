import './index.css';
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm';
import { UserInfo } from '../components/UserInfo.js';

import {
  configValidation,
  profilePopup,
  cardPopup,
  imagePopup,
  avatarPopup,
  confirmPopup,
  nameInput,
  careerInput,
  popupFormProfile,
  profileEditButton,
  profileAddButton,
  avatarEditButton,
  popupFormCard,
  popupFormAvatar,
  cardsList} from '../utils/constants.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: 'aef7fcbf-4f7d-4b00-9645-5edf6bf5ca39',
    "content-type": "application/json"
  }
});

//данные о пользователе из DOM
const userInfo = new UserInfo( {
  nameSelector: '.profile__name',
  careerSelector: '.profile__career',
  avatarSelector: '.profile__avatar'
});

//получаем данные с сервера для промиса
const getUserInfoFromServer = api.getUserInfo();
const getCardsFromServer = api.getInitialCards();

Promise.all([getUserInfoFromServer, getCardsFromServer])
   .then(([userData, initialCards]) => {
      userInfo.setUserInfo(userData)
      userInfo.setUserAvatar(userData.avatar);

      initialCards.forEach((item => {
         cards.addItem(createCard(item), false);
      }));
   })
   .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));


//создаём попап подтверждения удаления карточки
const popupTypeConfirm = new PopupWithConfirm(confirmPopup, handleSubmitDeleteForm)

//создаём попап открытия изображений
const popupTypeImage = new PopupWithImage(imagePopup);

//создаём попап редактирования информации профиля
const popupTypeProfile = new PopupWithForm(profilePopup, handleSubmitProfileForm);

//создаём попап редактирования аватара
const popupTypeAvatar = new PopupWithForm(avatarPopup, handleSubmitAvatarForm);

//создаём попап добавления карточки
const popupTypeCard = new PopupWithForm(cardPopup, handleAddCardForm);

//функция создания карточки
function createCard(data) {
  const card = new Card(
    data,
    handleCardClick,
    handleLikeCardClick,
    handleDeleteCardClick,
    userInfo.id,
    '#card-template');
  return card.generateCard();
};

//создаём карточки из массива
const cards = new Section({
  items: [],
  renderer: (item) => {
    cards.addItem(createCard(item));
  }
}, cardsList);

//колбэки обработчиков форм
function handleCardClick(name, link) {
  popupTypeImage.open(name, link);
}

function handleLikeCardClick(card) {
  if(card.isLiked()) {
    api.deleteLike(card._id)
    .then((data) => {
      card.addLikes(data.likes);
      card.removeLike();
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  } else {
    api.likeCard(card._id)
    .then((data) => {
      card.addLikes(data.likes);
      card.putLike();
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  }
}

function handleSubmitDeleteForm(card) {
  api.deleteCard(card._id)
  .then(() => {
    card.deleteCard();
    popupTypeConfirm.close();
  })
  .catch((err) => console.log(err));
}

function handleDeleteCardClick(card) {
  popupTypeConfirm.open();
  popupTypeConfirm.changeHandleSubmitForm(() => {
    handleSubmitDeleteForm(card);
  })
}

function handleAddCardForm(data) {
  popupTypeCard.changeButtonText("Создание...");
  const cardsData = {
    name: data["place"],
    link: data["link"]
  };
  api.addNewCard(cardsData)
  .then((item) => {
    cards.addItem(createCard(item), true);
    popupTypeCard.close();
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
  .finally(() => {
    popupTypeCard.changeButtonText('Создать');
  })
}

function handleSubmitProfileForm(data) {
  popupTypeProfile.changeButtonText('Сохранение...');
  api.editUserInfo( { name: data["name"], about: data["career"]} )
  .then((userData) => {
    userInfo.setUserInfo(userData);
    popupTypeProfile.close()
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    popupTypeProfile.changeButtonText('Сохранить');
  })
}

function handleSubmitAvatarForm(data) {
  popupTypeAvatar.changeButtonText('Сохранение...');
  api.editProfileAvatar( {link: data["avatar"]} )
  .then((data) => {
    userInfo.setUserAvatar(data.avatar);
    popupTypeAvatar.close();
  })
  .catch((err) => console.log(`Ошибка: ${err}`))
  .finally(() => {
    popupTypeAvatar.changeButtonText('Сохранить');
  })
}

//функции открытия попапов
function openPopupTypeProfile() {
  const userData = userInfo.getUserInfo();
  validateFormEditProfile.resetErrors();
  nameInput.value = userData.name;
  careerInput.value = userData.about;
  validateFormEditProfile.toggleButtonState();
  popupTypeProfile.open();
};

function openPopupTypeCard() {
  validateFormAddCard.resetErrors();
  validateFormAddCard.toggleButtonState();
  popupTypeCard.open();
};

function openPopupTypeAvatar() {
  validateFormEditAvatar.resetErrors();
  validateFormEditAvatar.toggleButtonState();
  popupTypeAvatar.open();
}

//добавляем валидацию формам
const validateFormEditProfile = new FormValidator(configValidation, popupFormProfile);
validateFormEditProfile.enableValidation();
const validateFormAddCard = new FormValidator(configValidation, popupFormCard);
validateFormAddCard.enableValidation();
const validateFormEditAvatar = new FormValidator(configValidation, popupFormAvatar);
validateFormEditAvatar.enableValidation();

//навешиваем обработчики на попапы
popupTypeCard.setEventListeners();
popupTypeImage.setEventListeners();
popupTypeProfile.setEventListeners();
popupTypeConfirm.setEventListeners();
popupTypeAvatar.setEventListeners();

profileEditButton.addEventListener('click', openPopupTypeProfile);
profileAddButton.addEventListener('click', openPopupTypeCard);
avatarEditButton.addEventListener('click', openPopupTypeAvatar);


