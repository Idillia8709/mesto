import Popup from '../components/Popup.js';

export default
  class PopupWithForm extends Popup {
  constructor(selectorPopup, callbackSubmitForm, handleFormFields) {
    super(selectorPopup);
    this._form = this._element.querySelector('.popup__container');
    this._submitButton = this._form.querySelector('.popup__button-form');
    this._collbackSubmitForm = callbackSubmitForm;
    this._handleFormFields = handleFormFields;
    this._inputList = this._element.querySelectorAll('.popup__input');
    this._titleButton = this._submitButton.textContent
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
      this._collbackSubmitForm(this._getInputValues());
      this._submitButton.disabled = true;
    });
    super.setEventListeners();
  }

  loadingData(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...'
    } else
    this._submitButton.textContent = this._titleButton;
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