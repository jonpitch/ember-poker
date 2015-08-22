import Ember from 'ember';

let Clock = Ember.Object.extend({

  _seconds: 0,
  pulse: Ember.computed.oneWay('_seconds').readOnly(),

  tick: function() {
    setTimeout(Ember.run.bind(this, () => {
      let seconds = this.get('_seconds');
      this.set('_seconds', seconds + 1);
    }), 1000);
  }.observes('_seconds').on('init')

});

export function initialize(container, application) {
  application.register('poker:clock', Clock);

  // inject into all controllers and components
  application.inject('controller', 'clock', 'poker:clock');
  application.inject('component', 'clock', 'poker:clock');
}

export default {
  name: 'clock',
  initialize: initialize
};
