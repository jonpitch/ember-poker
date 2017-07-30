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
  ante: attr('boolean', { defaultValue: false })
});
