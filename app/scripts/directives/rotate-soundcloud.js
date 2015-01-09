'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:rotateSoundcloud
 * @description
 * # rotateSoundcloud
 */
angular.module('variousAssetsApp').directive('rotateSoundcloud', function () {

	
	var link = function($scope, element){

		var prop;

		var props = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');

		


		var object = document.getElementById('sc-scene');
		var grid = document.getElementById('mobile-frame');
		
		var hammertime = new Hammer(grid);

		hammertime.on('pan', function(ev){
			for (var i = 0; i < props.length; i++){
				prop = props[i];
				object.style[prop] = "rotateX(" + -ev.deltaY + "deg) rotateY(" + ev.deltaX + "deg) rotateZ(0deg)";
			}
			
		});
	}
	



	return {
		restrict: 'EA',
		link: link
	};
});
