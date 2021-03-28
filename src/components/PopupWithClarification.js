import Popup from './Popup.js';

export default
  class PopupWithClarification extends Popup {
  constructor(selectorPopup, callbackSubmitForm) {
    super(selectorPopup);
    this._form = this._element.querySelector('.popup__container');
    this._submitButton = this._form.querySelector('.popup__button-form');
    this._callbackSubmitForm = callbackSubmitForm
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.addEventListener('submit', (event) => {
      event.preventDefault();
      this._callbackSubmitForm(this._id, this._deleteElement);
      
    })
  }

  open(cardId, card) {
    super.open()
    this._deleteElement = card;
    this._id = cardId
  }
}
