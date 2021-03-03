import { enableConfigPopup, initialCards } from './constants.js';
import Card from './Card.js';
import Popup from './Popup.js';
import FormValidator from './FormValidator.js';


const editButton = document.querySelector('.profile__button-edit');
const addCardButton = document.querySelector('.profile__button-add');
const nameInput = document.querySelector('.popup__input_title');
const jobInput = document.querySelector('.popup__input_subtitle');
const formEditProfile = document.querySelector('.popup__container_form_edit');
const formAddCard = document.querySelector('.popup__container_form_add');
const cardListElements = document.querySelector('.elements');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const name = document.querySelector('.popup__input_name');
const link = document.querySelector('.popup__input_link');
const templateCard = document.querySelector('.card-template');
const popupAddCard = document.querySelector('.popup_type_add');
const cardPopup = new Popup(popupAddCard);
const popupEditProfile = document.querySelector('.popup_type_edit');
const profilePopup =  new Popup(popupEditProfile);
const popupImage = document.querySelector('.popup_type_image');
const imageCardPopup = new Popup(popupImage);
const editFormValidation = new FormValidator(enableConfigPopup, formEditProfile);
editFormValidation.enableValidation();
const addFormValidatin = new FormValidator(enableConfigPopup, formAddCard);
addFormValidatin.enableValidation();


function submitProfileForm(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  profilePopup.close();
}

function openEditProfile() {
  editFormValidation.setSubmitButtonState(true);
  editFormValidation.resetValidation();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  profilePopup.open();
  
}

function addCard(container, cardElement) {
  container.prepend(cardElement);
}

function render() {
  initialCards.reverse().forEach(({ name, link }) => {
    const card = new Card(name, link, templateCard, imageCardPopup);
    addCard(cardListElements, card.getElement());

  })
}

function addCardByTheUser(event) {
  event.preventDefault();
  const card = new Card(name.value, link.value, templateCard, imageCardPopup);
  addCard(cardListElements, card.getElement());
  cardPopup.close();
}

function showAddCardPopup() {
  addFormValidatin.setSubmitButtonState(false);
  addFormValidatin.resetValidation();
  formAddCard.reset();
  cardPopup.open();
  
}

editButton.addEventListener('click', openEditProfile);
window.addEventListener('load', render);
addCardButton.addEventListener('click', showAddCardPopup);
formAddCard.addEventListener('submit', addCardByTheUser);
formEditProfile.addEventListener('submit', submitProfileForm);
