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

		//run qpply since soundcloud is out of digest loop
		$rootScope.$on('tracksReady', function(msg, data){
			$scope.$apply(function(){
				$scope.tracks = data;
			});
		});
	}
]);