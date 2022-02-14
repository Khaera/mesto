let editButton = document.querySelector('.profile__edit-button');
let popUp = document.querySelector('.popup');
let closeButton = popUp.querySelector('.popup__close-button');
let profileContainer = document.querySelector('.profile');
let profileName = profileContainer.querySelector('.profile__name');
let profileCareer = profileContainer.querySelector('.profile__career');
let nameInput = popUp.querySelector('.popup__info_edit_name');
let careerInput = popUp.querySelector('.popup__info_edit_career');



function openPopUp() {
  popUp.classList.add('popup_opened');
  nameInput.setAttribute('value', profileName.textContent);
  careerInput.setAttribute('value', profileCareer.textContent);
}


function closePopUp() {
  popUp.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCareer.textContent = careerInput.value;
  closePopUp();
}

closeButton.addEventListener('click', closePopUp);
editButton.addEventListener('click', openPopUp);
popUp.addEventListener('submit', formSubmitHandler);




