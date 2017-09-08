import Ember from 'ember';
const {
  Component,
  inject,
  computed,
  get
} = Ember;

export default Component.extend({
  router: inject.service(),
  tagName: 'games-list',

  lastItemIndex: computed('games', function() {
    return get(this, 'games.length') - 1;
  }),

  actions: {

    // transition to add game
    add() {
      get(this, 'router').transitionTo('game.add');
    },

    // transition to game detail
    start(game) {
      get(this, 'router').transitionTo('game.detail', game);
    },

    // delete game
    delete(game) {
      game.destroyRecord();
      game.save();
    }
  }
});
