import mapView from './view/mapView';
import popupsView from './view/popupsView';
import searchView from './view/searchView';
import cardView from './view/cardView';
import placeCardView from './view/placeCardView';
import disasmbiguationView from './view/disambiguationView';
import logoView from './view/logoView';

import * as model from './model';


const controlApartmentListing = async function (query) {
  cardView.renderSpinner();

  try {
    await model.getApartListings(query);
  } catch (error) {

    if (error.message === 'disambiguation') {
      disasmbiguationView.render(model.state.disambiguation);
      return placeCardView.addClickHandler(handlePlacecardClick);
    }

    cardView.renderError(error.message);
  }

  cardView.render(model.state.listings);
  cardView.addClickHandler(controlBookmarks);
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
  let card = cardView.findChildElementWithId(id);

  // Scroll the card into view.
  card.scrollIntoView({ behavior: "smooth", block: "center" });

  // Add style to card.
  card.classList.add('highlighted');

  // Remove style from card after short delay.
  setTimeout(() => {
    card.classList.remove('highlighted');
  }, 1500);
}

const controlBookmarks = function (id) {
  // send the id to the model to update the state bookmarks
  model.setBookmarks(id);

  // Render works perfectly. Update works but its a bit weird. 
  cardView.update(model.state.listings);

  // todo.. 
  // need to design the bookmarks. 
  // need to show the bookmarks.
  // need to remove the bookmarks. 
  // !! the cards on the front end need to know when they are bookmarked. Update cardView. Render bookmarkView.

}

const init = function () {
  searchView.addHandlerSearch(handleSearch);
  placeCardView.addClickHandler(handlePlacecardClick);
  mapView.loadMap();
  // This is to dynamically set my link to localhost or hostname. 
  logoView.setHomepagePage();
  // retreieve localstorate
  model.getLocalStorage();
}
init();