import Ember from 'ember';
import stringToSeconds from '../utils/string-to-seconds';
import secondsToDisplayLength from '../utils/seconds-to-display-length';

export default Ember.Component.extend({

  dialogTitle: '',
  submitButtonText: '',

  length: Ember.computed('inputLength', function () {
    return stringToSeconds(this.get('inputLength'));
  }),

  actions: {
    setupForm() {
      const show = this.get('show');
      if (show === null) {
        // New Show
        this.set('dialogTitle', 'Create show');
        this.set('submitButtonText', 'Create');
        this.set('name', '');
        this.set('inputLength', '');
        this.set('startTime', '');
      } else {
        // Editing existing show
        this.set('dialogTitle', 'Edit: ' + show.get('name'));
        this.set('submitButtonText', 'Update');
        const slotLength = (show.get('slotLength') === 0) ? '' : secondsToDisplayLength(show.get('slotLength'));
        this.set('name', show.get('name'));
        this.set('inputLength', slotLength);
        this.set('startTime', show.get('startTime'));
      }
    },

    saveShow(form) {
      this.set('displayForm', false);

      const controller = this.get('controller');
      let gotoShow = false;
      let show = this.get('show');

      if (show === null) {
        show = controller.get('store').createRecord('show');
        gotoShow = true;
      }

      show.set('name', form.name);
      show.set('slotLength', this.get('length'));
      show.set('startTime', form.startTime);

      return show.save().then(function () {
        if (gotoShow) {
          controller.transitionToRoute('shows.show', show);
        }
      });

    }
  }
});
