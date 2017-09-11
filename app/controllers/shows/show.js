// app/controllers/shows/show.js

import Ember from 'ember';
import stringToSeconds from '../../utils/string-to-seconds';
import parseStringToSeconds from '../../utils/parse-string-to-seconds';
import secondsToDisplayLength from '../../utils/seconds-to-display-length';

export default Ember.Controller.extend({
  displayShowForm: false,

  elementToDelete: null,

  name:         '',
  inputLength:  '',

  elementToEdit:    null,
  editInputName:    '',
  editInputLength:  '',

  isAddElementDisabled: Ember.computed('name', 'inputLength', function () {
    const name        = this.get('name');
    const inputLength = this.get('inputLength');
    const length      = this.get('length');

    if (name === '') {
      return true;
    }
    // It's ok to enter an empty value for length, but if something is entered
    // it needs to be correct.
    if (inputLength.length > 0 && !length.isValid) {
      return true;
    }

    return false;
  }),

  length: Ember.computed('inputLength', function () {
    return parseStringToSeconds(this.get('inputLength'));
  }),

  lengthErrorClass: Ember.computed('length', function () {
    const invalidLength   = !this.get('length').isValid;
    const lengthHasInput  = (this.get('inputLength').length > 0);
    if (lengthHasInput && invalidLength) {
      return 'has-error';
    }
    return '';
  }),

  lengthErrorMessage: Ember.computed('length', function () {
    const length          = this.get('length');
    const lengthHasInput  = (this.get('inputLength').length > 0);
    if (lengthHasInput && !length.isValid) {
      return length.errorMsg;
    }
    return '';
  }),

  editLength: Ember.computed('editInputLength', function () {
    return stringToSeconds(this.get('editInputLength')).toString();
  }),

  elementStartTime: Ember.computed('model.elements.@each.length', function() {
    let startTimes = [0]; // Prime 1st element to start at 0
    let runningTotal = 0;

    // The first element of model.elements provides the start time for startTime[1]
    // because array primed with 0.
    this.get('model.elements').forEach((element) => {
      const start = runningTotal + parseInt(element.get('length'), 10);
      startTimes.push(start);
      runningTotal = start;
    });

    return startTimes;
  }),

  totalTime: Ember.computed('model.elements.@each.length', function() {
    let total = 0;

    this.get('model.elements').forEach((element) => {
      var length = parseInt(element.get('length'), 10);
      total += length;
    });

    return total;
  }),

  overUnder: Ember.computed('model.elements.@each.length', 'model.slotLength', function() {
    return this.get('totalTime') - this.get('model').get('slotLength');
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
