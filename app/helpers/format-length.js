import Ember from 'ember';
import secondsToDisplayLength from '../utils/seconds-to-display-length';

export function formatLength([length, ...rest]) {
  const format = rest[0] || '';
  return secondsToDisplayLength(length, format);
}

export default Ember.Helper.helper(formatLength);
