//переменные попапа редактирования инфы профиля
const popUpProfile = document.querySelector('.profile-popup');
const nameInput = popUpProfile.querySelector('.popup__info_edit_name');
const careerInput = popUpProfile.querySelector('.popup__info_edit_career');
const profileContainer = document.querySelector('.profile');
const editButton = profileContainer.querySelector('.profile__edit-button');
const profileName = profileContainer.querySelector('.profile__name');
const profileCareer = profileContainer.querySelector('.profile__career');
const popUpFormProfile = popUpProfile.querySelector('.popup__form');

//переменные попапа добавления карточек
const addButton = document.querySelector('.profile__add-button')
const popUpCard = document.querySelector('.card-popup');
const placeInput = popUpCard.querySelector('.popup__info_edit_place');
const linkInput = popUpCard.querySelector('.popup__info_edit_link');
const popUpFormCard = popUpCard.querySelector('.popup__form');

//переменная попапа открытия изображений
const popUpImage = document.querySelector('.image-zoom-popup');
const imageOpen = popUpImage.querySelector('.popup__image');
const captionImage = popUpImage.querySelector('.popup__caption');

//переменная кнопок закрытия
const popUpCloseButtons = document.querySelectorAll('.popup__close-button')

//переменные template карточек
const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.elements__list');

//функция отображения карточек
function createCard(cardInfo) {
  const newElement = cardTemplate.querySelector('.element').cloneNode(true);
  const newElementImage = newElement.querySelector('.element__image');
  const newElementTitle = newElement.querySelector('.element__title');
  newElementImage.src = cardInfo.link;
  newElementImage.alt = cardInfo.name;
  newElementTitle.textContent = cardInfo.name;
  newElement.querySelector('.element__like').addEventListener('click', likeCard);
  newElement.querySelector('.element__delete-button').addEventListener('click', deleteCard);
  newElementImage.addEventListener('click', () => openPopUpImage(newElementImage));
  return newElement;

  function openPopUpImage(newElementImage) {
    imageOpen.src = newElementImage.src;
    imageOpen.alt = newElementImage.alt;
    captionImage.textContent = newElementImage.alt;
    openPopUp(popUpImage);
  }
}


//добавление карточек из массивая
function addCardArray() {
  initialCards.forEach((item) => {
    renderCard(createCard(item));
  });
};


function renderCard(element) {
  cardsList.prepend(element);
};


//функция добавления новой карточки
function addNewCard() {
  const cardInfo = {
    name: placeInput.value,
    link: linkInput.value,
  };
  renderCard(createCard(cardInfo));
};


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

//функция открытия попапа просмотра изображений



//закрытие попапа
function closePopUp(popup) {
  popup.classList.remove('popup_opened');
}


//функция закрытия попапа при нажатии на крестик
popUpCloseButtons.forEach( function(item) {
  const popUp = item.closest('.popup');
  item.addEventListener('click', function() {
    closePopUp(popUp);
  });
});

//отправка формы попапа добавления карточек
function handleSubmitCardForm(evt) {
  evt.preventDefault();
  addNewCard(placeInput.value, linkInput.value);
  closePopUp(popUpCard);
}

//отправка формы редактирования информации профиля
function handleSubmitProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCareer.textContent = careerInput.value;
  closePopUp(popUpProfile);
}


// функция поставить-убрать лайк
function likeCard(event) {
  event.target.classList.toggle('element__like_active');
}

//функция удалить карточку
function deleteCard(event) {
  event.target.closest('.element').remove();
}


//события, при нажатии на кнопки
editButton.addEventListener('click', openPopUpProfile);
addButton.addEventListener('click', openPopUpCard);
popUpFormProfile.addEventListener('submit', handleSubmitProfileForm);
popUpFormCard.addEventListener('submit', handleSubmitCardForm);
addCardArray(); // вызов функции добавления карточек из массива
