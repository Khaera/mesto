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
