'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:animateArrows
 * @description
 * # animateArrows
 */
angular.module('variousAssetsApp')
  .directive('animateArrows', ['$timeout', function ($timeout) {

  	var link = function($scope, element){
  		$('.one').addClass('show');

  		$timeout(function(){
  			$('.two').addClass('show');
  		},500);
  		
  		$timeout(function(){
  			$('.three').addClass('show');
  		},1000);

  		$timeout(function(){
  			$('.four').addClass('show');
  		},1500);

  		$timeout(function(){
  			$('.five').addClass('show');
  		},2000);

  		$timeout(function(){
  			$('.six').addClass('show');
  		},2500);


  	}
    return {
      restrict: 'A',
      link: link
    };
  }]);
