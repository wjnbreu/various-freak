'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:bigHand
 * @description
 * # bigHand
 */
angular.module('variousAssetsApp').directive('bigHand', ['mousePosition', function (mousePosition) {
	
	var link = function($scope, element, attrs){

		var frameId = attrs.frameId;
		console.log(frameId);
		var frame = $('#' + frameId);

		var pos = mousePosition.getPos();

		var xPos = pos.x;
		var yPos = pos.y;

		//set initial css based on prev position
		// element.css({
		// 	left: xPos + 5,
		// 	top: yPos + 5
		// });


		element.transition({
			'x': xPos + 5,
			'y': yPos + 5
		},0);

		//now, listen for changes
		frame.on('mousemove', function(e){
			xPos = e.pageX;
			yPos = e.pageY;
			element.transition({
				'x': xPos + 5,
				'y': yPos + 5
			},0);
		})
		
	}



	return {
		restrict: 'A',
		link: link
	};
}]);
