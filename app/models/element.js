import DS from 'ember-data';

export default DS.Model.extend({
  show:     DS.belongsTo('show'),
  name:     DS.attr('string'),
  length:   DS.attr('number'),  // in seconds
});
