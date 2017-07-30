import Ember from 'ember';
const {
  Component,
  inject,
  computed,
  get
} = Ember;

export default Component.extend({
  tagName: 'games-list',
  router: inject.service(),

  lastItemIndex: computed('games', function() {
    return this.get('games.length') - 1;
  }),

  actions: {

    // transition to add game
    add() {
      this.get('router').transitionTo('game.add');
    },

    // transition to game detail
    start(game) {
      this.get('router').transitionTo('game.detail', { id: get(game, 'id') });
    },

    // delete game
    delete(game) {
      game.destroyRecord();
      game.save();
    }
  }
});
