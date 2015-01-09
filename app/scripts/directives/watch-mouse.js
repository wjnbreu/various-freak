'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:watchMouse
 * @description
 * # watchMouse
 */
angular.module('variousAssetsApp').directive('watchMouse', ['mousePosition', function (mousePosition) {

	var link = function($scope, element){

		var xPos;
		var yPos;

		element.mousemove(function(e){
			xPos = e.pageX;
			yPos = e.pageY;
			mousePosition.storePos(xPos, yPos);
		});
	};


	return {
		restrict: 'A',
		link: link
	};
}]);