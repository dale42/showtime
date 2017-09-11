import Ember from 'ember';
import parseStringToSeconds from '../utils/parse-string-to-seconds';
import secondsToDisplayLength from '../utils/seconds-to-display-length';

export default Ember.Component.extend({

  // Initial form variable values
  name: '',
  inputSlotLength: '',
  dialogTitle: '',
  submitButtonText: '',

  slotLength: Ember.computed('inputSlotLength', function () {
    return parseStringToSeconds(this.get('inputSlotLength'));
  }),

  slotLengthErrorMessage: Ember.computed('inputSlotLength', function () {
    const slotLength = this.get('slotLength');
    const slotLengthHasInput  = (this.get('inputSlotLength').length > 0);
    if (slotLengthHasInput && !slotLength.isValid) {
      return slotLength.errorMsg;
    }
    return '';
  }),

  isSubmitButtonDisabled: Ember.computed('name', 'inputSlotLength', function () {
    const nameLength        = this.get('name').length;
    const inputSlotLength   = this.get('inputSlotLength').length;
    const isSlotLengthValid = this.get('slotLength').isValid;

    if (nameLength > 0 && inputSlotLength === 0) {
      return false;
    } else if (nameLength > 0 && inputSlotLength > 0 && isSlotLengthValid) {
      return false;
    }

    return true;
  }),

  actions: {
    setupForm() {
      const show = this.get('show');
      if (show === null) {
        // New Show
        this.set('dialogTitle', 'Create show');
        this.set('submitButtonText', 'Create');
        this.set('name', '');
        this.set('inputSlotLength', '');
        this.set('startTime', '');
      } else {
        // Editing existing show
        this.set('dialogTitle', 'Edit: ' + show.get('name'));
        this.set('submitButtonText', 'Update');
        const slotLength = (show.get('slotLength') === 0) ? '' : secondsToDisplayLength(show.get('slotLength'));
        this.set('name', show.get('name'));
        this.set('inputSlotLength', slotLength);
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
      show.set('slotLength', this.get('slotLength').duration);
      show.set('startTime', form.startTime);

      return show.save().then(function () {
        if (gotoShow) {
          controller.transitionToRoute('shows.show', show);
        }
      });

    }
  }
});
