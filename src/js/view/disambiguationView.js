import View from './view.js';

class DisambiguationView extends View {

  constructor() {
    super();
    this.parentElement = document.querySelector('.cards');
  }

  generateMarkup() {
    let foo = this.data.map(d => {
      console.log(d);
      return `
        <div class="placecard" data-location="${d}">
          <div class="placecard__content">${d}</div>
        </div>
      `;
    }).join('');

    return `
      <div class="placecards">
        ${foo}
      </div>
    `;
  }
}

export default new DisambiguationView();