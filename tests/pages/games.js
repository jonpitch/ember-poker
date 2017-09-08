import {
  create,
  visitable,
  text,
  isVisible,
  collection,
  clickable
} from 'ember-cli-page-object';

const url = '/';
const addUrl = '/game/add';

export default create({
  url,
  addUrl,
  visit: visitable(url),

  title: {
    scope: 'h2[data-test="title"]',
    text: text(),
    isVisible: isVisible()
  },

  empty: {
    scope: 'p[data-test="no-games"]',
    text: text(),
    isVisible: isVisible()
  },

  add: {
    scope: 'games-list button.md-fab',
    isVisible: isVisible(),
    click: clickable()
  },

  games: collection({
    itemScope: 'md-list-item.game-item',
    item: {
      click: clickable('> div > button'),
      name: {
        scope: 'h3',
        text: text(),
        isVisible: isVisible()
      },
      delete: clickable('md-icon[aria-label="delete"]')
    }
  })
});
