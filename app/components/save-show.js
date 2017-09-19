import Ember from 'ember';
import FileSaver from "npm:file-saver";

export default Ember.Component.extend({
  tagName: 'span',

  actions: {
    save() {
      const show = this.get('show');
      let showData = {
        name:       show.get('name'),
        slotLength: show.get('slotLength'),
        startTime:  show.get('startTime'),
        elements:   []
      };
      show.get('elements').forEach(element => {
        let elementData = {
          name:   element.get('name'),
          length: element.get('length')
        };
        showData.elements.push(elementData);
      });
      let blob = new Blob([JSON.stringify(showData)], {type: "data/plain;charset=utf-8"});
      FileSaver.saveAs(blob, show.get('name') + '.json');
    }
  }

});
