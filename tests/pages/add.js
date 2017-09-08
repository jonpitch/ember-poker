import {
  create,
  visitable,
  isVisible,
  text,
  fillable,
  value,
  hasClass,
  collection,
  attribute,
  clickable
} from 'ember-cli-page-object';

const url = '/game/add';

export default create({
  url,
  visit: visitable(url),

  header: {
    scope: 'h2',
    isVisible: isVisible(),
    text: text()
  },

  form: {
    name: {
      scope: 'md-input-container#game-name',
      label: {
        scope: 'label[for="input-game-name"]',
        text: text()
      },
      input: {
        scope: 'input#input-game-name',
        fillIn: fillable(),
        value: value(),
        invalid: hasClass('ng-invalid')
      },
      errors: collection({
        itemScope: 'div.paper-input-error',
        item: {
          message: text()
        }
      })
    },
    small: {
      scope: 'md-input-container#small-blind',
      label: {
        scope: 'label[for="input-small-blind"]',
        text: text()
      },
      input: {
        scope: 'input#input-small-blind',
        fillIn: fillable(),
        value: value(),
        disabled: attribute('disabled'),
        invalid: hasClass('ng-invalid')
      },
      errors: collection({
        itemScope: 'div.paper-input-error',
        item: {
          message: text()
        }
      })
    },
    big: {
      scope: 'md-input-container#big-blind',
      label: {
        scope: 'label[for="input-big-blind"]',
        text: text()
      },
      input: {
        scope: 'input#input-big-blind',
        fillIn: fillable(),
        value: value(),
        disabled: attribute('disabled'),
        invalid: hasClass('ng-invalid')
      },
      errors: collection({
        itemScope: 'div.paper-input-error',
        item: {
          message: text()
        }
      })
    },
    time: {
      scope: 'md-input-container#round-time',
      label: {
        scope: 'label[for="input-round-time"]',
        text: text()
      },
      input: {
        scope: 'input#input-round-time',
        fillIn: fillable(),
        value: value(),
        invalid: hasClass('ng-invalid')
      },
      errors: collection({
        itemScope: 'div.paper-input-error',
        item: {
          message: text()
        }
      })
    },
    ante: {
      scope: 'md-checkbox#ante',
      isVisible: isVisible(),
      label: text('div.md-label > span'),
      isChecked: hasClass('md-checked'),
      check: clickable('div.md-ink-ripple')
    },
    add: {
      scope: 'button#add-game',
      label: text(),
      isVisible: isVisible(),
      disabled: attribute('disabled'),
      click: clickable()
    }
  }
});
