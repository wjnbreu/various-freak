'use strict';

/**
 * @ngdoc service
 * @name variousAssetsApp.creditsData
 * @description
 * # creditsData
 * Factory in the variousAssetsApp.
 */
angular.module('variousAssetsApp').factory('creditsData', function ($http) {

  var credits = {};

  var getData = function(){
    return $http.get('credits.json');
  };
  

  // Public API here
  return{
    getData: function(){
      return getData();
    }
  };
});
