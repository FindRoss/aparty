export default class View {

  render(data) {
    if (!data || data.length === 0) return;

    this.data = data;
    const markup = this.generateMarkup();
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  clear() {
    this.parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner card__layout--middle">
        <div class="spinner__bg">
          <i class="spin fas fa-circle-notch"></i>
        </div>
      </div>
    `;

    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
};

