// app/controllers/shows/show.js

import Ember from 'ember';
import stringToSeconds from '../../utils/string-to-seconds';

export default Ember.Controller.extend({

  elementToDelete: null,

  isAddElementDisabled: Ember.computed.empty('name'),

  length: Ember.computed('inputLength', function () {
    return stringToSeconds(this.get('inputLength')).toString();
  }),

  totalTime: Ember.computed('model.elements.@each.length', function() {
    let total = 0;

    this.get('model.elements').forEach((element) => {
      var length = parseInt(element.get('length'), 10);
      total += length;
    });

    return total;
  }),

  actions: {
    deleteElement(element) {
      element.destroyRecord()
        .then(() => {
          this.set('elementToDelete', null);
        });
      // Work around for issue where model isn't saved when last object deleted
      // from hasMany relationship
      return this.get('model').save();
    }
  }

});
