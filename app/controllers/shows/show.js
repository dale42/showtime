// app/controllers/shows/show.js

import Ember from 'ember';
import stringToSeconds from '../../utils/string-to-seconds';
import secondsToDisplayLength from '../../utils/seconds-to-display-length';

export default Ember.Controller.extend({
  displayShowForm: false,

  elementToDelete: null,

  elementToEdit: null,
  editInputName: '',
  editInputLength: '',

  isAddElementDisabled: Ember.computed.empty('name'),

  length: Ember.computed('inputLength', function () {
    return stringToSeconds(this.get('inputLength')).toString();
  }),

  editLength: Ember.computed('editInputLength', function () {
    return stringToSeconds(this.get('editInputLength')).toString();
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
    },

    setupEdit(element) {
      this.set('editInputName', element.get('name'));
      this.set('editInputLength', secondsToDisplayLength(element.get('length')));
    },

    saveElement(element, name, length) {
      element.set('name', name);
      element.set('length', length);
      return element.save()
        .then(() => {
          this.set('elementToEdit', null);
        });
    }
  }

});
