import { esc } from './constants.js'
export default class Popup {
  constructor(element) {
    this._element = element;
    this._closeBtn = element.querySelector('.popup__button-exit');
    this.close = this.close.bind(this);
    this._closeByEsc = this._closeByEsc.bind(this);
    this._closeByOverlayClick = this._closeByOverlayClick.bind(this);
    this._initListeners();
  }

  _closeByEsc(event) {
    if (event.key === esc) {
      this.close();
    }
  }

  _closeByOverlayClick(event) {
    if (event.target === this._element) {
      this.close();
    }
  }
  
  _initListeners() {
    this._closeBtn.addEventListener('click', this.close);
    this._element.addEventListener('mousedown', this._closeByOverlayClick);
  }
  
  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEsc);
  }
  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeByEsc);
  }
}