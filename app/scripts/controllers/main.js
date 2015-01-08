'use strict';

/**
 * @ngdoc function
 * @name variousAssetsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the variousAssetsApp
 */
angular.module('variousAssetsApp').controller('MainCtrl', [
	'$scope',
	'$location',
	'soundcloudService',
	function ($scope, $location, soundcloudService) {

		
		soundcloudService.stopSongs();
		
		$scope.goto = function(path){
			$location.path(path);
		};
		
	}
]);