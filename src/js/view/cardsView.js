import View from './view.js';


class CardsView extends View {
  constructor() {
    super()
    this.parentElement = document.querySelector('.cards');
  }

  // highlightCard(id) {
  //   let [card] = this.data.filter(d => d.id === id);
  // }



  generateMarkup() {
    return this.data.map(this.generateCardMarkup).join('');
  }

  generateCardMarkup(d) {
    return ` 
      <div class="card ${d.highlighted ? 'highlighted' : ''}" data-id=${d.id}>
        <div class="card--image" style="background-image: url(${d.image})">
        </div>
        <div class="card--body">
          <span class="card--body__type">${d.type === '' ? 'property' : d.type}</span>
          <h2 class="card--body__title">${d.address}</h2>
          <div class="card--details">
            <div class="card--details__price">£${d.price}</div>
            <div class="card--details__bookmark">
              <i class="far fa-bookmark"></i>
            </div>
          </div>
        </div>
      </div>
      `;
  }
}

export default new CardsView();