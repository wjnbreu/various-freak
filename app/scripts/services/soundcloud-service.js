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

    //holds all song objects from playlist
    tracks: [],

    
    //set up soundcloud player
    init: function(playlistId){
      var self = this;
      var deferred = $q.defer();

      SC.initialize({
        client_id: self.clientId
      });

      //after init, get all VA set songs
      SC.get('/users/' + self.userId + '/playlists/' + playlistId, function(playlist){
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
        console.log(self.currentSong);
      });
    },



    playSong: function(songId){
      var self = this;

      //get song
      SC.get('/tracks/' + songId, function(song){
        self.songObject = song;

        //stop all other players
        soundManager.stopAll();

        //create soundmanager object and play sound
        soundManager.createSound({
          url: self.songObject.stream_url + '?client_id=' + self.clientId,
          id: self.songObject.id,
          // volume: 1,
          //signals to drop zone which color to render play button
          onfinish: function(){
            $rootScope.$broadcast('songEnded');
          }
        });
        
        //trigger play
        soundManager.play(self.songObject.id);
        
        //change color of play button from drop zone
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

  };


  // Public API here
  return {

    init: function (playlistId) {
      return player.init(playlistId);
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
    }


  };
}]);
