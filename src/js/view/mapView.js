// const dunfermline = [56.07192, -3.4393];

// 1) User story:
// Display aparments as cards and their position on the map. 
// Hovering over a card will show its location on the map.
// Clicking an icon on the map will highlight the icon - or - show a preiew of the card.
// Ability to filter apartments for price, rooms and Amentities. 
// Bookmark for keeping apartments for the future. 

// 2) Design the layout.
// Name: Apartmenty
// Navigation
// Filter
// Cards // Map

// www.maptiler.com for mapTile. 

// Dunfermline Abbey = [56.0699, -3.4636]; 
// East End Park = [56.075308, -3.441906];



class mapView {
  _map;
  _data;
  _mapLocation = [56.0699, -3.4636];
  _mapZoomLevel = 10;
  _mapMarkersLocation = [[56.075308, -3.441906], [56.0699, -3.4636]];
  _abbey = [56.0699, -3.4636];

  constructor() {
    // this should be in the controller.
    this._loadMap();
  }

  _loadMap() {
    this._map = L.map('mapid').setView(this._mapLocation, this._mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this._map);
  }

  render(data) {
    this._data = data;
    return this._data.map(this._generateMapPopup.bind(this));
  }

  _generateMapPopup(d) {
    let popupLocation = new L.LatLng(`${d.latitude}`, `${d.longitude}`);
    let popupContent = `<span>foo</span>`;
    let popup = new L.Popup({ closeButton: false, closeOnClick: false });

    popup.setLatLng(popupLocation);
    popup.setContent(popupContent);

    return this._map.addLayer(popup)
  }

}

export default new mapView;



  // _loadMarkers() {
  //   L.marker(this._abbey, { opacity: 0 })
  //     .addTo(this._map)
  // }
