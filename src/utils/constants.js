import moscowImage from '../images/moscow.jpg';
import vladivostokImage from '../images/vladivostok.jpg';
import dagestanImage from '../images/dagestan.jpg';
import spbImage from '../images/saint-petersburg.jpg';
import krasnodarImage from '../images/krasnodarskiy-kray.jpg';
import olkhonImage from '../images/olkhon-island.jpg';

//массив карточек
export const initialCards = [
  {
    place: 'Москва',
    link: moscowImage
  },
  {
    place: 'Владивосток',
    link: vladivostokImage
  },
  {
    place: 'Дагестан',
    link: dagestanImage
  },
  {
    place: 'Санкт-Петербург',
    link: spbImage
  },
  {
    place: 'Краснодарский край',
    link: krasnodarImage
  },
  {
    place: 'Остров Ольхон',
    link: olkhonImage
  }
];

//объект настроек валидации
export const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active',
};

//переменные попапа редактирования инфы профиля
export const profilePopup = document.querySelector('.popup_type_profile');
export const popupFormProfile = document.querySelector('.popup__form_edit_profile');
export const nameInput = popupFormProfile.querySelector('.popup__input_edit_name');
export const careerInput = popupFormProfile.querySelector('.popup__input_edit_career');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');

//переменные попапа добавления карточек
export const cardPopup = document.querySelector('.popup_type_card-add');
export const popupFormCard = document.querySelector('.popup__form_add_card');

//переменные попапа увеличения изображения
export const imagePopup = document.querySelector('.popup_type_picture');

//элемент, куда мы будем вставлять карточки
export const cardsList = document.querySelector('.elements__list');
