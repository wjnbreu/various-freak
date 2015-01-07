'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:dropZone
 * @description
 * # dropZone
 */
angular.module('variousAssetsApp').directive('dropZone', ['$rootScope', 'soundcloudService', function ($rootScope, soundcloudService) {

	
	var cds;

	var link = function($scope, element, attrs){


		$scope.playPauseSong = function(){
			console.log('sclick');
			if ($scope.globalSongPlaying){
				soundcloudService.pauseSong();
				$scope.globalSongPlaying = false;
			}
			else{
				if ($scope.loadedFirstSong){
					soundcloudService.resumeSong();
					$scope.globalSongPlaying = true;
				}
			}
		};

		//listeners to control play button color
		$rootScope.$on('songStarted', function(){
			$scope.globalSongPlaying = true;
		});

		$rootScope.$on('songEnded', function(){
			$scope.globalSongPlaying = false;
		});



		element.droppable({
			accept: '.flipper',
			tolerance: 'touch',
			hoverClass: 'ui-state-highlight',
			drop: function(event, ui){

				//only instantiating variable once everything is ready (otherwise, we only have one)
				cds = $('.cd-spin');

				//cancels disappearing cd bug
				$.ui.ddmanager.current.cancelHelperRemoval = true;

				var disc = ui.draggable;

				//grab song id from id of element
				var songId = disc.attr('id');
				console.log(songId);

				var playingItem = $('#' + songId);
				playingItem.find('.cd-spin').addClass('currently-playing');
				
				//use soundcloud directive api
				soundcloudService.playSong(songId);

				//run digest since drop function is out of cycle
				
				$scope.$apply(function(){
					$scope.globalSongPlaying = true;
					$scope.loadedFirstSong = true;
				});


				var bringCDsBack = function(){
					cds.each(function(){
						var t = $(this);
						if (t.hasClass('currently-playing')){
							//if target is currently in player, do nothing
							if (t.parent().is('#' + songId)){
								return;
							}
							else{
								t.removeClass('currently-playing');
								t.transition({
									y: 0
								},760);
							}	
						}
					});
				};

				//make sure element is totally offscreen
				playingItem.find('.cd-spin').transition({
					y: '-2000px'
				},2000, bringCDsBack());

			}
		});
	}


	return {
		restrict: 'A',
		link: link
	};
}]);
