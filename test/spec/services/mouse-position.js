'use strict';

describe('Service: mousePosition', function () {

  // load the service's module
  beforeEach(module('variousAssetsApp'));

  // instantiate service
  var mousePosition;
  beforeEach(inject(function (_mousePosition_) {
    mousePosition = _mousePosition_;
  }));

  it('should do something', function () {
    expect(!!mousePosition).toBe(true);
  });

});
