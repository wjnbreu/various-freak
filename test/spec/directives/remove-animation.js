'use strict';

describe('Directive: removeAnimation', function () {

  // load the directive's module
  beforeEach(module('variousAssetsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<remove-animation></remove-animation>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the removeAnimation directive');
  }));
});
