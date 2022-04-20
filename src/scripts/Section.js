export class Section {
  constructor( {items, renderer}, containerSelector ) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._renderedItems.forEach((item) => this.addItem(item));
  }

  addItem(cardData) {
    const card = this._renderer(cardData)
    this._container.prepend(card);
  }
}
