import Ember from 'ember';

export default Ember.Controller.extend({

  // is server request being made
  isCreating: false,

  // values for game
  name: null,
  smallBlind: null,
  bigBlind: function () {
    return this.get('smallBlind') * 2;
  }.property('smallBlind'),
  ante: false,

  // validate a game before creating
  isValidGame: function () {
    // name required
    if (Ember.isEmpty(this.get('name'))) {
      return false;
    }

    // small blind required
    if (Ember.isEmpty(this.get('smallBlind'))) {
      return false;
    }

    // small blind must be integer
    if (isNaN(parseInt(this.get('smallBlind'), 10))) {
      return false;
    }

    return true;
  },

  actions: {

    // create new poker game
    createGame: function () {
      if (this.isValidGame()) {
        var game = this.get('store').createRecord('game', {
          name: this.get('name'),
          smallBlind: this.get('smallBlind'),
          bigBlind: this.get('bigBlind'),
          ante: this.get('ante')
        });

        this.set('isCreating', true);
        game.save().then(() => {
          this.transitionToRoute('game.index', game);
        }).catch(() => {
          this.error('Unable to create game. Please try again');
        }).finally(() => {
          this.set('isCreating', false);
        });
      }
    }
  }
});
