import { test } from 'qunit';
import moduleForAcceptance from 'ember-poker/tests/helpers/module-for-acceptance';
import page from 'ember-poker/tests/pages/games';
import add from 'ember-poker/tests/pages/add';
import detail from 'ember-poker/tests/pages/detail';
import emptyScenario from 'ember-poker/mirage/scenarios/empty';
import gamesScenario from 'ember-poker/mirage/scenarios/games';

moduleForAcceptance('Acceptance | games', { });

test('can add a new game', async function(assert) {
  emptyScenario(server);
  await page.visit();
  assert.equal(currentURL(), page.url, 'on the correct url');
  assert.equal(page.games().count, 0, 'no games');

  await page.add.click();
  assert.equal(currentURL(), page.addUrl, 'on the correct url');

  await add.form.name.input.fillIn('Home Game');
  await add.form.add.click();
  assert.equal(currentRouteName(), 'game.detail', 'on the correct route');
});

test('can play and end an existing game', async function(assert) {
  gamesScenario(server);
  await page.visit();
  assert.equal(currentURL(), page.url, 'on the correct url');
  assert.equal(page.games().count, 5, 'see games');

  let game = server.db.games.find(1);
  await page.games(0).click();
  assert.equal(currentRouteName(), 'game.detail', 'on the correct route');
  assert.equal(detail.controls.name.text, game.name, 'correct game');

  await detail.controls.end.click();
  assert.ok(detail.modal.isVisible, 'see modal');

  await detail.modal.ok();
  assert.equal(currentURL(), page.url, 'back at the games list');
});

test('can delete a game', async function(assert) {
  gamesScenario(server);
  await page.visit();
  assert.equal(currentURL(), page.url, 'on the correct url');

  assert.equal(page.games().count, 5, 'see list of games');
  await page.games(0).delete();

  assert.equal(page.games().count, 4, 'game removed');
});
