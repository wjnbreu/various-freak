'use strict';
/* global $:false */

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:mousewheel
 * @description
 * # mousewheel
 */
angular.module('variousAssetsApp').directive('mousewheel', ['$rootScope', function ($rootScope) {



	var item = document.getElementById('list-wrapper');
	var list = $('.list-wrapper');
	var scrollPos = 0;
	var maxWidth;
	var lastScroll = 0;
	var bufferSpace = 600;
	var prefix;
	var box = item.getBoundingClientRect();
	var boxPos = box.left;

	
	$rootScope.$on('listWidth', function(msg, data){
			maxWidth = data;
	});



	var link = function($scope, element){

		prefix = $scope.browser + 'transform';
		
		maxWidth = $scope.listWidth;


		//TO-DO: MAKE GATE ON MOUSEWHEEL SO NOT FIRING LIKE CRAZY
		element.mousewheel(function(event){
			event.preventDefault();
			
			//get current pos of item
			box = item.getBoundingClientRect();
			boxPos = box.left;
			
			

			//if user is scrolling down
			if (Math.abs(event.deltaY) > Math.abs(event.deltaX)){
				scrollPos -= Math.floor(event.deltaY);

				//upper bound
				if (scrollPos > maxWidth - bufferSpace){
					scrollPos = maxWidth - bufferSpace;
				}

				//lower bound
				if (scrollPos < 0){
					scrollPos = 0;
				}

				//modified jquery.transit to allow 3d transforms
				list.transition({
					x: -scrollPos,
					y: 0,
					z: 0
				},0, 'linear');
			
				lastScroll = scrollPos;
			}





			//if user is scrolling sideways
			if (Math.abs(event.deltaX) > Math.abs(event.deltaY)){
				scrollPos -= Math.floor(event.deltaX);

				//upper bound
				if (scrollPos > maxWidth - bufferSpace){
					scrollPos = maxWidth - bufferSpace;
				}

				//lower bound
				if (scrollPos < 0){
					scrollPos = 0;
				}

				//modified jquery.transit to allow 3d transforms
				list.transition({
					x: -scrollPos,
					y: 0,
					z: 0
				},0, 'linear');
			
				lastScroll = scrollPos;
			}
			
		});
		

	};

		

	return {
		scope: true,
		restrict: 'A',
		link: link
		
	};
}]);
