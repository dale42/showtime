// app/helpers/format-start-time.js
import Ember from 'ember';
import moment from 'moment';

export function formatStartTime([startTime, startOffset]) {
  let displayTime;
  if (startTime.length === 0) {
    // Relative time
    displayTime = moment.duration(startOffset, 'seconds').format('hh:mm:ss', { forceLength: true, trim: false });
  } else {
    // Absolution time
    displayTime = moment(startTime, 'h:mma').add(startOffset, 'seconds').format('h:mm:ss a');
  }

  return displayTime;
}

export default Ember.Helper.helper(formatStartTime);
