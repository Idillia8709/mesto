export default class Popup {
  constructor(element) {
    this._element = element;
    this._closeBtn = element.querySelector('.popup__button-exit');
    this._initListeners();
  }

  _closeByEsc(event) {
    if (event.key === 'Escape') {
      this._close();
    }
  }

  _close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeByEsc);
  }

  _closeByOverlayClick(event) {
    if (event.target === this._element) {
      this._close();
    }
  }

  _initListeners() {
    this._closeBtn.addEventListener('click', () => this._close());
    this._element.addEventListener('click', (event) => this._closeByOverlayClick(event));
  }

  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', (event) => this._closeByEsc(event));
  }
}
