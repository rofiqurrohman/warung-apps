/* eslint-disable no-undef */
const assert = require('assert');

Feature('Batal Menyukai Warung');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('batal menyukai satu warung', async ({ I }) => {
  I.see('Favorite warung still empty', '.empty-favorite-tag');

  I.amOnPage('/');

  I.seeElement('.post-item-title a');

  const firstPostLike = locate('.post-item-title a').first();
  const firstPostTitle = await I.grabTextFrom(firstPostLike);
  I.click(firstPostLike);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.post-item-title');

  const likedPostTitle = await I.grabTextFrom('.post-item-title');

  assert.strictEqual(firstPostTitle, likedPostTitle);

  I.seeElement('.post-item-title');

  const firstPostUnlike = locate('.post-item-title a').first();

  I.click(firstPostUnlike);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');

  I.see('Favorite warung still empty', '.empty-favorite-tag');
});
