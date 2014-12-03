'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:currentPosition
 * @description
 * # currentPosition
 */
angular.module('variousAssetsApp').directive('currentPosition', ['$interval', function ($interval) {

	var duration = 0;
	var currentProgress = 0;

	//interval holder
	var currentPositionCheck;

	
	var link = function($scope, element, attrs){

		$scope.$watch('songDuration', function(value){
			duration = value;
			attrs.duration = duration;
		});		
	};

	return {
		restrict: 'A',
		link: link,
		scope: true
	};
}]);
