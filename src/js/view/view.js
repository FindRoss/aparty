export default class View {

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this.data = data;
    const markup = this.generateMarkup();
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this.data = data;

    const newMarkup = this.generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElementsArr = Array.from(newDOM.querySelectorAll('*'));
    const curElementsArr = Array.from(this.parentElement.querySelectorAll('*'));


    newElementsArr.forEach((newEl, i) => {
      const curEl = curElementsArr[i];

      // checking for a change in className
      if (newEl.className !== curEl.className) {
        curEl.className = newEl.className;
        // curEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    })
  }

  findChildElementWithId(id) {
    if (!id) return;
    let children = this.parentElement.children;
    let childArray = Array.from(children);
    let child = childArray.filter(c => id === c.dataset.id);
    if (child.length === 0) return;
    return child[0];
  }

  clear() {
    this.parentElement.innerHTML = '';
  }

  renderError(message) {
    this.errorMessage = message;

    const markup = `
      <div class="message intro">
        <i class="fas fa-exclamation-triangle"></i>
        <div class="message__content">
          ${this.errorMessage}
        </div>
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

