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


	var link = function($scope, element){

		$rootScope.$on('listWidth', function(msg, data){
			maxWidth = data;
		});

		maxWidth = $scope.listWidth;

		element.mousewheel(function(event, delta){
			event.preventDefault();
			//get current pos of item
			var box = item.getBoundingClientRect();
			var boxPos = box.left;

			scrollPos -= delta;

			//we are scrolling right
			if (scrollPos > lastScroll){
				console.log('right');
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

				list.transition({
					x: -scrollPos,
					y: '-60%'
				},0, 'linear');
			}
			else{
				console.log('left');

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

				list.transition({
					x: -scrollPos,
					y: '-60%'
				},0, 'linear');
			}
			lastScroll = scrollPos;

			console.log('Box: ' + boxPos, 'Scroll: ' + scrollPos);
			
			
			
			
			

		});

	};

	//get target

			
			


	return {
		scope: true,
		restrict: 'A',
		link: link
		
	};
}]);
