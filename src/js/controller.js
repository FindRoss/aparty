import mapView from './view/mapView';
import popupsView from './view/popupsView';
import searchView from './view/searchView';
import cardView from './view/cardView';
import bookmarksView from './view/bookmarksView';
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

  // Render the cards.
  cardView.render(model.state.listings);

  // Add the click handler to the cards.
  cardView.addClickHandler(controlBookmarks);

  // Render the icons on the map. 
  mapView.render(model.state.listings);

  // Add the click handler to the popups.
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

  // Update the cards on bookmark change.  
  cardView.update(model.state.listings);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);

  // add the click handler to  the rendered bookmarks.
  bookmarksView.addCardClickHandler(deleteBookmark);
}

const deleteBookmark = function (id) {

  // Remove the bookmark from the state
  model.removeFromBookmarks(id);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);

  // add the click handler to  the rendered bookmarks.
  bookmarksView.addCardClickHandler(deleteBookmark);

  // Update the cards on bookmark change.  
  cardView.update(model.state.listings);
}

const setupBookmarks = function () {
  // Set the bookmarks from localStorage
  model.getLocalStorage();

  // Render the bookmarks
  bookmarksView.render(model.state.bookmarks);

  // Add the click handler on the bookmarks
  bookmarksView.addCardClickHandler(deleteBookmark)
}


const init = function () {
  searchView.addHandlerSearch(handleSearch);
  // Search for places like Dunfermline, Rosyth, ect. 
  placeCardView.addClickHandler(handlePlacecardClick);
  // Handle the bookmarks slide in and out. 
  bookmarksView.addMenuClickHandler()
  // Add the bookmarks to the UI 
  bookmarksView.render(model.state.bookmarks);
  // Loading the map on page load.
  mapView.loadMap();
  // This is to dynamically set my link to localhost or hostname. 
  logoView.setHomepagePage();
  // initiate the Bookmarks from localStorage.
  setupBookmarks();
}
init();