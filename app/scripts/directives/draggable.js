'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:draggable
 * @description
 * # draggable
 */
angular.module('variousAssetsApp').directive('draggable', function () {


	var link = function($scope, element, attrs){

		var cdTarget = element.find('.cd-spin');



		element.draggable({
			addClasses: false,
			revert: true,
			revertDuration: 1000,
			helper: function(event, ui){
				return cdTarget;
			}
		}).data('yo', 'yo dawg');
	}

	return {
		restrict: 'A',
		link: link
	};
});
