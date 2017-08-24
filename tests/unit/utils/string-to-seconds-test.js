import stringToSeconds from 'showtime/utils/string-to-seconds';
import { module, test } from 'qunit';

module('Unit | Utility | string to seconds');

test('No input', function(assert) {
  let result = stringToSeconds('');
  assert.equal(result, 0);
});

test('seconds only', function(assert) {
  let result = stringToSeconds('5');
  assert.equal(result, 5);
});

test('minutes seconds', function(assert) {
  let result = stringToSeconds('1 5');
  assert.equal(result, 65);
});

test('minutes with space', function(assert) {
  let result = stringToSeconds('1 ');
  assert.equal(result, 60);
});

test('colon notation: minutes:seconds', function(assert) {
  let result = stringToSeconds('1:5');
  assert.equal(result, 65);
});

test('full text notation: 1m 5s', function(assert) {
  let result = stringToSeconds('1m 5s');
  assert.equal(result, 65);
});

test('full text notation interim: 1m ', function(assert) {
  let result = stringToSeconds('1m ');
  assert.equal(result, 60);
});

