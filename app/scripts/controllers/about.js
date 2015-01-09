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
	'creditsData',
	function ($scope, $location, soundcloudService, creditsData) {

	soundcloudService.stopSongs();

	creditsData.getData().then(function(data){
		$scope.disc1 = data.data[0].disc1;
		$scope.disc2 = data.data[1].disc2;
	});

	


}]);

