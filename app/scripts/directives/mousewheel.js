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
		element.mousewheel(function(event, delta){
			event.preventDefault();
			
			//get current pos of item
			box = item.getBoundingClientRect();
			boxPos = box.left;
			

			scrollPos -= Math.floor(delta);
			console.log(boxPos);

			//we are scrolling right
			if (scrollPos > lastScroll){
				//lower bound
				if (scrollPos < 0){
					scrollPos = 0;
				}

				//if scrollposition is less than position after cd clck transition, update
				if (scrollPos <= -boxPos){
					scrollPos = -boxPos;
				}
				//upper bound
				if (scrollPos > maxWidth - bufferSpace){
					scrollPos = maxWidth - bufferSpace;
				}
			}
			else{

				//lower bound
				if (scrollPos < 0){
					scrollPos = 0;
				}

				//if scrollposition is more than position after cd click transition, update
				if (scrollPos >= -boxPos){
					scrollPos = -boxPos;
				}

				//upperbound
				if (scrollPos > maxWidth - bufferSpace){
					scrollPos = maxWidth - bufferSpace;
				}

				
			}

			
			if (-scrollPos > 3 || -scrollPos < -3){
				//modified jquery.transit to allow 3d transforms
			list.transition({
				x: -scrollPos,
				y: 0,
				z: 0
			},0, 'linear');
			}
			

			lastScroll = scrollPos;
			
		});
		

	};

		

	return {
		scope: true,
		restrict: 'A',
		link: link
		
	};
}]);
