'use strict';


/**
 * @ngdoc overview
 * @name variousAssetsApp
 * @description
 * # variousAssetsApp
 *
 * Main module of the application.
 */
angular
  .module('variousAssetsApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
  ])
  .config(['$routeProvider', '$sceDelegateProvider', function ($routeProvider, $sceDelegateProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/:songId', {
        templateUrl: 'views/song.html',
        controller: 'SongCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    //set up whitelist for soundcloud
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://soundcloud.com',
      'http://soundcloud.com',
      'http://api.soundcloud.com',
      'https://api.soundcloud.com',
      'http://ec-media.soundcloud.com',
      'https://ec-media.soundcloud.com'

    ]);

  }]);
