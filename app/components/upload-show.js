import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  isDialogOpen: false,
  file: null,

  isSubmitButtonDisabled: Ember.computed.empty('file'),

  actions: {
    setFile(event) {
      this.set('file', event.target.files[0]);
    },

    uploadFile() {
      this.set('isDialogOpen', false);
      const store = this.get('store');
      const reader = new FileReader();
      const file = this.get('file');

      reader.onload = function (event) {
        Ember.Logger.log(JSON.parse(event.target.result));
        const showData = JSON.parse(event.target.result);
        let newShow = store.createRecord('show', {
          name:       showData.name,
          slotLength: showData.slotLength,
          startTime:  showData.startTime
        });
        newShow.save().then(function () {
          let promiseList = [];
          showData.elements.forEach(element => {
            const newElement = store.createRecord('element', {
              name:   element.name,
              length: element.length,
              show:   newShow
            });
            promiseList.push(newElement.save());
            Ember.RSVP.all(promiseList).then(function () {
              newShow.save();
            })
          });
        });
      };

      if (file) {
        reader.readAsText(file);
      }
    }
  }
});
