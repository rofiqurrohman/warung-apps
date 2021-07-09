/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
import CONFIG from '../../globals/config';

class WarungDetail extends HTMLElement {
  set value(data) {
    this._data = data;
    this._render();
  }

  _Rating() {
    const rate = [];
    for (let i = 0; i < parseInt(Math.floor(this._data.rating)); i++) {
      rate.push('<i class="fas fa-star"></i>');
    }
    return rate;
  }

  _render() {
    this.innerHTML = `
    <article>
    <img class="lazyload detail-thumbnail" data-src="${
      CONFIG.BASE_IMAGE_URL('medium') + this._data.pictureId
    }" 
    alt="${this._data.name}">
    <div id="likeButtonContainer"></div>
    <div class="detail-content">
        <h1 class="detail-title">${this._data.name}</h1>
        <div class="detail-category-container">
          ${this._data.categories
            .map((category) => `<span class="detail-category">${category.name}</span>`)
            .join(', ')}
        </div>
        <i class="fas fa-map-marker-alt"></i>
        <span class="detail-location">${this._data.address}, ${this._data.city}</span>
        <p class="detail-description">${this._data.description}</p> 
    </div>
    </article>
    <aside>
    <div class="detail-menu">
        <div class="menu-title-container">
            <i class="fas fa-pizza-slice"></i>
            <h2 class="menu-title">Food</h2>
        </div>
        <ul class="menu-list">
            ${this._data.menus.foods
              .map((food) => `<li class="menu-item">${food.name}</li>`)
              .join('')}
        <ul>
    </div>
    <div class="detail-menu">
        <div class="menu-title-container">
            <i class="fas fa-coffee"></i>
            <h2 class="menu-title">Drinks</h2>
        </div>
        <ul class="menu-list">
            ${this._data.menus.drinks
              .map((drink) => `<li class="menu-item">${drink.name}</li>`)
              .join('')}
        </ul>
    </div>
    </aside>
    <section>
    <div class="menu-rating">
        <span>Rating ${this._data.rating}</span>
        ${this._Rating(this._data.rating)
          .map((item) => item)
          .join('')} 
        
    </div> 
    <h2>User Review</h2>
    <div id="review-user-container">
    ${this._data.customerReviews
      .map(
        (review) => `
          <div class="review-user">
              <div class="review-photo-profile">
                  <img src="/images/default.jpg" alt="consumer photo profile">
              </div>
              <div class="review-body">
                  <h3 class="review-user-name">${review.name}</h3>
                  <small class="review-date-post">${review.date}</small>
                  <p class="review-content">${review.review}</p>
              </div>
          </div>
        `
      )
      .join('')}
    </div>
    <div class="review-form-container">
      <h2>Make a Review</h2>
        <form class="review-form" id="review-form">
            <input type="hidden" name="id" value="${this._data.id}">
            <div class="review-form-element">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" autocomplete="off">
            </div>
            <div class="review-form-element">
                <label for="review">Review</label>
                <textarea name="review" id="review"></textarea>
            </div>
            <button type="submit" id="button-review">Add Review</button>
        </form>
    </div>
    </section>
    `;
  }
}

customElements.define('warung-detail', WarungDetail);
