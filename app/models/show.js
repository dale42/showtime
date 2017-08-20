import DS from 'ember-data';

export default DS.Model.extend({
  name:     DS.attr('string'),
  elements: DS.hasMany('element')
});
