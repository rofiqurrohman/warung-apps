const createLikeButtonTemplate = () => `
  <button aria-label="like this warung" id="likeButton" class="like">
     <i class="far fa-heart" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this warung" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const Preloader = {
  show() {
    return `
      <div class="page-loader"></div>
    `;
  },
  remove() {
    document.querySelector('.page-loader').remove();
  },
};

export { createLikeButtonTemplate, createLikedButtonTemplate, Preloader };
