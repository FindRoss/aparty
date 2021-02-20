import { async } from 'regenerator-runtime';
import { API_KEY, API_URL } from './config';
import { v4 as uuidv4 } from 'uuid';
import { numberWithCommas } from './helpers.js';

export const state = {
  listings: [],
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

    // Error if there is just nothing found for the search. Wrong search field. 
    // This doesnt deal with a messed up fetch request. ie if the API is broken. 
    if (!fetchApart.ok) throw new Error(xmlDoc.getElementsByTagName('error_string')[0].textContent);

    console.log(process.env.API_URL);

    // If xmlDoc contains a disambiguity field, then I need to show those options to the user. 
    if (xmlDoc.getElementsByTagName('disambiguation').length !== 0) {
      // deal with the disambiguous search results here. 
      // throw new error
      throw new Error('Can you be more specific.');
    }


    const xmlDocListings = xmlDoc.getElementsByTagName('listing');
    const xmlDocListingsArr = Array.from(xmlDocListings);

    state.listings = [];
    xmlDocListingsArr.map((listing, index) => state.listings.push(generateListingObj(listing, index)));

  } catch (error) {
    console.log('error in model', error)
    throw Error(error);
  }
}

const generateListingObj = function (listing) {

  return {
    address: listing.getElementsByTagName('displayable_address')[0].innerHTML,
    latitude: +listing.getElementsByTagName('latitude')[0].innerHTML,
    longitude: +listing.getElementsByTagName('longitude')[0].innerHTML,
    image: listing.getElementsByTagName('image_645_430_url')[0].innerHTML,
    bedrooms: +listing.getElementsByTagName('num_bedrooms')[0].innerHTML,
    price: numberWithCommas(+listing.getElementsByTagName('price')[0].innerHTML),
    id: uuidv4(),
    highlighted: false
  }
}
