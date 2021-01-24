export default class View {

  render(data) {
    if (!data || data.length === 0) this.renderError().bind(this);

    this.data = data;
    const markup = this.generateMarkup();
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  clear() {
    this.parentElement.innerHTML = '';
  }

  renderError() {
    console.log('sorry error!');
    const markup = `
      <div class="">
        <h3>${this.errorMessage}</h3>
      </div>
    `;

    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
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

