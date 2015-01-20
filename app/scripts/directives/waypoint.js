'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:waypoint
 * @description
 * # waypoint
 */
angular.module('variousAssetsApp').directive('waypointStick', function () {

	var link = function($scope, element){
		
		var waypoint = new Waypoint({
			element: document.getElementById('waypoint'),
			offset: '40',
			context: document.getElementById('about-wrapper'),
			handler: function(direction){
				if (direction === 'down'){
					element.addClass('sticky');
				}
				else{
					element.removeClass('sticky');
				}
			}
		});
	};

	return {
		link: link
	};
});
