'use strict';

/**
 * @ngdoc function
 * @name variousAssetsApp.controller:SongCtrl
 * @description
 * # SongCtrl
 * Controller of the variousAssetsApp
 */
angular.module('variousAssetsApp')
  .controller('SongCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
