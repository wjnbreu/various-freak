'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:rotateSoundcloud
 * @description
 * # rotateSoundcloud
 */
angular.module('variousAssetsApp').directive('rotateSoundcloud', function () {

	
	var link = function($scope, element){

		var prop, timeout;

		var props = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');

		var animRotateX = 0;
		var animRotateY = 0;
		var currentOffset = 0;


		var object = document.getElementById('sc-scene');
		var grid = document.getElementById('mobile-frame');
		var hammertime = new Hammer(grid);

		


		function animLoop(){
			if (animRotateX > 360){
				animRotateX = 0;
			}
			if (animRotateX < -360){
				animRotateX = 0;
			}
			if (animRotateY > 360){
				animRotateY = 0;
			}
			if (animRotateY < -360){
				animRotateY = 0;
			}

			for (var i = 0; i < props.length; i++){
				prop = props[i];
				object.style[prop] = 'rotateX(' + -currentOffset + 'deg) rotateY(' + animRotateY + 'deg) rotateZ(0deg)';
			}
			animRotateY += 0.5;
			timeout = setTimeout(animLoop, 30);
		}
		
		

		hammertime.on('pan', function(ev){
			//stop auto pan on drag
			clearTimeout(timeout);

			ev.deltaX = ev.deltaX + animRotateY;


			for (var i = 0; i < props.length; i++){
				prop = props[i];
				object.style[prop] = "rotateX(" + -(ev.deltaY) + "deg) rotateY(" + ev.deltaX + "deg) rotateZ(0deg)";
			}
			currentOffset = ev.deltaY;
			
			
		});

		hammertime.on('panend', function(ev){
			console.log(ev);
			animRotateY = ev.deltaX;
			//start again
			animLoop();
		});


		//initial kickoff
		animLoop();


	}
	



	return {
		restrict: 'EA',
		link: link
	};
});
