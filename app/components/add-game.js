import Ember from 'ember';
const {
  Component,
  computed,
  inject,
  get
} = Ember;

export default Component.extend({
  tagName: 'add-game',
  router: inject.service(),
  store: inject.service(),

  // form values
  name: null,
  small: 5,
  big: computed('small', function() {
    return parseInt(this.get('small') * 2, 10);
  }),
  round: 20,
  ante: false,

  actions: {

    // save game
    save() {
      const game = this.get('store').createRecord('game', {
        name: this.get('name'),
        small: this.get('small'),
        big: this.get('big'),
        round: this.get('round'),
        ante: this.get('ante')
      });

      game.save().then((g) => {
        this.get('router').transitionTo('game.detail', { id: get(g, 'id') });
      });
    }
  }

});
