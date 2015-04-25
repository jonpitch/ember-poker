import DS from 'ember-data';

export default DS.Model.extend({

  name: DS.attr('string'),
  smallBlind: DS.attr('number'),
  bigBlind: DS.attr('number'),
  ante: DS.attr('boolean')

});
