import DS from 'ember-data';

export default DS.Model.extend({
  show:     DS.belongsTo('show'),
  position: DS.attr('number'),
  name:     DS.attr('string'),
  length:   DS.attr('number'),  // in seconds
});
