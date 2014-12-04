'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:draggable
 * @description
 * # draggable
 */
angular.module('variousAssetsApp').directive('draggable', function () {


	var link = function($scope, element, attrs){
		element.draggable({
			addClasses: false
		});
	}

	return {
		restrict: 'A',
		link: link
	};
});
