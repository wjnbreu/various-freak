'use strict';

/**
 * @ngdoc function
 * @name variousAssetsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the variousAssetsApp
 */
angular.module('variousAssetsApp').controller('AboutCtrl', ['$scope', '$location', 'soundcloudService', function ($scope, $location, soundcloudService) {

	soundcloudService.stopSongs();

	$scope.goto = function(path){
		$location.path(path);
	};
}]);

