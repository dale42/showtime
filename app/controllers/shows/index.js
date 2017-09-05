// app/controllers/shows/index.js

import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: ['name:asc'],

  showList: Ember.computed.sort('model', 'sortProperties'),

  isAddShowDisabled: Ember.computed.empty('name'),

  showToDelete: null,

  showToEdit: null,

  displayShowForm: false,

  inputNameValue: '',

  showFormButtonText: '',

  actions: {
    deleteShow(show) {
      return show.destroyRecord()
        .then(() => {
          this.set('showToDelete', null);
        });
    },

    openShowForm(show) {
      if (show === null) {
        this.set('showFormButtonText', 'Create');
        this.set('showToEdit', null);
      } else {
        this.set('showFormButtonText', 'Save');
        this.set('showToEdit', show);
      }
      this.set('displayShowForm', true);
    },

    populateShowForm() {
      const show = this.get('showToEdit');
      if (show === null) {
        this.set('inputNameValue', '');
      } else {
        this.set('inputNameValue', show.get('name'));
      }
    },

    saveShow(form) {
      const controller = this;
      let doTransition = false;
      this.set('displayShowForm', false);
      let show = this.get('showToEdit');
      if (show === null) {
        show = this.store.createRecord('show');
        doTransition = true;
      }

      show.set('name', form.inputNameValue);

      return show.save().then(function () {
        if (doTransition) {
          controller.transitionToRoute('shows.show', show);
        }
      });
    },

  }

});
