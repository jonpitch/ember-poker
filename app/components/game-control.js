import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'game-control',

  // properties of model
  round: 1,
  anteThreshold: 4,
  anteCounter: 1,
  smallIncrement: Ember.computed.oneWay('game.small'),
  bigIncrement: Ember.computed.oneWay('game.big'),
  hasAnte: Ember.computed.oneWay('game.ante'),
  minutes: Ember.computed.oneWay('game.minutes'),

  currentSmall: function() {
    const round = this.get('round');
    const increment = this.get('smallIncrement');
    return round * increment;
  }.property('round', 'smallIncrement'),

  currentBig: function() {
    const round = this.get('round');
    const increment = this.get('bigIncrement');
    return round * increment;
  }.property('round', 'bigIncrement'),

  currentAnte: function() {
    const hasAnte = this.get('hasAnte');
    if (!hasAnte) {
      return null;
    } else {
      const round = this.get('round');
      const increment = this.get('smallIncrement');
      const threshold = this.get('anteThreshold');
      const counter = this.get('anteCounter');
      return round > threshold ? counter * increment : null;
    }
  }.property('hasAnte', 'round', 'smallIncrement', 'anteThreshold', 'anteCounter'),

  nextSmall: function() {
    const current = this.get('currentSmall');
    const increment = this.get('smallIncrement');
    return current + increment;
  }.property('smallIncrement', 'currentSmall'),

  nextBig: function() {
    const current = this.get('currentBig');
    const increment = this.get('bigIncrement');
    return current + increment;
  }.property('bigIncrement', 'currentBig'),

  nextAnte: function() {
    const hasAnte = this.get('hasAnte');
    if (!hasAnte) {
      return null;
    } else {
      const round = this.get('round');
      const increment = this.get('smallIncrement');
      const threshold = this.get('anteThreshold');
      const counter = this.get('anteCounter');
      return round > threshold ? (counter + 1) * increment : null;
    }
  }.property('hasAnte', 'round', 'smallIncrement', 'anteThreshold', 'anteCounter'),

  // time properties
  gameStarted: false,
  gameInProgress: false,
  totalGameSeconds: 0,
  totalRoundSeconds: 0,
  gameSeconds: '00',
  gameMinutes: '00',
  gameHours: '00',
  roundSeconds: '00',
  roundMinutes: '00',
  roundHours: '00',

  // keep track of time passed
  clockObserver: function() {
    if (this.get('gameStarted')) {
      this.set('totalGameSeconds', this.get('totalGameSeconds') + 1);
      if (this.get('gameInProgress')) {
        this.set('totalRoundSeconds', this.get('totalRoundSeconds') + 1);
      }
    }
  }.observes('clock.pulse'),

  gameClock: function() {
    const total = this.get('totalGameSeconds');
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total - (hours * 3600)) / 60);
    const seconds = total - (hours * 3600) - (minutes * 60);

    this.set('gameSeconds', this.pad(seconds, 2));
    this.set('gameMinutes', this.pad(minutes, 2));
    this.set('gameHours', this.pad(hours, 2));
  }.observes('totalGameSeconds'),

  roundClock: function() {
    const total = this.get('totalRoundSeconds');
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total - (hours * 3600)) / 60);
    const seconds = total - (hours * 3600) - (minutes * 60);

    this.set('roundSeconds', this.pad(seconds, 2));
    this.set('roundMinutes', this.pad(minutes, 2));
    this.set('roundHours', this.pad(hours, 2));

    // TODO show a visual warning when the round is about to increase
  }.observes('totalRoundSeconds'),

  pad: function(value, length) {
    return (value.toString().length < length) ? this.pad('0' + value, length) : value;
  },

  actions: {

    // user is starting or resuming the game
    go: function() {
      // check if it's the first start of the game
      if (!this.get('gameStarted')) {
        this.set('gameStarted', true);
      }

      // play or resume
      this.set('gameInProgress', !this.get('gameInProgress'));
    },

    // user is stopping the game
    stop: function() {
      // TODO prompt user
      this.setProperties({
        gameStarted: false,
        gameInProgress: false,
        totalGameSeconds: 0,
        totalRoundSeconds: 0,
        gameSeconds: '00',
        gameMinutes: '00',
        gameHours: '00',
        roundSeconds: '00',
        roundMinutes: '00',
        roundHours: '00',
      });

      // redirect back to home screen
      const appController = this.container.lookup('controller:application');
      appController.transitionToRoute('index');
    }
  }

});
