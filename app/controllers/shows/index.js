// app/controllers/shows/index.js

import Ember from 'ember';

export default Ember.Controller.extend({
  showToDelete: null,
  displayShowForm: false,
  sortProperties: ['name:asc'],

  showList: Ember.computed.sort('model', 'sortProperties'),

  actions: {
    deleteShow(show) {
      return show.destroyRecord()
        .then(() => {
          this.set('showToDelete', null);
        });
    },
  }

});
