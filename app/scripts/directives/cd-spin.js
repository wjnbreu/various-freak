'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:cdSpin
 * @description
 * # cdSpin
 */
angular.module('variousAssetsApp').directive('cdSpin', function () {
	return {
		templateUrl: 'partials/cd.html',
		restrict: 'E'
	};
});
