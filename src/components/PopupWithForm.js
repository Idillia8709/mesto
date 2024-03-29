import Popup from '../components/Popup.js';

export default
  class PopupWithForm extends Popup {
  constructor(selectorPopup, callbackSubmitForm, handleFormFields) {
    super(selectorPopup);
    this._form = this._element.querySelector('.popup__container');
    this._submitButton = this._form.querySelector('.popup__button-form');
    this._callbackSubmitForm = callbackSubmitForm;
    this._handleFormFields = handleFormFields;
    this._inputList = this._element.querySelectorAll('.popup__input');
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._element.addEventListener('submit', (event) => {
      event.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
      this._submitButton.disabled = true;
    });
    super.setEventListeners();
  }
  
  open() {
    this._handleFormFields(this._inputList);
    super.open();
  }


  close() {
    super.close();
    this._form.reset();
  }


}