export const enableConfigPopup = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-form',
  inactiveButtonClass: 'popup__button-form_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const esc = 'Escape';
export const editButton = document.querySelector('.profile__button-edit');
export const addCardButton = document.querySelector('.profile__button-add');
export const editAvatarButton = document.querySelector('.profile__overlay');
export const formEditProfile = document.querySelector('.popup__container_form_edit');
export const formAddCard = document.querySelector('.popup__container_form_add');
export const formEditAvatar = document.querySelector('.popup__container_form_avatar');
export const templateCard = document.querySelector('.card-template');
export const selectorPopupEditProfile = '.popup_type_edit';
export const selectorPopupAddCard = '.popup_type_add';
export const selectorPopupUpdataAvatar = '.popup_type_avatar';
export const selectorPopupDeleteCard = '.popup_type_deleteCard';
export const submitEditProfile = document.querySelector('.popup__button-form_save_profile');
export const titleSubmitEditProfile = submitEditProfile.textContent;
export const submitAddCard = document.querySelector('.popup__button-form_create_card');
export const titleSubmitAddCard = submitEditProfile.textContent;
export const submitEditAvatar = document.querySelector('.popup__button-form_avatar');
export const titleSubmitEditAvatar = submitEditProfile.textContent;
