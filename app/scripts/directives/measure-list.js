'use strict';

/* global $:false */

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:measureList
 * @description
 * # measureList
 */
angular.module('variousAssetsApp').directive('measureList', ['$rootScope', '$window', function ($rootScope, $window) {



	//last list item measures total

	


	var link = function($scope, element, attrs){

		var list = $('#list-wrapper');
		var w = angular.element($window);

		

		function sizeList(){
			var winWidth = $window.innerWidth;
			$scope.listWidth = 0;

			//get attrs and convert to num
			var listWidth = parseInt(attrs.listWidth, 10);
			var listPadding = parseInt(attrs.listPadding, 10);
			var index = parseInt(attrs.index, 10);

			var fullWidth = listWidth + listPadding;

			//since last item is not indluced in index, add one. HOWEVER, we don't actually since first item is not counted (cover art)
			var fullListWidth = (fullWidth * index) + (fullWidth * 1);
	
			
			$scope.listWidth = fullListWidth;
			$rootScope.$broadcast('listWidth', $scope.listWidth);
			
			
			list.css({
				width: fullListWidth + 'px',
				left: (winWidth / 2) - ((listPadding / 2)) + 'px'
			});
		}

		


		//only measure on the last item so we can ensure we have full list
		if ($scope.$last){

			sizeList();
		}

		//bind window resize
		w.on('resize', function(){
			sizeList();
		});
	};


	return {
		restrict: 'A',
		link: link
	};
}]);
