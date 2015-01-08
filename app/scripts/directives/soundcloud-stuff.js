'use strict';
/* global SC:false */
/* global soundManager */
/* global $:false */

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:soundcloudStuff
 * @description
 * # soundcloudStuff
 */
angular.module('variousAssetsApp').directive('soundcloudStuff', [
	'$rootScope',
	'$interval',
	'$timeout',
	'soundcloudService',
	function ($rootScope, $interval, $timeout, soundcloudService) {


		var link = function($scope, elements, attrs){

			var playlistId = attrs.playlist;

			if (attrs.secret){
				var secret = attrs.secret;
			}
			else{
				var secret = null;
			}
			


			//default value, used in play-status directive as well. watch set in controller
			$scope.globalSongPlaying = false;

			//flag to make sure button only is activiated once cd is in
			$scope.loadedFirstSong = false;

			


			soundcloudService.init(playlistId, secret).then(function(data){
				
				$scope.tracks = data;

				//get ref to artwork using first track in array as parent
				var artwork = data[0].artwork_url;

				//resize artwork, based on soundcloud using "large" as default
				artwork = artwork.slice(0,-9);

				//add new size
				$scope.tracks.artwork = artwork + 't500x500.jpg';

				$rootScope.$broadcast('dataLoaded');

			});

		};




		return {
			restrict: 'A',
			link: link

		};
}]);
