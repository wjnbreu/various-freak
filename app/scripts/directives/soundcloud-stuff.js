'use strict';
/* global SC:false */
/* global soundManager */
/* global $:false */

/**
 * @ngdoc directive
 * @name variousAssetsApp.directive:soundcloudStuff
 * @description
 * # soundcloudStuff
 */
angular.module('variousAssetsApp').directive('soundcloudStuff', ['$rootScope', '$interval', '$timeout', function ($rootScope, $interval, $timeout) {

	var user_id = '2270353';
	var tracks = [];
	var currentSong;
	var client_id = '895ed2c967a25411c75f5bce576b11f5';

	var currentPosition = 0;



	var player = {

		currentlyPlaying: false,
		duration: 0,
		songObject: {},

		setupScrubber: function(){
			var self = this;
			//set up scrubber
			$('.progress-bar-background').each(function(){
				//add a click handler to each one
				$(this).bind('click', function(event){
					var div = $(event.target);
					var offset = div.offset();

					var clickLocation = event.clientX - offset.left;

					//get percentage of clickLocation from playerWidth. large multiplier to account for ms
					var scrubPercent = (clickLocation / self.duration) * 100000;
					

					//now scrub audio to location
					//get ms of new location. turn percent back into decimal
					var newLocation = self.duration * (scrubPercent / 100);
					soundManager.setPosition(self.songObject.id, newLocation);


				});
			});
		},

		playSong: function(songId){
			var self = this;

			//get song
			SC.get('/tracks/' + songId, function(song){
				self.songObject = song;

				self.duration = self.songObject.duration;

				//stop all other players
				soundManager.stopAll();

				//create soundmanager object and play sound
				soundManager.createSound({
					url: self.songObject.stream_url + '?client_id=' + client_id,
					id: self.songObject.id,
					//just for dev
					// volume: 1,
					//used for progress bar
					whileplaying: function(){
						currentPosition = this.position;

					},
					onfinish: function(){
						currentPosition = 0;
						$rootScope.$broadcast('songEnded');
					}
				});
				soundManager.play(self.songObject.id);
				$rootScope.$broadcast('songStarted');
				
			});
		},



		pauseSong: function(){
			soundManager.pauseAll();
		},

		resumeSong: function(){
			soundManager.resumeAll();
		},



		initPlayer: function(){
			//load first song in array, just so we have a player ready
			SC.stream('/tracks/' + tracks[0].id, function(song){
				currentSong = song;
			});
		},




		init: function(playlistId){
			var self = this;
			
			
			SC.initialize({
				client_id: '895ed2c967a25411c75f5bce576b11f5'
			});

			
			//after init, get all VA set songs
			SC.get('/users/' + user_id + '/playlists/' + playlistId, function(playlist){
				tracks = playlist.tracks;
				$rootScope.$broadcast('tracksReady', tracks);
				self.initPlayer();
				// console.log(tracks);
			});
		}
	};




	var link = function($scope){

		//setInterval variable
		var progressCheck;

		$scope.currentPosition = 0;
		$scope.songDuration = 0;

		//default value, used in play-status directive as well. watch set in controller
		$scope.globalSongPlaying = false;

		$scope.songstatus = {};

		$scope.ready = true;
		
		//set up soundcloud on element
		player.init($scope.playlistId);



		//when songs are in, grab data
		$rootScope.$on('tracksReady', function(msg, data){
			
			


			$scope.tracks = data;

			
			
			//bind play button to track ids
			$scope.playSong = function(songId){
				//if any songs are playing, kill them
				soundManager.stopAll();
				$scope.globalSongPlaying = false;

				//wait for animationt to finish
				$rootScope.$on('animOver', function(){
					$timeout(function(){
						player.playSong(songId);
						$scope.globalSongPlaying = true;
					},500);
					

					// //make sure to get currentlocation of song every few seconds
					progressCheck = $interval(function(){
						$scope.currentPosition = currentPosition;
					},100);

					player.setupScrubber();

				});
			};

			$scope.pauseSong = function(){
				player.pauseSong();
				$scope.globalSongPlaying = false;
			};

			$scope.resumeSong = function(songId){
				if (!$scope.ended){
					player.resumeSong();
				}
				else{
					player.playSong(songId);
					//make sure to get currentlocation of song every few seconds
					progressCheck = $interval(function(){
						$scope.currentPosition = currentPosition;
					},100);

					player.setupScrubber();
				}
				
				$scope.globalSongPlaying = true;
			};

		});

		$rootScope.$on('songStarted', function(){
			$scope.ended = false;
			//get duration of entire song
			$scope.songDuration = player.duration;
		});

		//if song is over, clear interval
		$rootScope.$on('songEnded', function(){
			$scope.ended = true;
			$scope.globalSongPlaying = false;
		});
	};




	return {
		restrict: 'A',
		link: link
	};
}]);
