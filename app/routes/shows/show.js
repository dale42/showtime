// app/routes/shows/show.js

import Ember from 'ember';
import moment from 'moment';
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
        length: controller.get('length.duration'),
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
      const show              = this.controller.get('model');
      const showName          = show.get('name');
      const showStart         = show.get('startTime');
      const showLength        = moment.duration(this.controller.get('totalTime'), 'seconds')
                                  .format('h[h] m[m] s[s]').replace(' 0m 0s', '').replace(' 0s', '');
      const slotLength        = moment.duration(show.get('slotLength'), 'seconds')
                                  .format('h[hr] m[m] s[s]').replace(' 0m 0s', '').replace(' 0s', '');
      const elementStartTime  = this.controller.get('elementStartTime');
      const longestNameLength = show.get('elements').reduce((longestLength, element) => {
        const nameLength = element.get('name').length;
        return (nameLength > longestLength) ? nameLength : longestLength;
      }, 0);

      let output = [];
      // Title
      output.push(`${showName}\r\n`);
      output.push('='.repeat(showName.length) + '\r\n\r\n');
      // Show Meta
      output.push(
        ((showStart)  ? `Start: ${showStart} | ` : '') +
        ((slotLength) ? `Slot: ${slotLength} | ` : '') +
        `Length: ${showLength}\r\n\r\n`
      );
      // output.push(`Slot: ${slotLength} / Length: ${showLength}\r\n\n`);
      show.get('elements').forEach((element, position) => {
        const startOffset = elementStartTime[position];
        const startTime = (showStart.length === 0) ?
          moment.duration(startOffset, 'seconds').format('hh:mm:ss', { forceLength: true, trim: false }) :
          moment(showStart, 'h:mma').add(startOffset, 'seconds').format('h:mm:ssa');

        const elementDisplayWidth = longestNameLength + 2;
        const displayElement      = element.get('name')
                                      + ' '.repeat(elementDisplayWidth - element.get('name').length);
        const displayLength       = moment.duration(element.get('length'), 'seconds')
                                      .format('h[h] m[m] s[s]')
                                      .replace(' 0m 0s', ' ').replace(' 0s', ' ');
        output.push(`- ${startTime}  ${displayElement}${displayLength}\r\n`);
      });

      let blob = new Blob(output, {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, `${showName}.txt`);
    }

  }

});
