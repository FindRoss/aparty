import View from './view.js';

class DisambiguationView extends View {

  constructor() {
    super();
    this.parentElement = document.querySelector('.cards');
  }

  generateMarkup() {
    let foo = this.data.map(d => {

      return `
        <div class="placecard" data-location="${d}">
          <div class="placecard__content">${d}</div>
        </div>
      `;
    }).join('');

    return `
      <div class="message">
        <i class="fas fa-search"></i>
        <div class="message__content">
          We would like to narrow down your search a bit.
        </div>
      </div>
      <div class="placecards">
        ${foo}
      </div>
    `;
  }
}

export default new DisambiguationView();