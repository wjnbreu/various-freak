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
	function ($scope, $location) {

		$scope.goto = function(path){
			$location.path(path);
		};
		
	}
]);