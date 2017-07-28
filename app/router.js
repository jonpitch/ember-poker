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
});

export default Router;
