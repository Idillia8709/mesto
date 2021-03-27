import Popup from '../components/Popup.js';
export default 
class PopupWithImage extends Popup {
   constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._element.querySelector('.popup__image');
    this._popupTitle = this._element.querySelector('.popup__paragraph');
  }
  
  open(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupTitle.textContent = data.name;
    super.open();
 
  }
}