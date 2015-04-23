/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  sassOptions: {
    includePaths: ['bower_components/materialize/sass']
  }
});

module.exports = app.toTree();
