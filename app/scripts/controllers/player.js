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
	'$sce',
	'$rootScope',
	'$location',
	'browserprefix',
	function ($scope, $sce, $rootScope, $location, browserprefix){

		//used for spinner
		$scope.ready = false;

		//holds current play state
		$scope.current = {};

		//enables play pause for first time
		$scope.loadedFirstSong = false;



		//soundcloud id
		$scope.client = '895ed2c967a25411c75f5bce576b11f5';
		$scope.playlistId = '20083427';

		//fake default width
		$scope.listWidth = 15000;
		
		//returns prefix for CSS3 transforms
		$scope.browser = browserprefix.getPrefix();

		//checks local storage capabilities




	

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

				//drops loading page
				$scope.ready = true;

			});
		});
}]);
