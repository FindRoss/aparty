import mapView from './view/mapView';
import searchView from './view/searchView';
import cardsView from './view/cardsView';
import * as model from './model';


const controlApartmentListing = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    cardsView.renderSpinner();

    await model.getApartListings(query);

    cardsView.render(model.state.listings);
    mapView.render(model.state.listings);
  } catch (error) {
    console.log('controlApartmentListing error', error);
  }
}

const init = function () {
  searchView.addHandlerSearch(controlApartmentListing);
  mapView.loadMap();
}
init();