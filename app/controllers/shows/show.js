import Ember from 'ember';
import stringToSeconds from '../../utils/string-to-seconds';

export default Ember.Controller.extend({

  length: Ember.computed('inputLength', function () {
    return stringToSeconds(this.get('inputLength')).toString();
  }),

  isAddElementDisabled: Ember.computed.empty('name'),

  totalTime: Ember.computed('model.elements.@each.length', function() {
    let total = 0;

    this.get('model.elements').forEach((element) => {
      var length = parseInt(element.get('length'), 10);
      total += length;
    });

    return total;
  })

});
