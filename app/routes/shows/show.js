// app/routes/shows/show.js

import Ember from 'ember';
import secondsToDisplayLength from '../../utils/seconds-to-display-length';
import FileSaver from "npm:file-saver";

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('show', params.id);
  },

  actions: {
    // NOTE: deleteElement action is on controller because of modal dialog

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
    },

    saveAsText() {
      const show = this.controller.get('model');
      const showName = show.get('name');
      const longestNameLength = show.get('elements').reduce((longestLength, element) => {
        const nameLength = element.get('name').length;
        return (nameLength > longestLength) ? nameLength : longestLength;
      }, 0);

      let output = [];
      output.push(`${showName}\r\n`);
      output.push('='.repeat(showName.length) + '\r\n\r\n');
      output.push('Run time: ' + secondsToDisplayLength(this.controller.get('totalTime')) + '\r\n\n');
      show.get('elements').forEach(element => {
        const elementDisplayWidth = longestNameLength + 2;
        const displayElement = element.get('name') + ' '.repeat(elementDisplayWidth - element.get('name').length);
        const displayLength = secondsToDisplayLength(element.get('length'));
        output.push(`- ${displayElement}${displayLength}\r\n`);
      });

      let blob = new Blob(output, {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, `${showName}.txt`);
    }

  }

});
