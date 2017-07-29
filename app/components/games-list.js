import Ember from 'ember';
const {
  Component,
  inject
} = Ember;

export default Component.extend({
  tagName: 'games-list',
  router: inject.service(),

  actions: {

    // transition to add game
    add() {
      this.get('router').transitionTo('game.add');
    },

    // transition to game detail
    start() {
      this.get('router').transitionTo('game.detail', { id: 'abcdefg' });
    },

    // TODO delete game
    delete() {
      console.log('delete game');
    }
  }
});
