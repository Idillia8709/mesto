const cardTemplate = document.querySelector('.card-template');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const closeButtons = document.querySelectorAll('.popup__button-exit');
const editButton = document.querySelector('.profile__button-edit');
const addButton = document.querySelector('.profile__button-add');
const creatButton = document.querySelector('.popup__button-creat');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__input_title');
const jobInput = document.querySelector('.popup__input_subtitle');
const formEditProfile = document.querySelector('.popup__container_form_edit');
const formAddCard = document.querySelector('.popup__container_form_add');
const cardAdd = document.querySelector('.popup__button-form_create_card');
const cardElementsList =  document.querySelector('.elements');






const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 



function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup() {
  const popup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');
}

function openCardPopup(name, link) {
  openPopup(popupImage);
  document.querySelector('.popup__image').src = link;
  document.querySelector('.popup__paragraph').textContent = name;
  
}

function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true).content.querySelector('.element');
  const cardElementImage = cardElement.querySelector('.element__image');
  const cardElementName =  cardElement.querySelector('.element__title');
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

function addCard(container, cardElement, addToTop) {
    if (addToTop) {
    container.prepend(cardElement);
     } else {
     container.appendChild(cardElement);
  } 
 }

function formSubmitHandler(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

function openEditProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEdit);
}

function render() {
  initialCards.forEach((listElement) => addCard(cardElementsList, createCard(listElement.name, listElement.link), false)); 
}

function toggleLike(event) {
  event.target.classList.toggle('element__button-like_active_black')
}

function addNewCard(event) {
  event.preventDefault();
  const name = document.querySelector('.popup__input_name');
  const link = document.querySelector('.popup__input_link');
  addCard(cardElementsList, createCard(name.value, link.value), true);
  closePopup();
}

function deleteCard(element) {
  element.remove();
}


editButton.addEventListener('click', openEditProfile);
closeButtons.forEach(button => button.addEventListener('click', closePopup));
formEditProfile.addEventListener('submit', formSubmitHandler);
window.addEventListener('load', render);
addButton.addEventListener('click', () => openPopup(popupAdd));
formAddCard.addEventListener('submit', addNewCard);

 
 











 