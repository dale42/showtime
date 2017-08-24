import Ember from 'ember';
import stringToSeconds from '../../utils/string-to-seconds';

export default Ember.Controller.extend({

  length: Ember.computed('inputLength', function () {
    return stringToSeconds(this.get('inputLength')).toString();
  })

});
