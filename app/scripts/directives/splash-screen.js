'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:splashScreen
 * @description
 * # splashScreen
 */
angular.module('variousAssetsApp').directive('splashScreen', function () {
	
	var link = function($scope, element){
		$scope.slide = function(){
			element.transition({
				y: '-110%'
			},1000);
		}
	}

	return {
		templateUrl: 'partials/splash.html',
		replace: true,
		restrict: 'E',
		link: link
	};
});
