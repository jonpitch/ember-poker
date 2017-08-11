import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { startMirage } from 'ember-poker/initializers/ember-cli-mirage';
import page from 'ember-poker/tests/pages/games';

let i18n;

moduleForComponent('games-list', 'Integration | Component | games list', {
  integration: true,
  beforeEach() {
    this.server = startMirage();
    i18n = this.container.lookup('service:i18n');
  },
  afterEach() {
    this.server.shutdown();
  }
});

test('it renders - no games', function(assert) {
  page.setContext(this)
    .render(hbs`
      {{games-list}}
    `);

  assert.ok(page.title.isVisible, 'see games list title');
  assert.equal(
    page.title.text,
    i18n.t('components.games-list.title'),
    'correct title text'
  );

  assert.ok(page.empty.isVisible, 'see no games message');
  assert.equal(
    page.empty.text,
    i18n.t('components.games-list.empty'),
    'correct empty text'
  );

  assert.ok(page.add.isVisible, 'see add game button');
  assert.equal(page.games().count, 0, 'no games listed');
});

test('it renders - list of games', function(assert) {
  const games = server.createList('game', 5);

  this.set('games', games);
  page.setContext(this)
    .render(hbs`
      {{games-list games=games}}
    `);

  assert.ok(page.title.isVisible, 'see games list title');
  assert.equal(
    page.title.text,
    i18n.t('components.games-list.title'),
    'correct title text'
  );

  assert.notOk(page.empty.isVisible, 'do not see no games message');
  assert.ok(page.add.isVisible, 'see add game button');
  assert.equal(page.games().count, 5, 'see all 5 games');
  games.map((g, i) => {
    assert.equal(page.games(i).name.text, g.name, `game ${i} name correct`);
  });
});
