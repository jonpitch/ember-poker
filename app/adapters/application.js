import LSAdapter from 'ember-localstorage-adapter/adapters/ls-adapter';
import config from 'ember-get-config';

export default LSAdapter.extend({
  namespace: config.APP.namespace
});
