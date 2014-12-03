'use strict';

describe('Service: browserPrefix', function () {

  // load the service's module
  beforeEach(module('variousAssetsApp'));

  // instantiate service
  var browserPrefix;
  beforeEach(inject(function (_browserPrefix_) {
    browserPrefix = _browserPrefix_;
  }));

  it('should do something', function () {
    expect(!!browserPrefix).toBe(true);
  });

});
