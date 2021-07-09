import UrlParser from '../../routes/url-parser';
import WarungSource from '../../data/warung-source';
import '../components/warung-detail-component';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import FormReviewInitiator from '../../utils/form-review-initiator';

const Detail = {
  async render() {
    return `
      <div id="detail-warung" class="detail-warung">
        <warung-detail></warung-detail>
      </div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const { restaurant } = await WarungSource.detailWarung(url.id);
    const detailContainer = document.querySelector('warung-detail');
    detailContainer.value = restaurant;

    FormReviewInitiator.init({
      form: detailContainer.querySelector('#review-form'),
    });

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      warung: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        city: restaurant.city,
        address: restaurant.address,
        pictureId: restaurant.pictureId,
        categories: restaurant.categories,
        menus: restaurant.menus,
        rating: restaurant.rating,
        reviews: restaurant.customerReviews,
      },
    });
  },
};

export default Detail;
