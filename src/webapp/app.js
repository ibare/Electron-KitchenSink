define([], function() {
  return Backbone.Router.extend({
    routes: {
    },

    initialize: function() {
      console.log('ready');

      Backbone.history.start();
    }
  });
});
