class PopupsView {
  constructor() {
    this.popups = [];
  }

  addClickHandler(handler) {
    this.getPopups();

    // add the event handler to every popup. 
    this.popups.forEach(popup => popup.addEventListener('click', function (e) {
      // get the data-id here. 
      let popupOuter = e.target.closest('.leaflet-popup-content-wrapper');
      if (!popupOuter) return;

      let popupInner = popupOuter.querySelector('.popup__info');
      let popupID = popupInner.dataset.id;
      handler(popupID);
    }))
  }

  getPopups() {
    this.popups = document.querySelectorAll('.leaflet-popup');
  }
}

export default new PopupsView();

