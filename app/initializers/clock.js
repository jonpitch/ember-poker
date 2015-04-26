import Ember from 'ember';

var Clock = Ember.Object.extend({

  _seconds: 0,
  pulse: Ember.computed.oneWay('_seconds').readOnly(),

  tick: function () {
    var clock = this;
    setTimeout(Ember.run.bind(clock, function () {
      var seconds = this.get('_seconds');
      this.set('_seconds', seconds + 1);
    }), 1000);
  }.observes('_seconds').on('init')

});

export function initialize(container, application) {
  application.register('clock:main', Clock);

  // inject into all controllers and components
  application.inject('controller', 'clock', 'clock:main');
  application.inject('component', 'clock', 'clock:main');
}

export default {
  name: 'clock',
  initialize: initialize
};
