import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'get-started',

  // default small blind
  smallBlind: 5,

  // big blind is always twice the small blind
  bigBlind: function() {
    return this.get('smallBlind') * 2;
  }.property('smallBlind'),

  // default minutes per round
  minutes: 20,

  // default ante setting
  ante: true,

  actions: {

    // a psuedo-workaround for materialize
    toggleAnte: function() {
      this.set('ante', !this.get('ante'));
    },

    // validate user info and go to the game details screen
    createGame: function() {
      // TODO validate game properties
      const appController = this.container.lookup('controller:application');
      appController.transitionToRoute('game');
    }
  }
});
