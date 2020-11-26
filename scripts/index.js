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
const cardElementsList = document.querySelector('.elements');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openCardPopup(name, link) {
  openPopup(popupImage);
  document.querySelector('.popup__image').src = link;
  document.querySelector('.popup__paragraph').textContent = name;
  document.querySelector('.popopup__image').alt =  document.querySelector('.popup__paragraph').textContent;
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
  openPopup(popupEdit);
}

function render() {
  initialCards.reverse().forEach((listElement) => addCard(cardElementsList, createCard(listElement.name, listElement.link)));
}

function addNewCard(event) {
  event.preventDefault();
  const name = document.querySelector('.popup__input_name');
  const link = document.querySelector('.popup__input_link');
  addCard(cardElementsList, createCard(name.value, link.value));
  closePopup(popupAdd);
}

editButton.addEventListener('click', openEditProfile);
closeButtons.forEach(button => button.addEventListener('click', () => closePopup(button.closest('.popup'))));
formEditProfile.addEventListener('submit', formSubmitHandler);
window.addEventListener('load', render);
addButton.addEventListener('click', () => openPopup(popupAdd));
formAddCard.addEventListener('submit', addNewCard);