/* eslint-disable no-undef */
const assert = require('assert');

Feature('Menyukai Warung');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('menyukai satu warung', async ({ I }) => {
  I.see('Favorite warung still empty', '.empty-favorite-tag');

  I.amOnPage('/');

  I.seeElement('.post-item-title a');

  const firstPost = locate('.post-item-title a').first();
  const firstPostTitle = await I.grabTextFrom(firstPost);
  I.click(firstPost);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.post-item-title');

  const likedPostTitle = await I.grabTextFrom('.post-item-title');

  assert.strictEqual(firstPostTitle, likedPostTitle);
});
