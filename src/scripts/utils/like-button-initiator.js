/* eslint-disable no-underscore-dangle */
import FavoriteWarungIdb from '../data/favorite-warung-idb';
import {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
} from '../views/templates/template-creator';
import Toast from './toast-initiator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, warung }) {
    this._likeButtonContainer = likeButtonContainer;
    this._warung = warung;

    await this._renderButton();
  },

  async _renderButton() {
    const { id, name } = this._warung;

    if (await this._isWarungExist(id)) {
      this._renderLiked(name);
    } else {
      this._renderLike(name);
    }
  },

  async _isWarungExist(id) {
    const warung = await FavoriteWarungIdb.getWarung(id);
    return !!warung;
  },

  _renderLike(name) {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteWarungIdb.putWarung(this._warung);
      Toast({
        type: 'success',
        text: `${name} has been add to favorite`,
      });
      this._renderButton();
    });
  },

  _renderLiked(name) {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteWarungIdb.deleteWarung(this._warung.id);
      Toast({
        type: 'danger',
        text: `${name} has been deleted from favorite`,
      });
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
