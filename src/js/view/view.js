export default class View {
  _data;

  render(data) {
    if (!data || data.length === 0) return;

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner card__layout--middle">
        <div class="spinner__bg">
          <i class="spin fas fa-circle-notch"></i>
        </div>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
};

