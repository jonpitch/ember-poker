import Ember from 'ember';
import config from 'ember-get-config';
const { guidFor } = Ember;

export default function(server) {
  const games = server.createList('game', 5);
  let data = {
    game: {
      records: { }
    }
  };

  games.map((g) => {
    data.game.records[guidFor(g)] = g;
  });

  localStorage.setItem(config.APP.namespace, JSON.stringify(data));
}
