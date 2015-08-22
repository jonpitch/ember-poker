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
  }.property('hasAnte', 'round', 'smallIncrement', 'anteThreshold', 'anteCounter')

});
