'use strict';
/* global $:false, jwerty:false */

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:mousewheel
 * @description
 * # mousewheel
 */
angular.module('variousAssetsApp').directive('mousewheel', ['$rootScope', '$timeout', function ($rootScope, $timeout) {




	var link = function($scope, element){

		var item = document.getElementById('list-wrapper');
		var list = $('.list-wrapper');
		var scrollPos = 0;
		var maxWidth;
		var lastScroll = 0;
		var bufferSpace = 600;

	
		$rootScope.$on('listWidth', function(msg, data){
				maxWidth = data;
		});

		
		maxWidth = $scope.listWidth;

		function runKeyMove(){
			if (scrollPos >  maxWidth - bufferSpace){
				scrollPos = maxWidth - bufferSpace;
			}

			if (scrollPos < 0){
				scrollPos = 0;
			}

			list.transition({
				x: -scrollPos,
				y: 0,
				z: 0
			},200);
		}


		//scrollin
		jwerty.key('→', function(){

			//255 width + 235 padding
			scrollPos += 470;

			runKeyMove();

		});

		//scrollin
		jwerty.key('←', function(){

			//255 width + 235 padding
			scrollPos -= 470;

			runKeyMove();

		});
		

		element.mousewheel(function(event){
			event.preventDefault();
						

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
