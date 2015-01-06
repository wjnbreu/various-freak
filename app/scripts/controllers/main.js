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
	'$sce',
	'$rootScope',
	'$location',
	'localStorageService',
	'browserprefix',
	function ($scope, $sce, $rootScope, $location, localStorageService, browserprefix) {

		$scope.goto = function(path){
			$location.path(path);
		};
		
	}
]);