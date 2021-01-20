import Popup from './Popup.js';

export default class Card {
  _element;
  _popup;
  _popupImage;
  _popupTitle;

  constructor(name, link) {
    this._name = name;
    this._link = link;

    this._createCard();
    this._initListeners();
    this._initPopup();
  }

  _getTemplate() {
    return document.querySelector('.card-template').content.querySelector('.element').cloneNode(true);
  }

  _initPopup() {
    const popupElement = document.querySelector('.popup_type_image');
    this._popupImage = popupElement.querySelector('.popup__image');
    this._popupTitle = popupElement.querySelector('.popup__paragraph');
    this._popup = new Popup(popupElement);
  }
  
  _openPopup() {
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popupTitle.textContent = this._name;
    this._popup.open();
  }

  _initListeners() {
    this._cardLike.addEventListener('click', this._toggleLike);
    this._cardDelete.addEventListener('click', () => this._deleteCard());
    this._cardImage.addEventListener('click', () => this._openPopup());
  }

  _toggleLike(event) {
    event.target.classList.toggle('element__button-like_active_black')
  }

  _deleteCard() {
    this._element.remove();
  }
  
  _createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._cardName = this._element.querySelector('.element__title');
    this._cardLike = this._element.querySelector('.element__button-like');
    this._cardDelete = this._element.querySelector('.element__button-delete');
    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._cardName.textContent;

  }

  getElement() {
    return this._element;
  }
}
