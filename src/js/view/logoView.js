class LogoView {

  constructor() {
    this.element = document.querySelector('#homelink');
  }


  setHomepagePage() {

    this.element.href = window.location.href
  }
}

export default new LogoView(); 