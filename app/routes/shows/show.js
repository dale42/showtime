import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('show', params.id);
  },

  actions: {
    // deleteElement action is on controller because of modal dialog

    addElement(controller) {
      const show = controller.get('model');

      let newElement = this.store.createRecord('element', {
        name: controller.get('name'),
        length: controller.get('length'),
        show: show
      });

      return newElement.save().then(function () {
        show.save();
        controller.set('name', '');
        controller.set('inputLength', '');
        Ember.$('#element-name-input').focus();
      });
    },

    reorderElements(groupModel, elementModels) {
      groupModel.set('elements', elementModels);
      groupModel.save();
    }

  }

});
