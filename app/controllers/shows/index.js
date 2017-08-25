// app/controllers/shows/index.js

import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['name:asc'],

  showList: Ember.computed.sort('model', 'sortProperties'),

  isAddShowDisabled: Ember.computed.empty('name'),

  showToDelete: null,

  actions: {
    deleteShow(show) {
      return show.destroyRecord()
        .then(() => {
          this.set('showToDelete', null);
        });
    }
  }

});
