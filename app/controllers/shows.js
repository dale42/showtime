import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['name:asc'],
  showList: Ember.computed.sort('model', 'sortProperties'),
  isAddShowDisabled: Ember.computed.empty('name')
});
