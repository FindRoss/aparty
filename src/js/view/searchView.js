class SearchView {
  constructor() {
    this.parentElement = document.querySelector('.search');
  }

  getQuery() {
    const query = this.parentElement.querySelector('.search__field').value;
    this._clearInput()
    return query;
  }

  _clearInput() {
    this.parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    })
  }
}

export default new SearchView(); 