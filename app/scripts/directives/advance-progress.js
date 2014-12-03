'use strict';

/* global $:false */

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:advanceProgress
 * @description
 * # advanceProgress
 */
angular.module('variousAssetsApp').directive('advanceProgress', ['$interval', '$rootScope', function ($interval, $rootScope) {
	
	var containerWidth = 0;
	
	var currentPositionCheck;

	var progressPercent;

	var link = function($scope,element){
		
		//get width of progress bar container(currently fluid)
		containerWidth = element.parent().find('.progress-bar-background').width();


		
		//once song starts, begin checking current progress
		$rootScope.$on('songStarted', function(){
			currentPositionCheck = $interval(function(){
				progressPercent = ($scope.currentPosition / $scope.songDuration) * 100;

				element.css({
					width: progressPercent + '%'
				});

			},100);
		});

		$rootScope.$on('songEnded', function(){
			element.css({
				width: 0
			}, 100);
		});
		
	};


	return {
		restrict: 'A',
		scope: true,
		link: link
	};
}]);
