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
const popupAdd = document.querySelector('.popup_type_add');
const cardPopup = new Popup(popupAdd);
const popupEditProfile = document.querySelector('.popup_type_edit');
const profilePopup =  new Popup(popupEditProfile);


function formSubmitHandler(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  profilePopup.close();
}

function openEditProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  profilePopup.open();
  const editFormValidation = new FormValidator(enableConfigPopup, formEditProfile);
  editFormValidation.enableValidation();
}

function addCard(container, cardElement) {
  container.prepend(cardElement);
}

function render() {
  initialCards.reverse().forEach(({ name, link }) => {
    const card = new Card(name, link);
    addCard(cardListElements, card.getElement());

  })
}

function addCardByTheUser(event) {
  event.preventDefault();
  // const name = document.querySelector('.popup__input_name');
  // const link = document.querySelector('.popup__input_link');
  const card = new Card(name.value, link.value);
  addCard(cardListElements, card.getElement());
  formAddCard.reset();
  cardPopup.close();
}

function showAddCardPopup() {
  const addFormValidatin = new FormValidator(enableConfigPopup, formAddCard);
  addFormValidatin.enableValidation();
  name.value = '';
  link.value = '';
  cardPopup.open();
}

editButton.addEventListener('click', openEditProfile);
window.addEventListener('load', render);
addCardButton.addEventListener('click', showAddCardPopup);
formAddCard.addEventListener('submit', addCardByTheUser);
formEditProfile.addEventListener('submit', formSubmitHandler);

