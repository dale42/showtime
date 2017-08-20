import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('show', params.id);
  },

  actions: {
    addElement(controller) {
      const show = controller.get('model');

      let newElement = this.store.createRecord('element', {
        name: controller.get('name'),
        length: controller.get('length'),
        show: show
      });
      // show.get('items').pushObject(newItem);
      return newElement.save().then(function () {
        show.save();
        controller.set('name', '');
        controller.set('length', '');
      });
    },

    deleteItem(item) {
      return item.destroyRecord();
    }

  }

});
