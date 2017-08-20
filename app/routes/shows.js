import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('show');
  },

  actions: {
    addShow(controller) {
      const router = this.get('router');

      let newShow = this.store.createRecord('show', {
        name: controller.get('name'),
      });
      return newShow.save().then(function () {
        controller.set('name', '');
        router.transitionTo('shows.show', newShow);
      });
    },

    deleteShow(show) {
      return show.destroyRecord();
    }

  }

});
