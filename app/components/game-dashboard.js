import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
const {
  Component,
  inject,
  observer
} = Ember;

export default Component.extend({
  tagName: 'game-dashboard',
  router: inject.service(),

  // is the end game modal visible
  showEndGameModal: false,
  roundTimer: 20 * 60,
  m: '00',
  s: '00',

  // pad timers to two digits
  pad(value, length) {
    return value.toString().length < length ? this.pad(`0${value}`, length) : value;
  },

  clock: observer('roundTimer', function() {
    const roundTimer = this.get('roundTimer');
    const minutes = Math.floor(roundTimer / 60);
    const seconds = roundTimer - (minutes * 60);

    this.set('s', this.pad(seconds, 2));
    this.set('m', this.pad(minutes, 2));
  }),

  // close the end game modal
  closeModal() {
    this.set('showEndGameModal', false);
  },

  init() {
    this._super(...arguments);
    this.get('counter').perform();
  },

  counter: task(function*() {
    while (true) {
      yield timeout(1000);
      this.set('roundTimer', this.get('roundTimer') - 1);
    }
  }),

  actions: {

    // prompt the user about ending the game
    promptToEndGame() {
      this.set('showEndGameModal', true);
    },

    // close the end game modal
    closeEndGameModal() {
      this.closeModal();
    },

    // end the game
    endGame() {
      this.closeModal();
      this.get('router').transitionTo('index');
    }
  }
});
