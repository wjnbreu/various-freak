'use strict';

/**
 * @ngdoc service
 * @name variousAssetsApp.historyService
 * @description
 * # historyService
 * Factory in the variousAssetsApp.
 */
angular.module('variousAssetsApp').factory('historyService', [ function () {

  var pastLocation = '';

  var storePastLocation = function(location){
    pastLocation = location;
  };

  var getPrevious = function(){
      return pastLocation;
  }

  // Public API here
  return {
    storePastLocation: function (location) {
      storePastLocation(location);
    },
    getPrevious: function(){
      return getPrevious();
    }
  };
}]);
