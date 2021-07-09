/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/extensions
import LikeButtonInitiator from '../../src/scripts/utils/like-button-initiator.js';

const createLikeButtonPresenterWithWarung = async (warung) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    warung,
  });
};

export { createLikeButtonPresenterWithWarung };
