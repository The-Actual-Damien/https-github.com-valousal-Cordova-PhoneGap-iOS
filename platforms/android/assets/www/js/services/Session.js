angular.module('Application').factory('Session', function() {
    var savedData;
    savedData = new Array;
    return {
      set: function(key, data) {
        return savedData[key] = data;
      },
      get: function(key) {
        return savedData[key];
      }
    };
  });
