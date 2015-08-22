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
  gameStarted: true,
  gameInProgress: true,
  totalGameSeconds: 0,
  totalRoundSeconds: 0,
  gameSeconds: 0,
  gameMinutes: 0,
  gameHours: 0,
  roundSeconds: 0,
  roundMinutes: 0,
  roundHours: 0,

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

    this.set('roundSeconds', seconds);
    this.set('roundMinutes', minutes);
    this.set('roundHours', hours);
  }.observes('totalRoundSeconds'),

  pad: function(value, length) {
    return (value.toString().length < length) ? this.pad('0' + value, length) : value;
  }

});
