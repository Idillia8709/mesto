import './index.css';
import {
  enableConfigPopup,
  initialCards,
  editButton,
  addCardButton,
  formEditProfile,
  formAddCard,
  templateCard
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

const imageCardPopup = new PopupWithImage('.popup_type_image');
const userInfo = new UserInfo({
  nameUserSelector: '.profile__title',
  jobUserSelector: '.profile__subtitle'
});
const editFormValidation = new FormValidator(enableConfigPopup, formEditProfile);
editFormValidation.enableValidation();
const addFormValidatin = new FormValidator(enableConfigPopup, formAddCard);
addFormValidatin.enableValidation();

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    createCard(item.name, item.link);
  }
}, '.elements');
cardList.renderItems();

const cardPopup = new PopupWithForm('.popup_type_add', (inputValues) => {
  const name = inputValues['input-name'];
  const link = inputValues['input-image-link'];
  createCard(name, link);
},
  (inputList) => {
    inputList.forEach(input => input.value = '')
  }
);

const profilePopup = new PopupWithForm('.popup_type_edit', (inputValues) => {
  const userName = inputValues['input-title'];
  const userJob = inputValues['input-subtitle'];
  userInfo.setUserInfo(userName, userJob);
},
  (inputList) => {
    const userData = userInfo.getUserInfo();
    inputList.forEach(input => {
      if (input.id === 'input-title') { input.value = userData.userName }
      if (input.id === 'input-subtitle') { input.value = userData.userJob }
    }
    )
  }
);

function createCard(name, link) {
  const card = new Card(name, link, templateCard, imageCardPopup);
  const cardElement = card.getElement();
  return cardList.addItem(cardElement);

}

function openEditProfile() {
  editFormValidation.setSubmitButtonState(true);
  editFormValidation.resetValidation();
  profilePopup.open();
}

function showAddCardPopup() {
  addFormValidatin.setSubmitButtonState(false);
  addFormValidatin.resetValidation();
  cardPopup.open();
}

editButton.addEventListener('click', openEditProfile);
addCardButton.addEventListener('click', showAddCardPopup)