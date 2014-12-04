'use strict';

describe('Directive: bigHand', function () {

  // load the directive's module
  beforeEach(module('variousAssetsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<big-hand></big-hand>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bigHand directive');
  }));
});
