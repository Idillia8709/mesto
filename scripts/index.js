const overlays = document.querySelectorAll('.popup');
const cardTemplate = document.querySelector('.card-template');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const closeButtons = document.querySelectorAll('.popup__button-exit');
const editButton = document.querySelector('.profile__button-edit');
const addCardButton = document.querySelector('.profile__button-add');
const creatButton = document.querySelector('.popup__button-creat');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__input_title');
const jobInput = document.querySelector('.popup__input_subtitle');
const formEditProfile = document.querySelector('.popup__container_form_edit');
const formAddCard = document.querySelector('.popup__container_form_add');
const cardAdd = document.querySelector('.popup__button-form_create_card');
const cardElementsList = document.querySelector('.elements');
const image = document.querySelector('.popup__image');
const nameImage = document.querySelector('.popup__paragraph');

const enableConfigPopup = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-form',
  inactiveButtonClass: 'popup__button-form_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function clearForm(config) {
  connfig.form
}

function closePopupByEsc(event) {
  if (event.key === 'Escape') { 
    const popup = document.querySelector('.popup_opened');
    closePopup(popup); 
  } 
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}


function closePopupEsc(event) {
  if (event.key === 'Escape') {
    overlays.forEach(overlay => closePopup(overlay));
  }
}

function openCardPopup(name, link) {
  openPopup(popupImage);
  image.src = link;
  nameImage.textContent = name;
  image.alt = nameImage.textContent;
  }

function toggleLike(event) {
  event.target.classList.toggle('element__button-like_active_black')
}

function deleteCard(element) {
  element.remove();
}

function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true).content.querySelector('.element');
  const cardElementImage = cardElement.querySelector('.element__image');
  const cardElementName = cardElement.querySelector('.element__title');
  const cardElementLike = cardElement.querySelector('.element__button-like');
  const deleteElement = cardElement.querySelector('.element__button-delete');
  cardElementName.textContent = name;
  cardElementImage.src = link;
  cardElementImage.alt = cardElementName.textContent;
  cardElementLike.addEventListener('click', toggleLike);
  cardElementImage.addEventListener('click', () => openCardPopup(name, link));
  deleteElement.addEventListener('click', () => deleteCard(cardElement));
  return cardElement;
}

function addCard(container, cardElement) {
  container.prepend(cardElement);
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEdit);
}

function openEditProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  setButtonState(popupEdit.querySelector(enableConfigPopup.submitButtonSelector), true, enableConfigPopup);
  checkInputValidity(formEditProfile, nameInput, enableConfigPopup);
  checkInputValidity(formEditProfile, jobInput, enableConfigPopup);
  openPopup(popupEdit);
}

function render() {
  initialCards.reverse().forEach((listElement) => addCard(cardElementsList, createCard(listElement.name, listElement.link)));
  enableValidation(enableConfigPopup);
}

function addNewCard(event) {
  event.preventDefault();
  const name = document.querySelector('.popup__input_name');
  const link = document.querySelector('.popup__input_link');
  addCard(cardElementsList, createCard(name.value, link.value));
  formAddCard.reset();
  closePopup(popupAdd);
}

function showAddCardPopup() {
  const name = document.querySelector('.popup__input_name');
  const link = document.querySelector('.popup__input_link');
  setButtonState(cardAdd, false, enableConfigPopup);
  openPopup(popupAdd);
}

editButton.addEventListener('click', openEditProfile);
closeButtons.forEach(button => button.addEventListener('click', () => closePopup(button.closest('.popup'))));
overlays.forEach((overlay) => {
   overlay.addEventListener('click', (event) => {
     if (overlay === event.target) {
       closePopup(overlay);
     }
   })
 });
formEditProfile.addEventListener('submit', formSubmitHandler);
window.addEventListener('load', render);
addCardButton.addEventListener('click', showAddCardPopup);
formAddCard.addEventListener('submit', addNewCard);
