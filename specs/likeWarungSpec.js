/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import FavoriteWarungIdb from '../src/scripts/data/favorite-warung-idb.js';
import * as TestFactories from './helpers/testFactories.js';

describe('Menyukai sebuah warung', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('sebaiknya menampilkan like button ketika warung belum dilike sebelumnya', async () => {
    await TestFactories.createLikeButtonPresenterWithWarung({ id: 1 });

    expect(document.querySelector('[aria-label="like this warung"]')).toBeTruthy();
  });

  it('tidak boleh menampilkan tombol tidak suka saat warung belum dilike sebelumnya', async () => {
    await TestFactories.createLikeButtonPresenterWithWarung({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this warung"]')).toBeFalsy();
  });

  it('sebaiknya harus menyukai warung', async () => {
    await TestFactories.createLikeButtonPresenterWithWarung({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const warung = await FavoriteWarungIdb.getWarung(1);

    expect(warung).toEqual({ id: 1 });

    FavoriteWarungIdb.deleteWarung(1);
  });

  it('sebaiknya tidak menambahkan warung lagi ketika sudah disukai', async () => {
    await TestFactories.createLikeButtonPresenterWithWarung({ id: 1 });

    await FavoriteWarungIdb.putWarung({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteWarungIdb.getAllWarungs()).toEqual([{ id: 1 }]);

    FavoriteWarungIdb.deleteWarung(1);
  });

  it('seharusnya tidak menambahkan film ketika tidak memiliki id', async () => {
    await TestFactories.createLikeButtonPresenterWithWarung({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteWarungIdb.getAllWarungs()).toEqual([]);
  });
});
