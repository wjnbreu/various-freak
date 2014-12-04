'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:dropZone
 * @description
 * # dropZone
 */
angular.module('variousAssetsApp').directive('dropZone', function () {

	var link = function($scope, element){
		element.droppable({
			accept: '.flipper',
			hoverClass: 'ui-state-highlight'
		});
	}


	return {
		restrict: 'A',
		link: link
	};
});
