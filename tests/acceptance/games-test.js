import { test } from 'qunit';
import moduleForAcceptance from 'ember-poker/tests/helpers/module-for-acceptance';
import page from 'ember-poker/tests/pages/games';
import emptyScenario from 'ember-poker/mirage/scenarios/empty';
import gamesScenario from 'ember-poker/mirage/scenarios/games';

moduleForAcceptance('Acceptance | games', { });

test('can add a new game', async function(assert) {
  emptyScenario(server);
  await page.visit();
  assert.equal(currentURL(), page.url, 'on the correct url');
  assert.equal(page.games().count, 0, 'no games');

  // TODO
});

test('can play an existing game', async function(assert) {
  gamesScenario(server);
  await page.visit();
  assert.equal(currentURL(), page.url, 'on the correct url');
  assert.equal(page.games().count, 5, 'see games');

  // TODO
});

test('can delete a game', async function(assert) {
  gamesScenario(server);
  await page.visit();
  assert.equal(currentURL(), page.url, 'on the correct url');

  // TODO
});
