'use strict';
/* global $:false */

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:shiftElement
 * @description
 * # shiftElement
 */
angular.module('variousAssetsApp').directive('shiftElement', ['$window', '$rootScope', function ($window, $rootScope) {

	var list = $('.list-wrapper');
	var middle = $window.innerWidth / 2;
	var cd = '.cd-spin';

	var win = angular.element($window);

	//update middle on resize
	win.bind('resize', function(){
		middle = $window.innerWidth / 2;
	});


	
	var link = function($scope, element){

		element.on('click', function(){
			var width = element.width();
			var halfWidth = width / 2;
			var offset = element.offset().left;

			//get target
			var item = document.getElementById('list-wrapper');

			//get current pos of item
			var box = item.getBoundingClientRect();
			var boxPos = box.left;

			//loop through each list item and remove active classes before adding to selected item
			$('.song-list .flip-container').each(function(){
				if ($(this).hasClass('js--active')){
					$(this).removeClass('js--active');
					$(this).find(cd).removeClass('js--active');

				}
			});

			var wrapElement = function(){
				//now add class to selected item
				element.parent().parent().addClass('js--active');
				element.parent().parent().find(cd).addClass('js--active');

				//fire off message so song can play
				$rootScope.$broadcast('animOver');
			};

			
			
			//reset progress bar
			element.find('.progress-bar-interior').css({
				width: 0
			});


			list.transition({
				x: (boxPos - (offset - middle + halfWidth)),
				y: '-60%',
				z: 0
			},1000, wrapElement);

		});
	};


	

	return {
		restrict: 'A',
		link: link
	};
}]);
