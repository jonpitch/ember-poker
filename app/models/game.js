import DS from 'ember-data';

export default DS.Model.extend({

  // game basics
  name: DS.attr('string'),
  smallBlind: DS.attr('number'),
  bigBlind: DS.attr('number'),
  ante: DS.attr('boolean'),

  round: DS.attr('number', { defaultValue: 1 }),
  inProgress: DS.attr('boolean', { defaultValue: false }),

  // computed properties

  // the current small blind
  currentSmallBlind: function () {
    var blinds = this.get('blinds');
    var round = this.get('round');

    return blinds[round].small;
  }.property('round', 'blinds'),

  // the current big blind
  currentBigBlind: function () {
    var blinds = this.get('blinds');
    var round = this.get('round');

    return blinds[round].big;
  }.property('round', 'blinds'),

  // the next small blind
  nextSmallBlind: function () {
    var blinds = this.get('blinds');
    var round = this.get('round');

    return blinds[round + 1].small;
  }.property('round', 'blinds'),

  // the next big blind
  nextBigBlind: function () {
    var blinds = this.get('blinds');
    var round = this.get('round');

    return blinds[round + 1].big;
  }.property('round', 'blinds'),

  // get the current ante
  currentAnte: function () {
    var ante = this.get('ante');
    if (!ante) {
      return;
    }

    var blinds = this.get('blinds');
    var round = this.get('round');
    return blinds[round].ante;
  }.property('ante', 'round', 'blinds'),

  // get the next ante
  nextAnte: function () {
    var ante = this.get('ante');
    if (!ante) {
      return;
    }

    var blinds = this.get('blinds');
    var round = this.get('round');
    return blinds[round + 1].ante;
  }.property('ante', 'round', 'blinds'),

  // the next round
  nextRound: function () {
    var round = this.get('round');
    return round += 1;
  }.property('round'),

  // calculate blinds table for the game
  blinds: function () {
    var totalRounds = 20;   // TODO configurable
    var anteStartRound = 4; // TODO configurable
    var blinds = [];
    var currentSmall = this.get('smallBlind');
    var currentBig = this.get('bigBlind');

    for (var r = 1; r <= totalRounds; r++) {
      blinds[r] = {
        small: currentSmall,
        big: currentBig,
        // TODO progressive ante by round
        // TODO ante relative to blinds
        ante: this.get('ante') && r >= anteStartRound ? 1 : null
      };
      currentSmall += this.get('smallBlind');
      currentBig += this.get('bigBlind');
    }

    return blinds;
  }.property('smallBlind', 'bigBlind', 'ante')

});
