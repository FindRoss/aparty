import mapView from './view/mapView';
import popupsView from './view/popupsView';
import searchView from './view/searchView';
import cardsView from './view/cardsView';
import placeCardView from './view/placeCardView';
import disasmbiguationView from './view/disambiguationView';
import logoView from './view/logoView';

import * as model from './model';


const controlApartmentListing = async function (query) {
  cardsView.renderSpinner();

  try {
    await model.getApartListings(query);
  } catch (error) {

    if (error.message === 'disambiguation') {
      disasmbiguationView.render(model.state.disambiguation);
      return placeCardView.addClickHandler(handlePlacecardClick);
    }

    cardsView.renderError(error.message);
  }

  cardsView.render(model.state.listings);
  mapView.render(model.state.listings);
  popupsView.addClickHandler(handlePopupClick);
}

const handleSearch = function () {
  const query = searchView.getQuery();
  if (!query) return;

  return controlApartmentListing(query);
}

const handlePlacecardClick = function (i) {
  let place = placeCardView.getLocation(i);
  searchView.clearInput();
  return controlApartmentListing(place);
}

const handlePopupClick = function (id) {
  // Get the card with the id from the popup.
  let card = cardsView.findChildElementWithId(id);

  // Scroll the card into view.
  card.scrollIntoView({ behavior: "smooth", block: "center" });

  // Add style to card.
  card.classList.add('highlighted');

  // Remove style from card after short delay.
  setTimeout(() => {
    card.classList.remove('highlighted');
  }, 1500);
}

const init = function () {
  searchView.addHandlerSearch(handleSearch);
  placeCardView.addClickHandler(handlePlacecardClick);
  mapView.loadMap();
  logoView.setHomepagePage();
}
init();