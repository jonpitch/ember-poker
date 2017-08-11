import {
  create,
  visitable,
  text,
  isVisible,
  collection,
  clickable
} from 'ember-cli-page-object';

const url = '/';

export default create({
  url,
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
    itemScope: 'games-list md-list > md-list-item',
    item: {
      click: clickable(),
      name: {
        scope: 'h3',
        text: text(),
        isVisible: isVisible()
      }
    }
  })
});
