/* global Materialize */
import Ember from 'ember';

var Toast = Ember.Object.extend({

  // TODO provide support for actions in the toast, e.g. "Undo", "Close", etc.

  // Show an informational toast
  info: function (message, length, style, callback) {
    this.show(message, length, style, callback, 'mdi-action-info-outline');
  },

  // Show an error toast
  error: function (message, length, style, callback) {
    this.show(message, length, style, callback, 'mdi-alert-warning');
  },

  // Wrapper for the Materialize toast
  show: function (message, displayLength, className, callback, icon) {
    // a message is required
    if (Ember.isEmpty(message)) {
      return;
    }

    // default values if not specified
    var timeout = Ember.isEmpty(displayLength) ? 2000 : displayLength;
    var style = Ember.isEmpty(className) ? '' : className;
    var action = !Ember.isEmpty(callback) && Ember.$.isFunction(callback) ?
      callback : null;

    // showing an icon?
    if (!Ember.isEmpty(icon)) {
      var html = '<i class="' + icon + '"></i>&nbsp;&nbsp;';
      message = html + message;
    }

    // cheers!
    Materialize.toast(message, timeout, style, action);
  }
});

export function initialize(container, application) {
  application.register('toast:main', Toast);

  // inject into all controllers and components
  application.inject('controller', 'toast', 'toast:main');
  application.inject('component', 'toast', 'toast:main');
}

export default {
  name: 'toast',
  initialize: initialize
};
