import { moduleForModel, test } from 'ember-qunit';

moduleForModel('game', 'Unit | Model | game', {
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
