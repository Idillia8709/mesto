import './index.css';
import {
  enableConfigPopup,
  editButton,
  addCardButton,
  formEditProfile,
  formAddCard,
  templateCard,
  formEditAvatar,
  editAvatarButton,
  selectorPopupEditProfile,
  selectorPopupAddCard,
  selectorPopupUpdataAvatar,
  selectorPopupDeleteCard,
  submitEditProfile,
  titleSubmitEditProfile,
  submitAddCard,
  titleSubmitAddCard,
  submitEditAvatar,
  titleSubmitEditAvatar
} from '../utils/constants.js';
import renderLoading from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithClarification from '../components/PopupWithClarification.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import { api } from '../components/Api.js';

let userId;

const editFormValidation = new FormValidator(enableConfigPopup, formEditProfile);
editFormValidation.enableValidation();
const addFormValidatin = new FormValidator(enableConfigPopup, formAddCard);
addFormValidatin.enableValidation();
const avatarEditFormValidation = new FormValidator(enableConfigPopup, formEditAvatar);
avatarEditFormValidation.enableValidation();
const imageCardPopup = new PopupWithImage('.popup_type_image');


const userInfo = new UserInfo({
  nameUserSelector: '.profile__title',
  jobUserSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});

const cardList = new Section({
  items: [],
  renderer: (item) => {
    createCard(item, userId);
  }
}, '.elements');

Promise.all([api.getCardList(), api.getUserInfo()])
  .then(([cards, userData]) => {
    userId = userData._id;
    cardList.getItems(cards);
    cardList.renderItems(cards);
    userInfo.setUserInfo(userData);
  })
  .catch(err => {
    console.log('Ошибка:', err.message);
  });

const profilePopup = new PopupWithForm(selectorPopupEditProfile, (inputValues) => {
  renderLoading(true, submitEditProfile, titleSubmitEditProfile);
  const userData = {
    name: inputValues['input-title'],
    about: inputValues['input-subtitle']
  }
  api.sendUserInfo(userData)
    .then(userData => {
      userInfo.setUserInfo(userData);
      profilePopup.close();
    })
    .catch(err => {
      console.log('Ошибка загрузки профиля:', err.message);
    })
    .finally(() => {
     renderLoading(false, submitEditProfile, titleSubmitEditProfile);
    })
},
  (inputList) => {
    const userData = userInfo.getUserInfo();
    inputList.forEach(input => {
      if (input.id === 'input-title') { input.value = userData.name }
      if (input.id === 'input-subtitle') { input.value = userData.about }
    })
  });

const updateAvatarPopup = new PopupWithForm(selectorPopupUpdataAvatar, (inputValues) => {
  renderLoading(true, submitEditAvatar, titleSubmitEditAvatar);
  const userData = {
    avatar: inputValues['input-url-avatar']
  }
  api.editUserAvatar(userData)
    .then(userData => {
      userInfo.setUserInfo(userData);
      updateAvatarPopup.close();

    })
    .catch(err => {
      console.log('Ошибка:', err.message)
    })
    .finally(() => {
      renderLoading(false, submitEditAvatar, titleSubmitEditAvatar);

    });
},
  (inputList) => {
    inputList.forEach(input => input.value = '')
  });

const cardPopup = new PopupWithForm(selectorPopupAddCard, (inputValues) => {
  renderLoading(true, submitAddCard,  titleSubmitAddCard);
  const card = {
    name: inputValues['input-name'],
    link: inputValues['input-image-link']
  }
  api.createCard(card)
    .then(card => {
      createCard(card, userId);
      cardPopup.close();
    })
    .catch(err => {
      console.log('Ошибка при загрузке карточки:', err.message);
    })
    .finally(() => {
      renderLoading(false, submitAddCard,  titleSubmitAddCard);
    })
},
  (inputList) => {
    inputList.forEach(input => input.value = '')
  }
);

const deleteCardPopup = new PopupWithClarification(selectorPopupDeleteCard, (cardId, card) => {
  api.deleteCard(cardId)
    .then(() => {
      card.deleteCard();
      deleteCardPopup.close()
    })
    .catch(err => {
      console.log('Ошибка удаления карточки:', err.message);
    });
});

function createCard(cardData, userId) {
  const card = new Card({
    cardData: cardData,
    userId: userId,
    template: templateCard,
    handleImageCardClick: () => imageCardPopup.open(cardData),
    handleDeleteClick: function (cardId) {
      deleteCardPopup.open(cardId, this);
    },
    handleLikeClick: (cardId) => {
      if (card.hasLike()) {
        api.removeLikeCard(cardId)
          .then(res => {
            card.updateСounterLike(res)
          })
          .catch(err => {
            console.log('Ошибка при установке like:', err.message);
          })
      } else api.installLikeCard(cardId)
        .then(res => {
          card.updateСounterLike(res)
        })
        .catch(err => {
          console.log('Ошибка при снятии like:', err.message);
        })
    }
  })
  const cardElement = card.getElement();
  return cardList.prependItem(cardElement);
}

editButton.addEventListener('click', openEditProfile);
addCardButton.addEventListener('click', showAddCardPopup);
editAvatarButton.addEventListener('click', showEditAvatarPopup);

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

function showEditAvatarPopup() {
  avatarEditFormValidation.setSubmitButtonState(false);
  avatarEditFormValidation.resetValidation();
  updateAvatarPopup.open();


}

