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

//переменная попапа открытия изображений
const popUpImage = document.querySelector('.popup_type_picture');
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
  newElementImage.addEventListener('click', openPopUpImage);
  return newElement;
}

//функция открытия попапа картинок
function openPopUpImage(evt) {
  if (evt.target.classList.contains('element__image')) {
    const caption = evt.target.closest('.element').querySelector('.element__title').textContent;
    const imageLink = evt.target.src;
    imageOpen.src = imageLink;
    imageOpen.alt = caption;
    captionImage.textContent = caption;
    openPopUp(popUpImage);
  }
};

//добавление карточек из массивая
function addCardArray() {
  initialCards.forEach((item) => {
    renderCard(createCard(item), cardsList, true);
  });
};


function renderCard(element, container, toBeginning = true) {
  if (toBeginning === true) {
    cardsList.prepend(element); //карточки будут вставляться в начало
  } else {
    cardsList.append(element);
  }
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
popUpCloseButtons.forEach( function(item) {
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
