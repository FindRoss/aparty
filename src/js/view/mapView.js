class mapView {
  constructor() {
    this.mapLocation = [56.075308, -3.441906];
    this.mapZoomLevel = 8;
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

    this._clearPopups();

    this.layerGroupArr = this.data.map(this.generateMapPopup.bind(this));

    this.popupLayer = L.layerGroup(this.layerGroupArr);

    this.popupLayer.addTo(this.map);

    this.map.fitBounds(this.calculateBounds())

    this.addPopupHandler();
  }

  calculateBounds() {
    // I need to north-west and south-east extremes.
    const latArr = [...this.data];
    const lngArr = [...this.data];

    // sort can arrange the lats and lngs
    const latSort = latArr.sort((a, b) => a.latitude - b.latitude);
    const lngSort = lngArr.sort((a, b) => a.longitude - b.longitude);

    const north = latSort[latSort.length - 1].latitude;
    const south = latSort[0].latitude;

    const east = lngSort[lngSort.length - 1].longitude;
    const west = lngSort[0].longitude;

    return [
      [north, west],
      [south, east]
    ]
  }

  _clearPopups() {
    if (this.popupLayer) {
      this.map.removeLayer(this.popupLayer);
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

  addPopupHandler() {
    L.popupHandler = L.Handler.extend({
      addHooks: function () {
        L.DomEvent.on(window, 'mouseover', this._tilt, this);
      },

      removeHooks: function () {
        L.DomEvent.off(window, 'mouseover', this._tilt, this);
      },

      _tilt: function () {

        console.log('mouseover event...');
      }
    });

    L.Map.addInitHook('addHandler', 'mousepop', L.popupHandler);

    console.log(L.Map);
  }

}

export default new mapView;





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

