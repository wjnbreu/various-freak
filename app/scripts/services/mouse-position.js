'use strict';

/**
 * @ngdoc service
 * @name variousAssetsApp.mousePosition
 * @description
 * # mousePosition
 * Factory in the variousAssetsApp.
 */
angular.module('variousAssetsApp').factory('mousePosition', function () {
  
  var xPos = 0;
  var yPos = 0;

  var storePos = function(x,y){
    xPos = x;
    yPos = y;
  };

  var getPos = function(){
    
    var positions = {
      x: xPos,
      y: yPos
    };

    return positions;
  };

  // Public API here
  return {
    storePos: function (x,y) {
      storePos(x,y);
    },
    getPos: function(){
      return getPos();
    }
  };
});
