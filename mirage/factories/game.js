import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: faker.lorem.words,
  small: 5,
  big() {
    return this.small * 2;
  },
  round: 20,
  ante: false,
  level: 1,
  started: false,
  finished: false,
  clock: 0,
  running: false
});
