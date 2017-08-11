import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: faker.lorem.words,
  small: 5,
  big: 10,
  round: 20,
  ante: faker.random.boolean
});
