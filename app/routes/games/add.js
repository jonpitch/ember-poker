import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    // creating a stub model for validation purposes
    return this.store.createRecord('game');
  },

  actions: {

    // rollback model if user cancels
    willTransition: function (transition) {
      var model = this.get('currentModel');
      if (model && model.get('isDirty')) {
        model.deleteRecord();
      }

      this._super(transition);
    }
  }
});
