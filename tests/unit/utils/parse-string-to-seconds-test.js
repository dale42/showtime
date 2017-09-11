import parseStringToSeconds from 'showtime/utils/parse-string-to-seconds';
import { module, test } from 'qunit';

module('Unit | Utility | parse string to seconds');

test('Empty string input', function(assert) {
  let result = parseStringToSeconds('');
  assert.ok(isNaN(result.duration));
  assert.notOk(result.isValid);
  assert.equal(result.errorMsg, 'Input is an empty string')
});

test('Input string: 0', function(assert) {
  let result = parseStringToSeconds('0');
  assert.equal(result.duration, 0);
  assert.ok(result.isValid);
  assert.equal(result.errorMsg, null)
});

test('Positional notation: seconds only', function(assert) {
  let result = parseStringToSeconds('5');
  assert.equal(result.duration, 5);
  assert.ok(result.isValid);
  assert.equal(result.errorMsg, null)
});

test('Positional notation: minutes seconds', function(assert) {
  let result = parseStringToSeconds('1 5');
  assert.equal(result.duration, 65);
  assert.ok(result.isValid);
  assert.equal(result.errorMsg, null)
});

test('Position notation: minutes with space', function(assert) {
  let result = parseStringToSeconds('1 ');
  assert.equal(result.duration, 60);
  assert.ok(result.isValid);
  assert.equal(result.errorMsg, null)
});

test('Position notation: hours minutes seconds', function(assert) {
  let result = parseStringToSeconds('1 1 1');
  assert.equal(result.duration, 3661);
  assert.ok(result.isValid);
  assert.equal(result.errorMsg, null)
});

test('Colon notation: minutes:seconds', function(assert) {
  let result = parseStringToSeconds('1:5');
  assert.equal(result.duration, 65);
  assert.ok(result.isValid);
  assert.equal(result.errorMsg, null)
});

test('Units notation: 1h 1m 5s', function(assert) {
  let result = parseStringToSeconds('1h 1m 1s');
  assert.equal(result.duration, 3661);
  assert.ok(result.isValid);
  assert.equal(result.errorMsg, null)
});

test('Units notation: trailing space 1h', function(assert) {
  let result = parseStringToSeconds('1h ');
  assert.equal(result.duration, 3600);
  assert.ok(result.isValid);
  assert.equal(result.errorMsg, null)
});

test('Units notation: "hr" for hours', function(assert) {
  let result = parseStringToSeconds('1hr');
  assert.equal(result.duration, 3600);
  assert.ok(result.isValid);
  assert.equal(result.errorMsg, null)
});

test('Units notation: Multiple units "1m 1m"', function(assert) {
  let result = parseStringToSeconds('1m 1m');
  assert.ok(isNaN(result.duration));
  assert.notOk(result.isValid);
  assert.equal(result.errorMsg, 'There are multiple values given for minutes')
});

test('Units notation: Invalid unit with time value "1mins"', function(assert) {
  let result = parseStringToSeconds('1mins');
  assert.ok(isNaN(result.duration));
  assert.notOk(result.isValid);
  assert.equal(result.errorMsg, 'I do not understand the unit: mins')
});

test('Units notation: Invalid unit without time value "q"', function(assert) {
  let result = parseStringToSeconds('q');
  assert.ok(isNaN(result.duration));
  assert.notOk(result.isValid);
  assert.equal(result.errorMsg, 'I do not understand the unit: q')
});

test('Units notation: Valid time unit without time: "m"', function(assert) {
  let result = parseStringToSeconds('m');
  assert.ok(isNaN(result.duration));
  assert.notOk(result.isValid);
  assert.equal(result.errorMsg, 'No value given for minutes')
});
