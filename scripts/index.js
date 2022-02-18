//переменные попапа редактирования инфы профиля
let popUpProfile = document.querySelector('.profile-popup');
const nameInput = popUpProfile.querySelector('.popup__info_edit_name');
const careerInput = popUpProfile.querySelector('.popup__info_edit_career');
let profileContainer = document.querySelector('.profile');
const editButton = profileContainer.querySelector('.profile__edit-button');
let profileName = profileContainer.querySelector('.profile__name');
let profileCareer = profileContainer.querySelector('.profile__career');
let popUpFormProfile = popUpProfile.querySelector('.popup__form');

//переменные попапа добавления карточек
const addButton = document.querySelector('.profile__add-button')
let popUpCard = document.querySelector('.card-popup');
const placeInput = popUpCard.querySelector('.popup__info_edit_place');
const linkInput = popUpCard.querySelector('.popup__info_edit_link');
const cardLikeButtons = document.querySelectorAll('.element__like');

//переменная кнопок закрытия
const popUpCloseButtons = document.querySelectorAll('.popup__close-button')



//переменная кнопок лайков
const popUpLikeButtons = document.querySelectorAll('.element__like');



//функция открытия попапов
function openPopUp(popup) {
  popup.classList.add('popup_opened');
}


//функция открытия попапа редактирования профиля
function openPopUpProfile() {
  nameInput.value = profileName.textContent;  //добавления имени из данных профиля в поле ввода формы
  careerInput.value = profileCareer.textContent;   //добавления рода деятельности из данных профиля в поле ввода формы
  openPopUp(popUpProfile)
}


//функция открытия попапа добавления карточек
function openPopUpCard() {
  placeInput.value = "";
  linkInput.value = "";
  openPopUp(popUpCard)
}


//закрытие попапа
function closePopUp(popup) {
  popup.classList.remove('popup_opened');
}



//функция закрытия попапа при нажатии на крестик
popUpCloseButtons.forEach( function(item) {
  const CloseButton = item.closest('.popup');
  item.addEventListener('click', function() {
    closePopUp(CloseButton);
  });
});


//отправка формы редактирования информации профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCareer.textContent = careerInput.value;
  closePopUp(popUpProfile);
}

//функция поставить-убрать лайк
  popUpLikeButtons.forEach( function(item) {
    const LikeButton = item.closest('.element');
    item.addEventListener('click', function(evt) {
      evt.target.classList.toggle('element__like_active');
    })
  });



//события, при нажатии на кнопки
editButton.addEventListener('click', openPopUpProfile);
addButton.addEventListener('click', openPopUpCard);
popUpFormProfile.addEventListener('submit', formSubmitHandler);
