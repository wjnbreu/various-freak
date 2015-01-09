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

	var prevLocation = historyService.getPrevious();

	$scope.goto = function(){

		//store ref to to this page for history
		historyService.storePastLocation($location.path());
		
		if (prevLocation){
			if (prevLocation === '/player'){
				$location.path('/player');
			}
			else{
				$location.path('/');
			}
		}
		else{
			$location.path('/');
		}
	};
}]);

