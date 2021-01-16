import { async } from 'regenerator-runtime';

export const state = {
  listings: [],
  search: {
    query: '',
    results: [],
    page: 1,
  },
  bookmarks: []
}

export const getApartListings = async function (query = 'Dunfermline') {
  try {
    const fetchApart = await fetch(`${process.env.API_URL}?area=${query}${process.env.API_KEY}`);

    const txt = await fetchApart.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(txt, "application/xml");

    if (!fetchApart.ok) throw new Error(`${xmlDoc.getElementsByTagName('error_string')[0].textContent}`);

    const xmlDocListings = xmlDoc.getElementsByTagName('listing');
    const xmlDocListingsArr = Array.from(xmlDocListings);

    xmlDocListingsArr.map(listing => state.listings.push(generateListingObj(listing)));

  } catch (error) {
    console.log(`In the catch block of the model. `, error);
  }
}

const generateListingObj = function (listing) {
  return {
    address: listing.getElementsByTagName('displayable_address')[0].innerHTML,
    latitude: +listing.getElementsByTagName('latitude')[0].innerHTML,
    longitude: +listing.getElementsByTagName('longitude')[0].innerHTML,
    image: listing.getElementsByTagName('image_645_430_url')[0].innerHTML,
    bedrooms: +listing.getElementsByTagName('num_bedrooms')[0].innerHTML,
    price: +listing.getElementsByTagName('price')[0].innerHTML
  }
}
