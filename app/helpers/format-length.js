import Ember from 'ember';
import secondsToDisplayLength from '../utils/seconds-to-display-length';

export function formatLength(length) {
  return secondsToDisplayLength(length);
}

export default Ember.Helper.helper(formatLength);
