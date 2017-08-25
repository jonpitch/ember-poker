import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
const {
  Component,
  inject,
  observer,
  computed,
  get,
  set,
  isEmpty
} = Ember;

export default Component.extend({
  tagName: 'game-dashboard',
  router: inject.service(),

  anteStartsAt: 4,
  showEndGameModal: false,
  m: '00',
  s: '00',

  // pad timers to two digits
  pad(value, length) {
    return value.toString().length < length ? this.pad(`0${value}`, length) : value;
  },

  // round clock
  clock: observer('game.clock', function() {
    const game = this.get('game');
    const secondsInRound = (get(game, 'round') * 60) - get(game, 'clock');
    const minutes = Math.floor(secondsInRound / 60);
    const seconds = secondsInRound - (minutes * 60);

    this.set('s', this.pad(seconds, 2));
    this.set('m', this.pad(minutes, 2));

    if (secondsInRound === 0) {
      set(game, 'clock', 0);
      set(game, 'level', get(game, 'level') + 1);
    }
  }),

  // the current small blind
  currentSmall: computed('game.level', 'game.small', function() {
    const game = this.get('game');
    return get(game, 'level') * get(game, 'small');
  }),

  // the current big blind
  currentBig: computed('game.level', 'game.big', function() {
    const game = this.get('game');
    return get(game, 'level') * get(game, 'big');
  }),

  // the current ante
  currentAnte: computed('game.level', function() {
    const game = this.get('game');
    const level = get(game, 'level');
    return this.anteForLevel(level);
  }),

  // the upcoming small blind
  nextSmall: computed('game.level', 'game.small', function() {
    const game = this.get('game');
    return (get(game, 'level') + 1) * get(game, 'small');
  }),

  // the upcoming big blind
  nextBig: computed('game.level', 'game.big', function() {
    const game = this.get('game');
    return (get(game, 'level') + 1) * get(game, 'big');
  }),

  // the upcoming ante
  nextAnte: computed('game.level', function() {
    const game = this.get('game');
    const level = get(game, 'level') + 1;
    return this.anteForLevel(level);
  }),

  // find ante for given level
  anteForLevel(level) {
    const game = this.get('game');
    const start = this.get('anteStartsAt');
    if (level < start || !get(game, 'ante')) {
      return 0;
    }

    const normalized = (level - start) + 1;
    const small = get(game, 'small');
    return normalized * small;
  },

  // close the end game modal
  closeModal() {
    this.set('showEndGameModal', false);
  },

  // keep track of game clock
  gameClock: task(function*() {
    let game = this.get('game');
    while (get(game, 'running')) {
      yield timeout(1000);
      set(game, 'clock', get(game, 'clock') + 1);
    }
  }),

  actions: {

    // start a game
    play() {
      let game = this.get('game');
      const started = get(game, 'started');

      if (isEmpty(started)) {
        set(game, 'started', Math.round(new Date().getTime() / 1000.0));
        set(game, 'finished', null);
        set(game, 'clock', 0);
      }

      set(game, 'running', true);

      // TODO save game
      this.get('gameClock').perform();
    },

    // pause game
    pause() {
      let game = this.get('game');
      set(game, 'running', false);

      // TODO save game
    },

    // stop game
    stop() {
      let game = this.get('game');
      set(game, 'running', false);
      set(game, 'finished', Math.round(new Date().getTime() / 1000.0));
      set(game, 'clock', 0);
      this.get('gameClock').cancelAll();

      // TODO save game

      // close modal and transition back to games
      this.closeModal();
      this.get('router').transitionTo('index');
    },

    // prompt the user about ending the game
    promptToEndGame() {
      this.set('showEndGameModal', true);
    },

    // close the end game modal
    closeEndGameModal() {
      this.closeModal();
    }
  }
});
