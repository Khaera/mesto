let editButton = document.querySelector('.profile__edit-button');
let popUp = document.querySelector('.popup');
let closeButton = popUp.querySelector('.popup__close-button');
let profileContainer = document.querySelector('.profile');
let saveButton = popUp.querySelector('.popup__save-button');
let profileName = profileContainer.querySelector('.profile__name');
let profileCareer = profileContainer.querySelector('.profile__career');
let nameInput = popUp.querySelector('.popup__name');
let jobInput = popUp.querySelector('.popup__job');

function openPopUp() {
  editButton.addEventListener('click', function() {
  popUp.classList.add('popup_opened');
})
};

openPopUp();


function closePopUp() {
  closeButton.addEventListener('click', function() {
  popUp.classList.remove('popup_opened')
})
};

closePopUp();

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  console.log(profileName);
  profileCareer.textContent = jobInput.value;
  closePopUp();
};

popUp.addEventListener('submit', formSubmitHandler);
