import DS from 'ember-data';

export default DS.Model.extend({

  name: DS.attr('string'),
  startingSmallBlind: DS.attr('number'),
  startingBigBlind: DS.attr('number'),
  hasAnte: DS.attr('boolean')
  
});
