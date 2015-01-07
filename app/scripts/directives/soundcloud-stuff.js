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
	var secret = 's-pGXST';

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
			SC.get('/tracks/' + songId + '?secret_token=' + secret, function(song){
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

		stopSongs: function(){
			soundManager.stopAll();
			$rootScope.$broadcast('songEnded');
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
			SC.get('/users/' + user_id + '/playlists/' + playlistId + '?secret_token=' + secret, function(playlist){
				tracks = playlist.tracks;
				$rootScope.$broadcast('tracksReady', tracks);
				self.initPlayer();
				// console.log(tracks);
			});
		}
	};




	var link = function($scope){

		$scope.currentPosition = 0;
		$scope.songDuration = 0;

		//default value, used in play-status directive as well. watch set in controller
		$scope.globalSongPlaying = false;

		//flag to make sure button only is activiated once cd is in
		$scope.loadedFirstSong = false;

		$scope.songstatus = {};
		
		//set up soundcloud on element
		player.init($scope.playlistId);

		


		//wait for response from player init, then set up bindings
		$rootScope.$on('tracksReady', function(msg, data){
			$scope.tracks = data;
			$scope.playPauseSong = function(){
				console.log('sclick');
				if ($scope.globalSongPlaying){
					player.pauseSong();
					$scope.globalSongPlaying = false;
				}
				else{
					if ($scope.loadedFirstSong){
						player.resumeSong();
						$scope.globalSongPlaying = true;
					}
				}
			};
		});




		$rootScope.$on('songStarted', function(){
			
			$scope.ended = false;
			
			//get duration of entire song
			$scope.songDuration = player.duration;
			$scope.globalSongPlaying = true;
		});


		//if song is over, clear interval
		$rootScope.$on('songEnded', function(){
			$scope.ended = true;
			$scope.globalSongPlaying = false;
		});
	};




	return {
		restrict: 'A',
		link: link,
		controller: function($scope, $rootScope){

			var self = this;

			$scope.globalSongPlaying = false;
			
			$rootScope.$on('tracksReady', function(){
				
				//expose methods, in this case, only play since that's the only thing dropping does
				//all other control goes to play/pause button
				self.playSong = function(songId){
					
					//if any songs are playing, kill them
					player.stopSongs();

					//then play
					player.playSong(songId);

				};

			});
		}

	};
}]);
