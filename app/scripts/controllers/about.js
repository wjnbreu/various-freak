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

	var isPlaying = soundcloudService.isPlaying();

	if (!isPlaying){
		//just for safety, we kill all soundcloud references if the player is not already playing
		soundcloudService.stopSongs();
	}


	creditsData.getData().then(function(data){
		$scope.disc1 = data.data[0].disc1;
		$scope.disc2 = data.data[1].disc2;
	});

	$scope.goto = function(path){
		$location.path(path);
	};

	


}]);

