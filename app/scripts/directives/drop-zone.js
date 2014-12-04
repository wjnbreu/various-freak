'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:dropZone
 * @description
 * # dropZone
 */
angular.module('variousAssetsApp').directive('dropZone', ['$rootScope', function ($rootScope) {

	var link = function($scope, element, attrs, soundcloudStuffCtrl){

		if ($scope.ready){
			console.log('were ready')
		}


		element.droppable({
			accept: '.flipper',
			tolerance: 'touch',
			hoverClass: 'ui-state-highlight',
			drop: function(event, ui){

				var disc = ui.draggable;

				//grab song id from id of element
				var songId = disc.attr('id');

				
				//use soundcloud directive api
				soundcloudStuffCtrl.playSong(songId);

				$('.cd-spin').each(function(){
					$(this).transition({
						y: 0
					},0);
				})

				//make sure element is totally offscreen
				$('#' + songId).find('.cd-spin').transition({
					y: '-2000px'
				},2000);

			}
		});
	}


	return {
		require: 'soundcloudStuff',
		restrict: 'A',
		link: link,
		scope: true
	};
}]);
