import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';
const {
  Component,
  inject,
  computed,
  get,
  set,
  isEmpty
} = Ember;

export default Component.extend({
  router: inject.service(),
  tagName: 'game-dashboard',

  anteStartsAt: 4,
  showEndGameModal: false,
  m: '00',
  s: '00',

  // the current small blind
  currentSmall: computed('game.{level,small}', function() {
    const game = get(this, 'game');
    return get(game, 'level') * get(game, 'small');
  }),

  // the current big blind
  currentBig: computed('game.{level,big}', function() {
    const game = get(this, 'game');
    return get(game, 'level') * get(game, 'big');
  }),

  // the current ante
  currentAnte: computed('game.level', function() {
    const game = get(this, 'game');
    const level = get(game, 'level');
    return this.anteForLevel(level);
  }),

  // the upcoming small blind
  nextSmall: computed('game.{level,small}', function() {
    const game = get(this, 'game');
    return (get(game, 'level') + 1) * get(game, 'small');
  }),

  // the upcoming big blind
  nextBig: computed('game.{level,big}', function() {
    const game = get(this, 'game');
    return (get(game, 'level') + 1) * get(game, 'big');
  }),

  // the upcoming ante
  nextAnte: computed('game.level', function() {
    const game = get(this, 'game');
    const level = get(game, 'level') + 1;
    return this.anteForLevel(level);
  }),

  actions: {

    // start a game
    play() {
      let game = get(this, 'game');
      const started = get(game, 'started');

      if (isEmpty(started)) {
        set(game, 'started', Math.round(new Date().getTime() / 1000.0));
        set(game, 'finished', null);
        set(game, 'clock', 0);
      }

      set(game, 'running', true);

      // TODO save game
      get(this, 'gameClock').perform();
    },

    // pause game
    pause() {
      let game = get(this, 'game');
      set(game, 'running', false);

      // TODO save game
    },

    // stop game
    stop() {
      let game = get(this, 'game');
      set(game, 'running', false);
      set(game, 'finished', Math.round(new Date().getTime() / 1000.0));
      set(game, 'clock', 0);
      get(this, 'gameClock').cancelAll();

      // TODO save game

      // close modal and transition back to games
      this.closeModal();
      get(this, 'router').transitionTo('index');
    },

    // prompt the user about ending the game
    promptToEndGame() {
      set(this, 'showEndGameModal', true);
    },

    // close the end game modal
    closeEndGameModal() {
      this.closeModal();
    }
  },

  // pad timers to two digits
  pad(value, length) {
    return value.toString().length < length ? this.pad(`0${value}`, length) : value;
  },

  // find ante for given level
  anteForLevel(level) {
    const game = get(this, 'game');
    const start = get(this, 'anteStartsAt');
    if (level < start || !get(game, 'ante')) {
      return 0;
    }

    const normalized = (level - start) + 1;
    const small = get(game, 'small');
    return normalized * small;
  },

  // close the end game modal
  closeModal() {
    set(this, 'showEndGameModal', false);
  },

  // keep track of game clock
  gameClock: task(function* () {
    let game = get(this, 'game');
    while (get(game, 'running')) {
      yield timeout(1000);
      set(game, 'clock', get(game, 'clock') + 1);
      this.update();
    }
  }),

  // update game attributes
  update() {
    const game = get(this, 'game');
    const secondsInRound = (get(game, 'round') * 60) - get(game, 'clock');
    const minutes = Math.floor(secondsInRound / 60);
    const seconds = secondsInRound - (minutes * 60);

    set(this, 's', this.pad(seconds, 2));
    set(this, 'm', this.pad(minutes, 2));

    if (secondsInRound === 0) {
      set(game, 'clock', 0);
      set(game, 'level', get(game, 'level') + 1);
    }
  }

});
