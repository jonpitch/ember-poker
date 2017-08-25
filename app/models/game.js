import DS from 'ember-data';
import attr from 'ember-data/attr';
const {
  Model
} = DS;

export default Model.extend({
  name: attr('string'),
  small: attr('number'),
  big: attr('number'),
  round: attr('number'),
  level: attr('number', { defaultValue: 1 }),
  started: attr('number'),
  finished: attr('number'),
  clock: attr('number'),
  running: attr('boolean', { defaultValue: false }),
  ante: attr('boolean', { defaultValue: false })
});
