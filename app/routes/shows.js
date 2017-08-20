import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('show');
  },

  actions: {
    addShow() {
      let controller = this.get('controller');

      let newShow = this.store.createRecord('show', {
        name: controller.get('name'),
      });
      return newShow.save().then(function () {
        controller.set('name', '');
      });
    },

    deleteShow(show) {
      return show.destroyRecord();
    }

  }

});
