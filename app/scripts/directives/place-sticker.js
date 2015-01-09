'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:placeSticker
 * @description
 * # placeSticker
 */
angular.module('variousAssetsApp').directive('placeSticker', function () {

	var link = function($scope, element){

		var prop;

		var props = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');

		var angle = Math.floor((Math.random() * 31) - 15);
		var lift = Math.floor((Math.random() * 100) - 50);

		element.css({
			transform: 'rotate(' + angle + 'deg) translateY(' + lift + 'px) translateZ(0)'
		});

	};



	return {
		restrict: 'EA',
		link: link
	};
});
