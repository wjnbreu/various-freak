'use strict';

/**
 * @ngdoc function
 * @name variousAssetsApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the variousAssetsApp
 */
angular.module('variousAssetsApp').controller('PlayerCtrl', [
	'$scope',
	'$rootScope',
	'$sce',
	'$location',
	'soundcloudService',
	function ($scope, $rootScope, $sce,  $location, soundcloudService){

		//used for spinner
		$scope.ready = false;


		//fake default width
		$scope.listWidth = 15000;
		


		//drop loader
		$rootScope.$on('dataLoaded', function(msg, data){
			$scope.ready = true;
		});
		

	

		//safety
		$scope.trust = function(src){
			return $sce.trustAsResourceUrl(src + '?client_id=' + $scope.client);
		};

		//safety
		$scope.download = function(url){
			return $sce.trustAsResourceUrl(url + '?client_id=' + $scope.client);
		};

		//serve big version of soundcloud image
		$scope.enlarge = function(src){
			src = src.slice(0,-9);
			src = src + 't500x500.jpg';
			return $sce.trustAsResourceUrl(src + '?client_id=' + $scope.client);
		}

		$scope.goto = function(path){
			$location.path(path);
		};
}]);
