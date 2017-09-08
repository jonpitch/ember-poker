import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import page from 'ember-poker/tests/pages/add';

let i18n;

moduleForComponent('add-game', 'Integration | Component | add game', {
  integration: true,
  beforeEach() {
    i18n = this.container.lookup('service:i18n');
  }
});

test('it renders', function(assert) {
  page.setContext(this)
    .render(hbs`
      {{add-game}}
    `);

  // header
  assert.ok(page.header.isVisible, 'see header');
  assert.equal(
    page.header.text,
    i18n.t('components.add-game.title'),
    'correct header text'
  );

  // name
  assert.equal(
    page.form.name.label.text,
    i18n.t('components.add-game.form.name'),
    'see game name label'
  );
  assert.equal(page.form.name.input.value, '', 'no game name value by default');
  assert.equal(page.form.name.errors().count, 0, 'no game name errors by default');

  // small
  assert.equal(
    page.form.small.label.text,
    i18n.t('components.add-game.form.small'),
    'see small blind label'
  );
  assert.equal(page.form.small.input.value, 5, 'see small blind default value');
  assert.notOk(page.form.small.input.disabled, 'small blind not disabled');
  assert.equal(page.form.small.errors().count, 0, 'no small blind errors by default');

  // big
  assert.equal(
    page.form.big.label.text,
    i18n.t('components.add-game.form.big'),
    'see big blind label'
  );
  assert.equal(page.form.big.input.value, 10, 'see big blind default value');
  assert.ok(page.form.big.input.disabled, 'big blind input disabled');
  assert.equal(page.form.big.errors().count, 0, 'no big blind errors by default');

  // time
  assert.equal(
    page.form.time.label.text,
    i18n.t('components.add-game.form.round'),
    'see round time label'
  );
  assert.equal(page.form.time.input.value, 20, 'see round time default value');
  assert.equal(page.form.time.errors().count, 0, 'no round time errors by default');

  // ante
  assert.ok(page.form.ante.isVisible, 'see ante');
  assert.equal(
    page.form.ante.label,
    i18n.t('components.add-game.form.ante'),
    'see ante label'
  );
  assert.notOk(page.form.ante.isChecked, 'ante not checked by default');

  // button
  assert.ok(page.form.add.isVisible, 'see add game button');
  assert.equal(
    page.form.add.text,
    i18n.t('components.add-game.form.submit'),
    'add game button text is correct'
  );
  assert.ok(page.form.add.disabled, 'add game disabled by default');
});

// TODO error messages
// TODO ember-paper built in validation timing/visibility
test('validation', function(assert) {
  page.setContext(this)
    .render(hbs`
      {{add-game}}
    `);

  page.form.name.input.fillIn(' ');
  page.form.name.input.fillIn('');
  page.form.small.input.fillIn('');
  page.form.time.input.fillIn('');
  page.form.add.click();

  // assert.equal(page.form.name.errors().count, 1, 'name required');
  // assert.equal(page.form.small.errors().count, 1, 'small blind required');
  assert.equal(page.form.big.errors().count, 0, 'no big blind errors');
  // assert.equal(page.form.time.errors().count, 1, 'time required');
  assert.ok(page.form.add.disabled, 'cannot add game with errors');

  page.form.name.input.fillIn('Home Game');
  assert.equal(page.form.name.errors().count, 0, 'name error gone');
  assert.ok(page.form.add.disabled, 'cannot add game with errors');

  // page.form.small.input.fillIn('0');
  // assert.equal(page.form.small.errors().count, 1, 'small blind value error');

  page.form.small.input.fillIn('5');
  assert.equal(page.form.small.errors().count, 0, 'small error gone');
  assert.ok(page.form.add.disabled, 'cannot add game with errors');

  // page.form.time.input.fillIn('0');
  // assert.equal(page.form.time.errors().count, 1, 'time value error');

  page.form.time.input.fillIn('20');
  assert.equal(page.form.time.errors().count, 0, 'time error gone');
  assert.notOk(page.form.add.disabled, 'can now add game');
});

test('small blind doubles big blind', function(assert) {
  page.setContext(this)
    .render(hbs`
      {{add-game}}
    `);

  page.form.small.input.fillIn('5');
  assert.equal(page.form.big.input.value, 10, '5 * 2 = 10');

  page.form.small.input.fillIn('20');
  assert.equal(page.form.big.input.value, 40, '20 * 2 = 40');

  page.form.small.input.fillIn('1');
  assert.equal(page.form.big.input.value, 2, '1 * 2 = 10');
});

test('save game transition', function(assert) {
  assert.expect(1);
  const mockRouterService = {
    hasRoute() { },
    transitionTo() {
      assert.ok(true, 'transition fired');
    }
  };

  this.set('router', mockRouterService);
  page.setContext(this)
    .render(hbs`
      {{add-game
        router=router
      }}
    `);

  page.form.name.input.fillIn('test');
  page.form.add.click();
});
