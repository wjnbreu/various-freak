'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:navStuff
 * @description
 * # navStuff
 */
angular.module('variousAssetsApp').directive('navStuff', function () {
	
	return {
		restrict: 'E',
		templateUrl: 'partials/nav-stuff.html',
		replace: true
	};
});
