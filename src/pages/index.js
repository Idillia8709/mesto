import './index.css';
import {
  enableConfigPopup,
  initialCards,
  editButton,
  addCardButton,
  formEditProfile,
  formAddCard,
  templateCard,
  popupImage
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

const imageCardPopup = new PopupWithImage(popupImage);
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
    const card = new Card(item.name, item.link, templateCard, imageCardPopup);
    const cardElement = card.getElement();
    cardList.addItem(cardElement);
  }
}, '.elements');
cardList.renderItems();

const popupAddCard = document.querySelector('.popup_type_add');
const cardPopup = new PopupWithForm(popupAddCard, (inputValues) => {
  const name = inputValues['input-name'];
  const link = inputValues['input-image-link'];
  const card = new Card(name, link, templateCard, imageCardPopup);
  const cardElement = card.getElement();
  cardList.addItem(cardElement);
},
  (inputList) => {
    inputList.forEach(input => input.value = '')
  }
);

const popupEditProfile = document.querySelector('.popup_type_edit');
const profilePopup = new PopupWithForm(popupEditProfile, (inputValues) => {
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