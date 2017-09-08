import Ember from 'ember';
const {
  Component,
  computed,
  inject,
  get
} = Ember;

export default Component.extend({
  store: inject.service(),
  router: inject.service(),
  tagName: 'add-game',

  name: null,
  small: 5,
  round: 20,
  ante: false,
  big: computed('small', function() {
    return parseInt(get(this, 'small') * 2, 10);
  }),

  actions: {

    save() {
      const game = get(this, 'store').createRecord('game', {
        name: get(this, 'name'),
        small: get(this, 'small'),
        big: get(this, 'big'),
        round: get(this, 'round'),
        ante: get(this, 'ante')
      });

      game.save()
        .then((game) => this._transition(game));
    }
  },

  _transition(game) {
    get(this, 'router').transitionTo('game.detail', game);
  }

});
