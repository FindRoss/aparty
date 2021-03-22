import View from './view.js';


class CardView extends View {
  constructor() {
    super()
    this.parentElement = document.querySelector('.cards');
  }

  // Handle clicks on cards bookmark icon
  addClickHandler(handler) {

    this.parentElement.addEventListener('click', function (e) {
      const bookmark = e.target.closest('.card--details__bookmark');
      if (!bookmark) return;
      const card = bookmark.closest('.card')
      const cardID = card.getAttribute('data-id');

      handler(cardID);
    })
  }

  generateMarkup() {
    return this.data.map(this.generateCardMarkup).join('');
  }

  generateCardMarkup(d) {
    return ` 
      <div class="card" data-id=${d.id}>
        <div class="card--image" style="background-image: url(${d.image})">
        </div>
        <div class="card--body">
          <span class="card--body__type">${d.type === '' ? 'property' : d.type}</span>
          <h2 class="card--body__title">${d.address}</h2>
          <div class="card--details">
            <div class="card--details__price">£${d.price}</div>
            <div class="card--details__bookmark">
              <button>
                <i class="${d.bookmark ? 'fas' : 'far'} fa-bookmark"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      `;
  }
}

export default new CardView();