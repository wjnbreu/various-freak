'use strict';

/* global $:false */

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:measureList
 * @description
 * # measureList
 */
angular.module('variousAssetsApp').directive('measureList', ['$rootScope', function ($rootScope) {


	

	//last list item measures total

	var list = $('.list-wrapper');


	var link = function($scope, element, attrs){
		$scope.listWidth = 0;

		//get attrs and convert to num
		var listWidth = parseInt(attrs.listWidth, 10);
		var listPadding = parseInt(attrs.listPadding, 10);
		var index = parseInt(attrs.index, 10);

		var fullWidth = listWidth + listPadding;

		//since last item is not indluced in index, add one
		var fullListWidth = fullWidth * (index + 1);

		console.log(fullListWidth);

		
		
		$scope.listWidth = fullListWidth;
		$rootScope.$broadcast('listWidth', $scope.listWidth);
		
		



		
		list.css({
			width: fullListWidth + 'px'
		});

	};


	return {
		restrict: 'A',
		link: link
	};
}]);
