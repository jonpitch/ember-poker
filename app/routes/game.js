import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    // TODO
    return {
      small: 5,
      big: 10,
      ante: true,
      minutes: 20
    };
  }
});
