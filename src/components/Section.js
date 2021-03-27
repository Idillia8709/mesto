export default class Section {
  constructor({ items,  renderer }, containerSelector,) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  appAddItem(element) {
    this._container.append(element);
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