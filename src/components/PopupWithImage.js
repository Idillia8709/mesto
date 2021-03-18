import Popup from '../components/Popup.js';
export default 
class PopupWithImage extends Popup {
   constructor(element) {
    super(element);
    this._initPopup();
  }

  _initPopup() {
    const popupElement = document.querySelector('.popup_type_image');
    this._popupImage = popupElement.querySelector('.popup__image');
    this._popupTitle = popupElement.querySelector('.popup__paragraph');
  }
  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupTitle.textContent = name;
    super.open();
 
  }
}