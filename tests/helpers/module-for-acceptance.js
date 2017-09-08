import { module } from 'qunit';
import Ember from 'ember';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

const { RSVP: { resolve } } = Ember;

export default function(name, options = {}) {
  module(name, {
    beforeEach() {
      this.application = startApp();

      if (options.beforeEach) {
        return options.beforeEach.apply(...arguments);
      }
    },

    afterEach() {
      let afterEach = options.afterEach && options.afterEach.apply(...arguments);
      return resolve(afterEach)
        .then(() => this._shutdownMirage())
        .then(() => this._destroy());
    },

    _shutdownMirage() {
      server.shutdown();
    },

    _destroy() {
      destroyApp(this.application);
    }
  });
}
