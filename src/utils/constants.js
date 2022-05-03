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
export const profilePopup = '.popup_type_profile';
export const popupFormProfile = document.querySelector('.popup__form_edit_profile');
export const nameInput = popupFormProfile.querySelector('.popup__input_edit_name');
export const careerInput = popupFormProfile.querySelector('.popup__input_edit_career');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');

//переменные попапа добавления карточек
export const cardPopup = '.popup_type_card-add';
export const popupFormCard = document.querySelector('.popup__form_add_card');

//переменные попапа увеличения изображения
export const imagePopup = '.popup_type_picture';

//попап подтверждения удаления
export const confirmPopup = '.popup_type_confirm';

//переменные попапа изменения аватара
export const avatarPopup = '.popup_type_edit-avatar';
export const popupFormAvatar = document.querySelector('.popup__form_edit_avatar');
export const avatarEditButton = document.querySelector('.profile__avatar-container');

//элемент, куда мы будем вставлять карточки
export const cardsList = '.elements__list';
