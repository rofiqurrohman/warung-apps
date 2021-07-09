import WarungSource from '../../data/warung-source';
import '../components/warung-item-component';
import { Preloader } from '../templates/template-creator';

const WarungList = {
  async render() {
    return `
      <div class="hero">
      <div class="hero-overlay">
          <div class="hero-inner">
            <h1 class="hero-title">Fresh and Delicious Food for Your Health</h1>
            <p class="hero-tag">food is our fuel source, our nourishment and the start of optimal health</p>
          </div>
        </div>
      </div>

      <section class="content" id="content">
        <h2 class="content-title">Explore Restaurant</h2>
        <div class="post-content">
          ${Preloader.show()}
        </div>
        </section>
    `;
  },

  async afterRender() {
    const warungs = await WarungSource.listWarung();
    const listContainer = document.querySelector('.post-content');
    warungs.forEach((warung) => {
      const postItem = document.createElement('warung-item');
      listContainer.appendChild(postItem);
      postItem.value = warung;
    });
    Preloader.remove();
  },
};

export default WarungList;
