'use strict';

describe('Service: soundcloudService', function () {

  // load the service's module
  beforeEach(module('variousAssetsApp'));

  // instantiate service
  var soundcloudService;
  beforeEach(inject(function (_soundcloudService_) {
    soundcloudService = _soundcloudService_;
  }));

  it('should do something', function () {
    expect(!!soundcloudService).toBe(true);
  });

});
