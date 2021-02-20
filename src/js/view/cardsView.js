import View from './view.js';


class CardsView extends View {
  constructor() {
    super()
    this.parentElement = document.querySelector('.cards');
  }

  highlightCard(id) {
    let [card] = this.data.filter(d => d.id === id);
    console.log(card);
  }

  generateMarkup() {
    return this.data.map(this.generateCardMarkup).join('');
  }

  generateCardMarkup(d) {
    return ` 
      <div class="card ${d.highlighted ? 'highlighted' : ''}" data-id=${d.id}>
        <div class="card--image" style="background-image: url(${d.image})">
        </div>
        <div class="card--body">
          <h2 class="card--body__title">${d.address}</h2>
          <div class="card--details">
            <div class="card--details__price">£${d.price}</div>
            <div class="card--details__icons">
              <div>
                <span class="card--icon">
                  <i class="fas fa-bed"></i><span>${d.bedrooms}</span>
                </span>
                <span class="card--icon">
                  <i class="fas fa-door-open"></i><span>2</span>
                </span>
                <span class="card--icon">
                  <i class="fas fa-ruler-combined"></i><span>70m</span>
                </span>
              </div>
              <div class="card--bookmark">
                <i class="far fa-bookmark"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
  }
}

export default new CardsView(); 