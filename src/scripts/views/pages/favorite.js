import FavoriteWarungIdb from '../../data/favorite-warung-idb';
import '../components/empty-favorite';
import '../components/warung-item-component';

const Favorite = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Favorite Warung</h2>
        <div class="post-content" id="post-content"></div>
      </div>
    `;
  },

  async afterRender() {
    const warungs = await FavoriteWarungIdb.getAllWarungs();
    const warungsContainer = document.querySelector('#post-content');
    if (warungs.length > 0) {
      warungs.forEach((warung) => {
        const postItem = document.createElement('warung-item');
        warungsContainer.appendChild(postItem);
        postItem.value = warung;
      });
    } else {
      warungsContainer.classList.remove('post-content');
      warungsContainer.innerHTML += '<empty-favorite></empty-favorite>';
    }
  },
};

export default Favorite;
