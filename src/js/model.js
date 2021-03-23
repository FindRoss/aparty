import { async } from 'regenerator-runtime';
import { API_KEY, API_URL } from './config';
import { v4 as uuidv4 } from 'uuid';
import { numberWithCommas } from './helpers.js';

export const state = {
  listings: [],
  disambiguation: [],
  search: {
    query: '',
    results: [],
    page: 1,
  },
  bookmarks: []
}

export const getApartListings = async function (query = 'Dunfermline') {
  try {
    const fetchApart = await fetch(`${process.env.API_URL}?area=${query}&api_key=${process.env.API_KEY}`);
    const txt = await fetchApart.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(txt, "application/xml");

    if (!fetchApart.ok) {
      // For no-found results issues // status: 400 // statusText: "Bad request"
      // For API issue // status: 403 // statusText: Forbidden

      let message = 'something went wrong';

      if (fetchApart.status === 400) message = `No results found for ${query}`;
      if (fetchApart.status === 403) message = 'There was an error with the request';

      throw new Error(message);
    }

    // If xmlDoc contains a disambiguity field, then I need to show those options to the user. 
    if (xmlDoc.getElementsByTagName('disambiguation').length !== 0) {

      let disambiguationArray = generateDisambiguationObj(xmlDoc.getElementsByTagName('disambiguation'));
      state.disambiguation = [];
      state.disambiguation = disambiguationArray;
      throw new Error('disambiguation');
    }

    const xmlDocListings = xmlDoc.getElementsByTagName('listing');
    const xmlDocListingsArr = Array.from(xmlDocListings);

    state.listings = [];
    // I have to define the bookmarks here for some reason?
    state.bookmarks = [];

    // Rather than just pushing the listing onto the state, need to check the same address has not already been added.
    xmlDocListingsArr.map((listing, index) => {

      const listingObj = generateListingObj(listing);

      // Check if the listing is currently bookmarked. Cannot check for the ID because it is generate every call
      if (state.bookmarks.some(bookmark => bookmark.address == listingObj.address)) {
        listingObj.bookmark = true;
      } else {
        listingObj.bookmark = false;
      }

      // Check for duplicates
      if (index > 0) {
        const dulpicateCheck = state.listings.filter(stateListing => {
          return stateListing.address === listingObj.address;
        })
        if (dulpicateCheck.length > 0) return;
      }

      // Final check price is not 0
      if (listingObj.price !== '0') {
        state.listings.push(listingObj);
      }
    });

  } catch (error) {
    throw Error(error.message);
  }
}


const generateListingObj = function (listing) {
  return {
    address: listing.getElementsByTagName('displayable_address')[0].innerHTML,
    street: listing.getElementsByTagName('street_name')[0].innerHTML,
    latitude: +listing.getElementsByTagName('latitude')[0].innerHTML,
    longitude: +listing.getElementsByTagName('longitude')[0].innerHTML,
    image: listing.getElementsByTagName('image_645_430_url')[0].innerHTML,
    type: listing.getElementsByTagName('property_type')[0].innerHTML,
    bedrooms: +listing.getElementsByTagName('num_bedrooms')[0].innerHTML,
    price: numberWithCommas(listing.getElementsByTagName('price')[0].innerHTML),
    id: uuidv4(),
  }
}

const generateDisambiguationObj = function (arr) {
  let realArr = Array.from(arr);
  let arrWithObjects = realArr.map(r => r.textContent);
  return arrWithObjects;
}

export const setBookmarks = function (id) {


  // With the id, filter the listing from state.
  const filteredListing = state.listings.filter(listing => listing.id === id)[0];

  // Toggle whether the listing is bookmarked. 
  filteredListing.bookmark = !filteredListing.bookmark

  console.log('am I here?', filteredListing);

  // Update the model.state.listings with this updated listing. 
  state.listings.map(listing => {
    if (listing.address === filteredListing.address)
      listing.bookmark = filteredListing.bookmark;
  })

  // If the bookmark === false, remove it from the bookmarks.
  if (!filteredListing.bookmark) {
    // loop through the bookmarks and filter this one.
    const newBookmarksArr = state.bookmarks.filter(bookmark => bookmark.address !== filteredListing.address);
    state.bookmarks = newBookmarksArr;
  }

  // If the bookmark === true store the listing in the state bookmarks array.
  if (filteredListing.bookmark) {
    state.bookmarks.push(filteredListing)
  }

  // Store bookmarks in localStorage
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

export const removeFromBookmarks = function (id) {

  // Filtered the bookmark from the bookmarks array. 
  const newBookmarksArr = state.bookmarks.filter(bookmark => bookmark.id !== id);

  // Update the bookmarks in the state. 
  state.bookmarks = newBookmarksArr;

  // Store bookmarks in localStorage
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));

  // Deal with the state listings.   
  // True if the state listings contain the current bookmark we are dealing with. 
  const testBookmark = state.listings.some(listing => listing.id === id);


  if (testBookmark === true) {
    // copy the bookmarks array. 
    const listingsCopy = [...state.listings];

    // go through it and update the listing with the id. 
    listingsCopy.map(listing => {
      if (listing.id === id) {
        listing.bookmark = !listing.bookmark;
      }
    });

    // add it back onto the bookmarks array 
    state.listings = listingsCopy;
  }
}

export const getLocalStorage = function () {
  // Bookmarks stored in localStorage
  const bookmarksFromLocalStorage = localStorage.getItem('bookmarks');
  state.bookmarks = JSON.parse(bookmarksFromLocalStorage);
}


