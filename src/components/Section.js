export default class Section {
  constructor({ items,  renderer }, containerSelector,) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  getItems(items) {
    this._items = items;
  }

  renderItems() {
    this._items.reverse().forEach(item => {
      this._renderer(item);
    });
    
  }

}