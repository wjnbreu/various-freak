'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:removeAnimation
 * @description
 * # removeAnimation
 */
angular.module('variousAssetsApp').directive('removeAnimation', ['$location','historyService', function ($location, historyService) {

	var link = function($scope, element){

		var prevLocation = historyService.getPrevious();


		$scope.goto = function(){

			//store ref to to this page for history
			historyService.storePastLocation($location.path());

			//remove animations
			element.parent().children().addClass('remove-anim');
			
			if (prevLocation){
				if (prevLocation === '/player'){
					$location.path('/player');
				}
				else{
					$location.path('/');
				}
			}
			else{
				$location.path('/');
			}
		};
	}


	return {
		restrict: 'EA',
		link: link
	};
}]);
