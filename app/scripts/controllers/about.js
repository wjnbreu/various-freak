'use strict';

/**
 * @ngdoc function
 * @name variousAssetsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the variousAssetsApp
 */
angular.module('variousAssetsApp').controller('AboutCtrl', [
	'$scope',
	'$location',
	'soundcloudService',
	'historyService',
	function ($scope, $location, soundcloudService, historyService) {

	soundcloudService.stopSongs();

	

	
}]);

