import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from 'ember-poker/tests/pages/detail';
import { startMirage } from 'ember-poker/initializers/ember-cli-mirage';

let i18n;

moduleForComponent('game-dashboard', 'Integration | Component | game dashboard', {
  integration: true,
  beforeEach() {
    this.server = startMirage();
    i18n = this.container.lookup('service:i18n');
  },
  afterEach() {
    this.server.shutdown();
  }
});

test('it renders - current no ante - next no ante', function(assert) {
  const game = server.create('game', { });

  this.set('game', game);
  page.setContext(this)
    .render(hbs`
      {{game-dashboard game=game}}
    `);

  // controls
  assert.ok(page.controls.name.isVisible, 'see game name');
  assert.equal(page.controls.name.text, game.name, 'correct name');
  assert.ok(page.controls.minutes.isVisible, 'see minutes');
  assert.equal(page.controls.minutes.text, '00', 'correct minutes');
  assert.ok(page.controls.seconds.isVisible, 'see seconds');
  assert.equal(page.controls.seconds.text, '00', 'correct seconds');
  assert.ok(page.controls.round.isVisible, 'see round');
  assert.equal(
    page.controls.round.text,
    i18n.t('components.game-dashboard.round', { round: game.level }),
    'correct round'
  );
  assert.ok(page.controls.end.isVisible, 'can end game');
  assert.ok(page.controls.play.isVisible, 'can play game');
  assert.notOk(page.controls.pause.isVisible, 'cannot pause game');

  // current
  assert.ok(page.current.header.isVisible, 'see current blinds');
  assert.equal(
    page.current.header.text,
    i18n.t('components.game-dashboard.current'),
    'current header correct'
  );
  assert.equal(
    page.current.blinds,
    i18n.t('components.game-dashboard.blinds', { small: game.small, big: game.big }),
    'correct current blinds'
  );
  assert.equal(
    page.current.ante,
    i18n.t('components.game-dashboard.noAnte'),
    'correct current ante text'
  );

  // next
  assert.ok(page.next.header.isVisible, 'see next blinds');
  assert.equal(
    page.next.header.text,
    i18n.t('components.game-dashboard.next'),
    'next header correct'
  );
  assert.equal(
    page.next.blinds,
    i18n.t('components.game-dashboard.blinds', { small: game.big, big: (game.big * 2) }),
    'correct next blinds'
  );
  assert.equal(
    page.next.ante,
    i18n.t('components.game-dashboard.noAnte'),
    'correct next ante text'
  );
});

test('it renders - current no ante - next ante', function(assert) {
  const game = server.create('game', {
    ante: true,
    level: 3
  });

  this.set('game', game);
  page.setContext(this)
    .render(hbs`
      {{game-dashboard game=game}}
    `);

    // current
    assert.equal(
      page.current.ante,
      i18n.t('components.game-dashboard.ante', { ante: 0 }),
      'correct current ante text'
    );

    // next
    assert.equal(
      page.next.ante,
      i18n.t('components.game-dashboard.ante', { ante: game.small }),
      'correct next ante text'
    );
});

test('it renders - current ante - next ante', function(assert) {
  const game = server.create('game', {
    ante: true,
    level: 4
  });

  this.set('game', game);
  page.setContext(this)
    .render(hbs`
      {{game-dashboard game=game}}
    `);

    // current
    assert.equal(
      page.current.ante,
      i18n.t('components.game-dashboard.ante', { ante: game.small }),
      'correct current ante text'
    );

    // next
    assert.equal(
      page.next.ante,
      i18n.t('components.game-dashboard.ante', { ante: game.big }),
      'correct next ante text'
    );
});

// TODO elaborate when able to resume a running game
test('it renders - already in progress', function(assert) {
  const game = server.create('game', {
    started: true
  });

  this.set('game', game);
  page.setContext(this)
    .render(hbs`
      {{game-dashboard game=game}}
    `);

  // controls
  assert.ok(page.controls.name.isVisible, 'see game name');
  assert.equal(page.controls.name.text, game.name, 'correct name');
  assert.ok(page.controls.minutes.isVisible, 'see minutes');
  assert.equal(page.controls.minutes.text, '00', 'correct minutes');
  assert.ok(page.controls.seconds.isVisible, 'see seconds');
  assert.equal(page.controls.seconds.text, '00', 'correct seconds');
  assert.ok(page.controls.round.isVisible, 'see round');
  assert.equal(
    page.controls.round.text,
    i18n.t('components.game-dashboard.round', { round: game.level }),
    'correct round'
  );
  assert.ok(page.controls.end.isVisible, 'can end game');
  assert.ok(page.controls.play.isVisible, 'can play game');
  assert.notOk(page.controls.pause.isVisible, 'cannot pause game');

  // current
  assert.ok(page.current.header.isVisible, 'see current blinds');
  assert.equal(
    page.current.header.text,
    i18n.t('components.game-dashboard.current'),
    'current header correct'
  );
  assert.equal(
    page.current.blinds,
    i18n.t('components.game-dashboard.blinds', { small: game.small, big: game.big }),
    'correct current blinds'
  );
  assert.equal(
    page.current.ante,
    i18n.t('components.game-dashboard.noAnte'),
    'correct current ante text'
  );

  // next
  assert.ok(page.next.header.isVisible, 'see next blinds');
  assert.equal(
    page.next.header.text,
    i18n.t('components.game-dashboard.next'),
    'next header correct'
  );
  assert.equal(
    page.next.blinds,
    i18n.t('components.game-dashboard.blinds', { small: game.big, big: (game.big * 2) }),
    'correct next blinds'
  );
  assert.equal(
    page.next.ante,
    i18n.t('components.game-dashboard.noAnte'),
    'correct next ante text'
  );
});
