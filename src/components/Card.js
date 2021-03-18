export default class Card {
  constructor(name, link, templateCard, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateCard = templateCard;
    this._handleCardClick = handleCardClick;

    this._createCard();
    this._initListeners();
    }

  _getTemplate() {
    return this._templateCard.content.querySelector('.element').cloneNode(true);
  }

   _initListeners() {
    this._cardLike.addEventListener('click', this._toggleLike);
    this._cardDelete.addEventListener('click', () => this._deleteCard());
    this._cardImage.addEventListener('click', () => this._handleCardClick.open(this._name, this._link));
  }

  _toggleLike(event) {
    event.target.classList.toggle('element__button-like_active_black')
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;

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
