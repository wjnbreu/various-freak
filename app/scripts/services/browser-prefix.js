'use strict';

/**
 * @ngdoc service
 * @name variousAssetsApp.browserPrefix
 * @description
 * # browserPrefix
 * Factory in the variousAssetsApp.
 */
angular.module('variousAssetsApp')
  .factory('browserprefix', function () {
    // Service logic
    // ...

    var getPrefix = function(){
      var browserPrefix;

      navigator.sayswho = (function(){
        var N = navigator.appName,
          ua = navigator.userAgent,
          tem;

        var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);

        if (M && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) {
          M[2] = tem[1];
        }

        M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
        M = M[0];

        if (M == "Chrome") {
          browserPrefix = "-webkit-";
        }

        if (M == "Firefox") {
          browserPrefix = "-moz-";
        }

        if (M == "Safari") {
          browserPrefix = "-webkit-";
        }

        if (M == "MSIE") {
          browserPrefix = "-ms-";
        }

        })();

        return browserPrefix;

    };

    // Public API here
    return {
      getPrefix: function () {
        return getPrefix();
      }
    };
  });
