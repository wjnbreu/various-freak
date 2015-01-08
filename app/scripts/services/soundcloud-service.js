'use strict';

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

    //current song Object
    songObject: {},

    clientId: '895ed2c967a25411c75f5bce576b11f5',
    userId: '2270353',
    secret: '',

    //options for soundcloud player
    options: {
      volume: 90,
      onFinish: function(){
        $rootScope.$broadcast('songEnded');
      }
    },

    //holds all song objects from playlist
    tracks: [],

    
    //set up soundcloud player
    init: function(playlistId, secret){
      var self = this;
      self.secret = secret;
      var deferred = $q.defer();

      SC.initialize({
        client_id: self.clientId
      });

      //after init, get all VA set songs
      SC.get('/users/' + self.userId + '/playlists/' + playlistId + '?secret_token=' + secret, function(playlist){
        self.tracks = playlist.tracks;
        deferred.resolve(self.tracks);
        self.loadPlayer();

      });

      return deferred.promise;
    },



    //loads up a first song as default so player is ready
    loadPlayer: function(){
      var self = this;
      
      SC.stream('/tracks/' + self.tracks[0].id, function(song){
        self.currentSong = song;
      });
    },



    playSong: function(songId){
      var self = this;


      //stop all other players
      soundManager.stopAll();

      //get song
      SC.stream('/tracks/' + songId + '?secret_token=' + self.secret, self.options, function(song){
        self.songObject = song;
        song.play();

                
        //change color of play button from drop zone
        $rootScope.$broadcast('songStarted', songId);
        
      });
    },



    stopSongs: function(){
      soundManager.stopAll();
      $rootScope.$broadcast('songEnded', song);
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

      SC.get('/tracks/' + songId + '?secret_token=' + self.secret, function(song){

        deferred.resolve(song);
      });

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

    resumeSong: function(){
      return player.resumeSong();
    },

    getInfo: function(songId){
      return player.getInfo(songId);
    }


  };
}]);
