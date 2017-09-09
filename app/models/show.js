import DS from 'ember-data';

export default DS.Model.extend({
  name:       DS.attr('string'),
  slotLength: DS.attr('number'),
  startTime:  DS.attr('string'),
  elements:   DS.hasMany('element')
});
