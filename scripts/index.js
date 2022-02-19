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
const popUpFormCard = popUpCard.querySelector('.popup__form');


//переменная кнопок закрытия
const popUpCloseButtons = document.querySelectorAll('.popup__close-button')

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.elements__list');







//функция отображения карточек
function createCard(card) {
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);
  const newCardImage = newCard.querySelector('.element__image');
  const newCardTitle = newCard.querySelector('.element__title');

  newCardImage.src = card.link;
  newCardImage.alt = card.name;
  newCardTitle.textContent = card.name;

  newCard.querySelector('.element__like').addEventListener('click', likeCard);
  newCard.querySelector('.element__delete-button').addEventListener('click', deleteCard);


  return newCard;
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

//функция отправки формы попапа карточек
function cardSubmit(evt) {
  evt.preventDefault();
  addNewCard(placeInput.value, linkInput.value)
  closePopUp(popUpCard);
}

//функция добавления новой карточки
function addNewCard() {
  const cardInfo = {
    name: placeInput.value,
    link: linkInput.value,
  };
  renderCard(createCard(cardInfo));
};




popUpFormCard.addEventListener('submit', cardSubmit);






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

addCardArray();

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

//переменная кнопок лайков
const popUpLikeButton = document.querySelector('.element__like');


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
popUpFormProfile.addEventListener('submit', formSubmitHandler);

