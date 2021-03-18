import { esc } from '../utils/constants.js'
export default class Popup {
  constructor(element) {
    this._element = element;
    this._closeBtn = element.querySelector('.popup__button-exit');
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClickClose = this._handleOverlayClickClose.bind(this);
    this.setEventListeners();
  }

  _handleEscClose(event) {
    if (event.key === esc) {
      this.close();
    }
  }

  _handleOverlayClickClose(event) {
    if (event.target === this._element) {
      this.close();
    }
  }
  
  setEventListeners() {
    this._closeBtn.addEventListener('click', this.close);
    this._element.addEventListener('mousedown', this._handleOverlayClickClose);
  }
  
  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}