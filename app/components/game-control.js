import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'game-control',

  // basic game info
  small: 5,
  big: function() {
    return this.get('small') * 2;
  }.property('small'),
  time: 20,
  ante: true,
  gameStarted: false,
  roundInProgress: false,

  gameHours: '00',
  gameMinutes: '00',
  gameSeconds: '00',
  roundHours: '00',
  roundMinutes: '00',
  roundSeconds: '00',

  gameTimer: function() {
    const total = this.get('gameClock');
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total - (hours * 3600)) / 60);
    const seconds = total - (hours * 3600) - (minutes * 60);

    this.set('gameSeconds', this.pad(seconds, 2));
    this.set('gameMinutes', this.pad(minutes, 2));
    this.set('gameHours', this.pad(hours, 2));
  }.observes('gameClock'),

  roundTimer: function() {
    const total = this.get('roundClock');
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total - (hours * 3600)) / 60);
    const seconds = total - (hours * 3600) - (minutes * 60);

    this.set('roundSeconds', this.pad(seconds, 2));
    this.set('roundMinutes', this.pad(minutes, 2));
    this.set('roundHours', this.pad(hours, 2));

    // TODO show a visual warning when the round is about to increase
    // TODO round timer should count down not up, user preference for either?
  }.observes('roundClock'),

  actions: {

    // start game clock, start/resume round timer
    start() {
      const started = this.get('gameStarted');
      if (!started) {
        this.set('gameStarted', true);
      }

      this.set('roundInProgress', !this.get('roundInProgress'));
    },

    // end the game
    stop() {
      // TODO prompt user if they're sure

      // reset
      this.setProperties({
        _round: 0,
        _game: 0,
        gameStarted: false,
        roundInProgress: false,
        gameHours: '00',
        gameMinutes: '00',
        gameSeconds: '00',
        roundHours: '00',
        roundMinutes: '00',
        roundSeconds: '00',
        small: 5,
        time: 20,
        ante: true
      });

      // remove card reveal
      this.$('.card-title').click();
    }
  },

  // timer functionality
  _seconds: 0,
  _round: 0,
  _game: 0,
  gameClock: Ember.computed.oneWay('_game').readOnly(),
  roundClock: Ember.computed.oneWay('_round').readOnly(),

  tick: function() {
    setTimeout(Ember.run.bind(this, () => {
      const seconds = this.get('_seconds');
      const game = this.get('_game');
      const round = this.get('_round');

      // pulse
      this.set('_seconds', seconds + 1);

      // keep track of total time if game has started
      if (this.get('gameStarted')) {
        this.set('_game', game + 1);
      }

      // if game has not been paused, track round time
      if (this.get('roundInProgress')) {
        this.set('_round', round + 1);
      }
    }), 1000);
  }.observes('_seconds').on('init'),

  // pad timers to two digits
  pad: function(value, length) {
    return (value.toString().length < length) ? this.pad('0' + value, length) : value;
  },

});
