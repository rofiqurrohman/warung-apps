/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import FavoriteWarungIdb from '../src/scripts/data/favorite-warung-idb.js';
import * as TestFactories from './helpers/testFactories.js';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Batal Menyukai Warung', () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteWarungIdb.putWarung({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteWarungIdb.deleteWarung(1);
  });

  it('sebaiknya menampilkan widget tidak seperti saat film disukai', async () => {
    await TestFactories.createLikeButtonPresenterWithWarung({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this warung"]')).toBeTruthy();
  });

  it('sebaiknya tidak ditampilkan seperti widget ketika film telah disukai', async () => {
    await TestFactories.createLikeButtonPresenterWithWarung({ id: 1 });

    expect(document.querySelector('[aria-label="like this warung"]')).toBeFalsy();
  });

  it('harus dapat menghapus film yang disukai dari daftar', async () => {
    await TestFactories.createLikeButtonPresenterWithWarung({ id: 1 });

    document.querySelector('[aria-label="unlike this warung"]').dispatchEvent(new Event('click'));

    expect(await FavoriteWarungIdb.getAllWarungs()).toEqual([]);
  });

  it('sebaiknya tidak boleh melakukan kesalahan jika film yang tidak disukai tidak ada dalam daftar', async () => {
    await TestFactories.createLikeButtonPresenterWithWarung({ id: 1 });

    await FavoriteWarungIdb.deleteWarung(1);

    document.querySelector('[aria-label="unlike this warung"]').dispatchEvent(new Event('click'));

    expect(await FavoriteWarungIdb.getAllWarungs()).toEqual([]);
  });
});
