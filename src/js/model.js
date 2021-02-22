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


export const highlightApartmentListing = id => {
  let cardToHighlight = [...state.listings].map(listing => {
    if (listing.id === id) {
      listing.highlighted = true;
    } else {
      listing.highlighted = false;
    }
    return listing;
  });

  state.listings = [...cardToHighlight];
}

export const getApartListings = async function (query = 'Dunfermline') {
  try {
    const fetchApart = await fetch(`${process.env.API_URL}?area=${query}&api_key=${process.env.API_KEY}`);
    const txt = await fetchApart.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(txt, "application/xml");

    if (!fetchApart.ok) {
      // For no-found results issues
      // status: 400
      // statusText: "Bad request"

      // For API issue
      // status: 403
      // statusText: Forbidden

      let message = 'something went wrong';

      // xmlDoc.getElementsByTagName('error_string')[0].textContent
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

    // Rather than just pushing the listing onto the state, need to check the same address has not already been added.
    xmlDocListingsArr.map((listing, index) => {

      const listingObj = generateListingObj(listing);

      // Check for duplicates
      if (index > 0) {
        const dulpicateCheck = state.listings.filter(stateListing => {
          return stateListing.address === listingObj.address;
        })
        if (dulpicateCheck.length > 0) return;
      }

      // Check price is not 0
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
    highlighted: false
  }
}

const generateDisambiguationObj = function (arr) {
  let realArr = Array.from(arr);
  let arrWithObjects = realArr.map(r => r.textContent);
  return arrWithObjects;
}
