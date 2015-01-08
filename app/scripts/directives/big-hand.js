'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:bigHand
 * @description
 * # bigHand
 */
angular.module('variousAssetsApp').directive('bigHand', function () {
	
	var link = function($scope, element){
		
		$("html,body").mousemove(function(e) {
	        var tarX = e.pageX;
	        var tarY = e.pageY;
	        element.css({
	            top: tarY + 20,
	            left : tarX + 20
	        },0);
	    });
	}


	return {
		restrict: 'A',
		link: link
	};
});
