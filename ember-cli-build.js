/* global require, module */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  const env = EmberApp.env();

  const app = new EmberApp(defaults, {
    // ...
    sassOptions: {
      includePaths: ['bower_components/materialize/sass']
    },

    // jscs
    jscsOptions: {
      enabled: true,
      esnext: true
    }

  });

  // bring in materialize
  app.import('bower_components/materialize/dist/font/roboto/Roboto-Regular.tff', {
    destDir: 'font/roboto'
  });
  app.import('bower_components/materialize/dist/font/roboto/Roboto-Regular.woff', {
    destDir: 'font/roboto'
  });
  app.import('bower_components/materialize/dist/font/roboto/Roboto-Regular.woff2', {
    destDir: 'font/roboto'
  });
  app.import('bower_components/materialize/dist/js/materialize.min.js');

  return app.toTree();
};
