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
	function ($scope, $sce, $rootScope) {

		//soundcloud id
		$scope.client = '895ed2c967a25411c75f5bce576b11f5';

		$scope.listWidth = 4000;



		$scope.trust = function(src){
			return $sce.trustAsResourceUrl(src + '?client_id=' + $scope.client);
		};

		$scope.download = function(url){
			return $sce.trustAsResourceUrl(url + '?client_id=' + $scope.client);
		};

		$scope.enlarge = function(src){
			src = src.slice(0,-9);
			src = src + 't500x500.jpg';
			return $sce.trustAsResourceUrl(src + '?client_id=' + $scope.client);
		}

		//run qpply since soundcloud is out of digest loop
		$rootScope.$on('tracksReady', function(msg, data){
			$scope.$apply(function(){
				$scope.tracks = data;

				//get a ref to the artwork using first track in array as parent
				$scope.tracks.artwork = data[0].artwork_url;

				//resize the artwork, based on souncloud using "large" as default
				$scope.tracks.artwork = $scope.tracks.artwork.slice(0,-9);

				//now add new size
				$scope.tracks.artwork = $scope.tracks.artwork + 't500x500.jpg';

			});
		});
	}
]);