class mapView {
  constructor() {
    this.mapLocation = [56.075308, -3.441906];
    this.mapZoomLevel = 20;
  }

  loadMap() {
    this.map = L.map('mapid').setView(this.mapLocation, this.mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  render(data) {
    this.data = data;

    // remove the popups from the map
    this._clearPopups();

    this.layerGroupArr = this.data.map(this.generateMapPopup.bind(this));

    this.calculateBounds();

    this.popupLayer = L.layerGroup(this.layerGroupArr);

    this.popupLayer.addTo(this.map);

    // this.map.fitBounds([
    //   [55.948611, -3.200833],
    //   [55.96361, -3.17848]
    // ])

  }

  calculateBounds() {
    console.log(this.data);

  }

  _clearPopups() {
    if (this.popupLayer) {
      this.map.removeLayer(this.popupLayer);
      console.log(this.map);
    }
  }

  generateMapPopup(d) {
    let popupLocation = new L.LatLng(`${d.latitude}`, `${d.longitude}`);
    let popupContent = `<span>${d.price}</span>`;
    let popup = new L.Popup({ closeButton: false, closeOnClick: false, className: 'custom-popup' });

    popup.setLatLng(popupLocation);
    popup.setContent(popupContent);

    return popup;
  }
}

export default new mapView;


// Leith Walk: 55.96361, -3.17848
// Edinburgh Castle: 55.948611, -3.200833
// East end park: 56.075308, -3.441906

// map.fitBounds([
//  Top right
//  [latitude, longitude] 
//  [small, big]
//  [55.948611, -3.200833]
//  bottom left
//  [big, small]
//  [55.96361, -3.17848]
// ]);




  // _abbey = [56.0699, -3.4636];
  // _loadMarkers() {
  //   L.marker(this._abbey, { opacity: 0 })
  //     .addTo(this._map)
  // }






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

