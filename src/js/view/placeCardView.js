class PlaceCardView {
  constructor() {
    this.cards = document.querySelectorAll('.placecard');
  }

  getLocation(index) {
    let cardplace = this.cards[index];
    return cardplace.dataset.location;
  }

  addClickHandler(handler) {
    this.cards.forEach((card, index) => {
      card.addEventListener('click', () => handler(index))
    });
  }
}

export default new PlaceCardView(); 