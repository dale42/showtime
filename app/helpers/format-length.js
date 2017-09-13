import Ember from 'ember';
import moment from 'moment';

export function formatLength([length]) {
  if (!length) return '';
  return moment.duration(length, 'seconds').format('h[h] m[m] s[s]')
    .replace(' 0m 0s', ' ').replace(' 0s', ' ');
}

export default Ember.Helper.helper(formatLength);
