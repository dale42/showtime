// app/routes/shows.js

import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('show');
  },

});
