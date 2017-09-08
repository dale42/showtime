// app/controllers/shows/index.js

import Ember from 'ember';
import stringToSeconds from '../../utils/string-to-seconds';

export default Ember.Controller.extend({
  showToDelete: null,
  displayShowForm: false,
  sortProperties: ['name:asc'],

  showList: Ember.computed.sort('model', 'sortProperties'),

  length: Ember.computed('inputLength', function () {
    return stringToSeconds(this.get('inputLength')).toString();
  }),

  actions: {
    deleteShow(show) {
      return show.destroyRecord()
        .then(() => {
          this.set('showToDelete', null);
        });
    },
  }

});
