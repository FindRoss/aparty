import View from './view.js';

class BookmarksView extends View {
  constructor() {
    super()
    this.parentElement = document.querySelector('.bookmarks--body')
    this.bookmarksBtn = document.querySelector('.bookmarks-toggle')
    this.bookmarksBtnAlt = document.querySelector('.bookmarks-toggle-alt')
  }

  render(data) {
    let markup = '';

    if (!data || (Array.isArray(data) && data.length === 0)) {
      markup = `<p>No bookmarks found.</p>`

    } else {

      this.data = data;
      markup = this.generateMarkup();

    }

    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addMenuClickHandler() {
    const bmks = document.querySelector('.bookmarks');
    const dismissed = 'dismissed-bookmarks';

    const docBody = document.querySelector('body');
    const posFixed = 'pos-fixed';

    // if parent element contains the hide class then remove it
    [this.bookmarksBtn, this.bookmarksBtnAlt].forEach(foo => foo.addEventListener('click', function () {
      if (bmks.classList.contains(dismissed)) {
        bmks.classList.remove(dismissed);
        docBody.classList.add(posFixed);
      } else {
        bmks.classList.add(dismissed);
        docBody.classList.remove(posFixed);
      }
    }))
  }

  addCardClickHandler(handler) {
    const minusIcons = document.querySelectorAll('.bm-card__remove')

    minusIcons.forEach(element => element.addEventListener('click', function () {
      const card = element.closest('.bm-card')
      const id = card.getAttribute('data-id');

      handler(id);
    }))
  }

  generateMarkup() {
    return this.data.map(this.generateCardMarkup).join('');
  }

  generateCardMarkup(d) {
    return ` 
      <div class="bm-card" data-id=${d.id}>
        <div class="bm-card__header" style=" background-image: url(${d.image});"></div>
        <div class="card--body">
          <div class="card--body__type">${d.type === '' ? 'property' : d.type}</div>
          <div class="card--body__title">${d.address}</div>
          <div class="card--details__price">£${d.price}</div>
        </div>
        <div class="bm-card__action">
          <button class="bm-card__remove">
            <i class="fas fa-minus-square"></i>
          </button>
        </div>
      </div>
    `;
  }
}

export default new BookmarksView();