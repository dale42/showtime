import Ember from 'ember';
import stringToSeconds from '../utils/string-to-seconds';
import secondsToDisplayLength from '../utils/seconds-to-display-length';

export default Ember.Component.extend({

  dialogTitle: '',
  submitButtonText: '',

  length: Ember.computed('inputLength', function () {
    return stringToSeconds(this.get('inputLength')).toString();
  }),

  actions: {
    setupForm() {
      const show = this.get('show');
      if (show === null) {
        // New Show
      } else {
        // Editing existing show
        this.set('dialogTitle', 'Edit: ' + show.get('name'));
        this.set('submitButtonText', 'Update');
      }

      this.set('name', show.get('name'));
      this.set('inputLength', secondsToDisplayLength(show.get('length')));
      this.set('startTime', show.get('startTime'));
    },

    saveShow(form) {
      this.set('displayForm', false);

      let gotoShow = false;
      let show = this.get('show');
      if (show === null) {
        show = this.store.createRecord('show');
        gotoShow = true;
      }

      show.set('name', form.name);
      show.set('length', parseInt(this.get('length')), 10);
      show.set('startTime', form.startTime);
      

      return show.save().then(function () {
        if (gotoShow) {
          Ember.Logger.log('go to show page code');
          // controller.transitionToRoute('shows.show', show);
        }
      });

    }
  }
});
