
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('format-start-time', 'helper:format-start-time', {
  integration: true
});

test('Relative time', function(assert) {
  this.set('startTime', '');
  this.set('startOffset', 122);

  this.render(hbs`{{format-start-time startTime startOffset}}`);

  assert.equal(this.$().text().trim(), '00:02:02');
});

test('Absolute time', function(assert) {
  this.set('startTime', '8pm');
  this.set('startOffset', 122);

  this.render(hbs`{{format-start-time startTime startOffset}}`);

  assert.equal(this.$().text().trim(), '8:02:02 pm');
});

