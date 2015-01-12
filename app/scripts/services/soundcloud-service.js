'use strict';

/* global soundManager:false */

/**
 * @ngdoc service
 * @name variousAssetsApp.soundcloudService
 * @description
 * # soundcloudService
 * Factory in the variousAssetsApp.
 */
angular.module('variousAssetsApp').factory('soundcloudService', ['$q', '$rootScope', function ($q, $rootScope) {
    // Service logic
    // ...

   var player = {
    //globals
    currentlyPlaying: false,
    
    hasBeenInit: false,

    //current song Object
    songObject: {},

    clientId: '895ed2c967a25411c75f5bce576b11f5',
    userId: '2270353',
    secret: '',

    //options for soundcloud player
    options: {
      volume: 100,
      preferFlash: false,
      useHTML5Audio: true,
      onFinish: function(){
        $rootScope.$broadcast('songEnded');
      }
    },

    //holds all song objects from playlist
    tracks: [],

    
    //set up soundcloud player
    init: function(playlistId, secret){
      var self = this;
      var deferred = $q.defer();

      SC.initialize({
        client_id: self.clientId
      });

      if (secret){
        self.secret = secret;
        //after init, get all VA set songs
        SC.get('/users/' + self.userId + '/playlists/' + playlistId + '?secret_token=' + secret, function(playlist){
          self.tracks = playlist.tracks;
          deferred.resolve(self.tracks);
          self.loadPlayer();

        });
      }

      else{
        SC.get('/users/' + self.userId + '/playlists/' + playlistId, function(playlist){
          self.tracks = playlist.tracks;
          deferred.resolve(self.tracks);
          self.loadPlayer();
        });
      }

      self.hasBeenInit = true;


      return deferred.promise;
    },



    //loads up a first song as default so player is ready
    loadPlayer: function(){
      var self = this;
      var deferred = $q.defer();
      
      SC.stream('/tracks/' + self.tracks[0].id, self.options, function(song){
        self.currentSong = song;
        deferred.resolve(song);
      });

      return deferred.promise;
    },



    playSong: function(songId){
      var self = this;


      //stop all other players
      soundManager.stopAll();

      if (self.secret){
        //get song
        SC.stream('/tracks/' + songId + '?secret_token=' + self.secret, self.options, function(song){
          self.songObject = song;
          song.play();


          self.currentlyPlaying = true;

          //change color of play button from drop zone
          $rootScope.$broadcast('songStarted', songId);
          
        });
      }

      else{
        //get song
        SC.stream('/tracks/' + songId, self.options, function(song){
          self.songObject = song;
          song.play();

          self.currentlyPlaying = true;


          //change color of play button from drop zone
          $rootScope.$broadcast('songStarted', songId);
          
        });
      }

      
    },


    //used for route changes
    stopSongs: function(){

      var self = this;

      //make sure soundManager is defined since we might be on diff route
      if (typeof soundManager !== 'undefined'){
        soundManager.stopAll();

        self.currentlyPlaying = false;

        $rootScope.$broadcast('songEnded');
      }

      else{
        //init player, on promise fulfilled, load player in order to create soundmanager object
        self.init().then(function(data){
          self.loadPlayer().then(function(data){
            soundManager.stopAll();
            
            self.currentlyPlaying = false;

            $rootScope.$broadcast('songEnded');
          });
          
        });
      }
    },


    isPlaying: function(){
      var self = this;

      return self.currentlyPlaying;
    },

    alreadyInit: function(){
      var self = this;
      return self.hasBeenInit;
    },


    pauseSong: function(){
      soundManager.pauseAll();
    },

    resumeSong: function(){
      soundManager.resumeAll();
    },

    getInfo: function(songId){
      var self = this;

      var deferred = $q.defer();

      if (self.secret){
        SC.get('/tracks/' + songId + '?secret_token=' + self.secret, function(song){
          deferred.resolve(song);
        });
      }

      else{
        SC.get('/tracks/' + songId, function(song){
          deferred.resolve(song);
        });
      }

      

      return deferred.promise;
    }

  };


  // Public API here
  return {

    init: function (playlistId, secret) {
      return player.init(playlistId, secret);
    },

    //allow method. used by drop-zone
    playSong: function(songId){
      return player.playSong(songId);
    },

    pauseSong: function(){
      return player.pauseSong();
    },

    stopSongs: function(){
      return player.stopSongs();
    },

    resumeSong: function(){
      return player.resumeSong();
    },

    getInfo: function(songId){
      return player.getInfo(songId);
    },

    isPlaying: function(){
      return player.isPlaying();
    },
    alreadyInit: function(){
      return player.alreadyInit();
    },
    getTracks: function(){
      console.log(player.tracks);
      return player.tracks;
    }


  };
}]);
