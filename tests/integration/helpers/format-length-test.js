
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('format-length', 'helper:format-length', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', 1234);

  this.render(hbs`{{format-length inputValue}}`);

  assert.equal(this.$().text().trim(), '20m 34s');
});

