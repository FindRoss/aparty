import mapView from './view/mapView';
import popupsView from './view/popupsView';
import searchView from './view/searchView';
import cardsView from './view/cardsView';
import placeCardView from './view/placeCardView';
import * as model from './model';


const controlApartmentListing = async function (query) {
  cardsView.renderSpinner();

  try {
    await model.getApartListings(query);
  } catch (error) {
    // how to get rid of the word ERROR on the errors.
    cardsView.renderError(`${error} ${query}`);
    return;
  }

  console.log(model.state.listings)
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
  // Perform this in the model and update the state. 
  // DO I EVEN NEED TO DO THIS? I dont think so.
  model.highlightApartmentListing(id);
  cardsView.update(model.state.listings);

  // console.log(model.state.listings)
  // cardsView.highlightCard(id);
  // now I have the card, I can update the UI to show this card.
  // Update method can be found in Forkify View.js file. 
  // and HOW TO move to the correct card?
}


const init = function () {
  searchView.addHandlerSearch(handleSearch);
  placeCardView.addClickHandler(handlePlacecardClick);
  mapView.loadMap();
}
init();