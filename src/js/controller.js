import mapView from './view/mapView';
import searchView from './view/searchView';
import cardsView from './view/cardsView';
import * as model from './model';


const controlApartmentListing = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    console.log('at least this is working... until here anyway');
    cardsView.renderSpinner();

    await model.getApartListings(query);

    mapView.render(model.state.listings);
    cardsView.render(model.state.listings);
  } catch (error) {
    console.log('controlApartmentListing error', error);
  }
}

const init = function () {
  searchView.addHandlerSearch(controlApartmentListing);
  mapView.loadMap();
}
init();