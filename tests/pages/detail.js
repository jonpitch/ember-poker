import {
  create,
  visitable,
  isVisible,
  text,
  clickable
} from 'ember-cli-page-object';

const url = '/game/:id';

export default create({
  visit: visitable(url),

  controls: {
    scope: 'md-card#controls',
    name: {
      scope: 'h2#game-name',
      isVisible: isVisible(),
      text: text()
    },
    minutes: {
      scope: 'span.minutes div.liquid-child',
      text: text(),
      isVisible: isVisible()
    },
    seconds: {
      scope: 'span.seconds div.liquid-child',
      text: text(),
      isVisible: isVisible()
    },
    round: {
      scope: 'span#current-round',
      isVisible: isVisible(),
      text: text()
    },
    end: {
      scope: 'button#end',
      isVisible: isVisible(),
      text: text(),
      click: clickable()
    },
    play: {
      scope: 'button#play',
      isVisible: isVisible(),
      text: text(),
      click: clickable()
    },
    pause: {
      scope: 'buton#pause',
      isVisible: isVisible(),
      text: text(),
      click: clickable()
    }
  },

  current: {
    scope: 'md-card#current-card',
    header: {
      scope: 'h2#current-header',
      text: text(),
      isVisible: isVisible()
    },
    blinds: text('span#current-blinds'),
    ante: text('span#current-ante')
  },

  next: {
    scope: 'md-card#next-card',
    header: {
      scope: 'h2#next-header',
      text: text(),
      isVisible: isVisible()
    },
    blinds: text('span#next-blinds'),
    ante: text('span#next-ante')
  },

  modal: {
    scope: 'md-dialog',
    isVisible: isVisible(),
    ok: clickable('button#modal-ok')
  }
});
