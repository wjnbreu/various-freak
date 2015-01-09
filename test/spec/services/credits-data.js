'use strict';

describe('Service: creditsData', function () {

  // load the service's module
  beforeEach(module('variousAssetsApp'));

  // instantiate service
  var creditsData;
  beforeEach(inject(function (_creditsData_) {
    creditsData = _creditsData_;
  }));

  it('should do something', function () {
    expect(!!creditsData).toBe(true);
  });

});
