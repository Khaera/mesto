let editButton = document.querySelector('.profile__edit-button');
let popUp = document.querySelector('.popup');
let closeButton = popUp.querySelector('.popup__close-button');
let profileContainer = document.querySelector('.profile');
let saveButton = popUp.querySelector('.popup__save-button');
let profileName = profileContainer.querySelector('.profile__name');
let profileCareer = profileContainer.querySelector('.profile__career');
let nameInput = popUp.querySelector('.popup__name');
let careerInput = popUp.querySelector('.popup__career');


function openPopUp() {
  popUp.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopUp);


function closePopUp() {
  popUp.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopUp);

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInput.getAttribute('value');
  careerInput.getAttribute('value');
  profileName.textContent = nameInput.value;
  profileCareer.textContent = careerInput.value;
  closePopUp();
}

popUp.addEventListener('submit', formSubmitHandler);


