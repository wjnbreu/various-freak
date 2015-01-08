'use strict';

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:currentSong
 * @description
 * # currentSong
 */
angular.module('variousAssetsApp').directive('currentSong', ['$rootScope', 'soundcloudService', function ($rootScope, soundcloudService) {
	
	var link = function($scope, element){

		//on song start, update info
		$rootScope.$on('songStarted', function(msg, songId){
			console.log(songId);

			//get info from soundcloud service
			soundcloudService.getInfo(songId).then(function(data){
				$scope.currentSong.title = data.title;
				$scope.currentSong.download = data.download_url + '&client_id=' + $scope.client;
			});
		});
	};


	return {
		restrict: 'EA',
		link: link
	};
}]);
