import Ember from 'ember';
import config from './config/environment';
const {
  Router: AppRouter
} = Ember;

const Router = AppRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('game', function() {
    this.route('detail', { path: '/:id' });
    this.route('add');
  });
});

export default Router;
