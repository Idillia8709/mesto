const popup = document.querySelector('.popup');
const popupExitButton = document.querySelector('.popup__button-exit');
const editButton = document.querySelector('.profile__button-edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup_margin-input-title');
const jobInput = document.querySelector('.popup_margin-input-subtitle');
const form = document.querySelector('.popup__container');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function exitPopup() {
  popup.classList.remove('popup_opened')
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  exitPopup();
}

editButton.addEventListener('click', openPopup);
popupExitButton.addEventListener('click', exitPopup);
form.addEventListener('submit', formSubmitHandler);