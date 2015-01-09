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
	'historyService',
	function ($scope, $location, soundcloudService, historyService) {

		
		soundcloudService.stopSongs();

		//store ref to to this page for history
		historyService.storePastLocation($location.path());
		
		$scope.goto = function(path){
			$location.path(path);
		};
		
	}
]);