import stringToSeconds from 'showtime/utils/string-to-seconds';
import { module, test } from 'qunit';

module('Unit | Utility | string to seconds');

test('seconds only', function(assert) {
  let result = stringToSeconds('5');
  assert.equal(result, 5);
});

test('minutes seconds', function(assert) {
  let result = stringToSeconds('1 5');
  assert.equal(result, 65);
});

test('colon notation: minutes:seconds', function(assert) {
  let result = stringToSeconds('1:5');
  assert.equal(result, 65);
});

test('full text notation: 1m 5s', function(assert) {
  let result = stringToSeconds('1m 5s');
  assert.equal(result, 65);
});

