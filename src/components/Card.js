export default class Card {
  constructor({
    cardData,
    userId,
    template,
    handleImageCardClick,
    handleDeleteClick,
    handleLikeClick
  }) {
    this._data = cardData;
    this._name = this._data.name;
    this._link = this._data.link;
    this._cardId = this._data._id;
    this._cardUserId = this._data.owner._id;
    this._id = userId;
    this._templateCard = template;
    this._handleImageCardClick = handleImageCardClick;
    this._handleDeleteCardClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this._createCard();
    
  }

  _getTemplate() {
    return this._templateCard.content.querySelector('.element').cloneNode(true);
    
  }

  _handleInitListeners() {
    this._cardLike.addEventListener('click', () => this._handleLikeClick(this._cardId));
    this._cardDelete.addEventListener('click', () => this._handleDeleteCardClick(this._cardId));
    this._cardImage.addEventListener('click', () => this._handleImageCardClick(this._data));
  }

  _toggleLike() {
    if (this.hasLike()) {
      this._cardLike.classList.add('element__button-like_active_black')
    } else {
      this._cardLike.classList.remove('element__button-like_active_black')
    }
  }

  hasLike() {
    return this._data.likes.some( like => like._id === this._id);
  }

  updateСounterLike(data) {
    this._data = data;
    this._counterLike.textContent = this._data.likes.length;
    this._toggleLike();


  }


  _displayButtonDelete() {
    if (this._id !== this._cardUserId) { this._cardDelete.remove() }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._cardName = this._element.querySelector('.element__title');
    this._cardLike = this._element.querySelector('.element__button-like');
    this._counterLike = this._element.querySelector('.element__number-of-like');
    this._cardDelete = this._element.querySelector('.element__button-delete');
    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._cardName.textContent;
    this._displayButtonDelete();
    this.updateСounterLike(this._data);
    this._handleInitListeners();
  }

  getElement() {
    return this._element;
  }
}
