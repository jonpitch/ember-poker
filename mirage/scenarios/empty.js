import config from 'ember-get-config';

export default function(/* server */) {
  const data = {
    'game': {
      'records': { }
    }
  };

  localStorage.setItem(config.APP.namespace, JSON.stringify(data));
}
