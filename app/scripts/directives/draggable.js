'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:draggable
 * @description
 * # draggable
 */
angular.module('variousAssetsApp').directive('draggable', function () {


	var link = function($scope, element){
		element.draggable({axis: 'x'});
	}

	return {
		restrict: 'A',
		link: link
	};
});
