'use strict';

// @todo Testing directives do not support the body element. Can we find an alternative?

describe('tagenvy.directives.body', function() {

    var $injector,
        $rootScope,
        tagenvy;

    // Load tagenvy from global window object
    tagenvy = window.tagenvy;

    // Bootstrap tagenvy so it's injector and root scope are initialized
    tagenvy.bootstrap();

    beforeEach(module('tagenvy.client'));

    beforeEach(function(){

        // Get injector and root scope from tagenvy
        $injector = tagenvy.$injector;
        $rootScope = tagenvy.$rootScope;
    });

    it('should broadcast a tagenvy:body:init event', function() {

        var rootScopeBroadcastSpy = spyOn($rootScope, '$broadcast');
        var $location = $injector.get('$location');

        // Run tagenvy $digest cycle
        tagenvy.$digest();

        expect(rootScopeBroadcastSpy).toHaveBeenCalled();
        expect(rootScopeBroadcastSpy).toHaveBeenCalledWith('tagenvy:body:init', $location);
    });

    it('should broadcast a tagenvy:<bodyClassName>:init event', function() {

        var spy = spyOn($rootScope, '$broadcast');

        var $compile = $injector.get('$compile');
        var $element = angular.element(document.body);

        $element.addClass('bodyClassOne');

        $compile($element)($rootScope);

        var $location = $injector.get('$location');

        $rootScope.$digest();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('tagenvy:bodyClassOne:init', $location);
    });


    it('should broadcast a tagenvy:<bodyClassName>:<bodyId> event', function() {

        var spy = spyOn($rootScope, '$broadcast');

        var $compile = $injector.get('$compile');
        var $element = angular.element(document.body);

        $element.attr('id', 'bodyId');
        $element.addClass('bodyClassOne');

        $compile($element)($rootScope);

        var $location = $injector.get('$location');

        $rootScope.$digest();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('tagenvy:bodyClassOne:init', $location);
        expect(spy).toHaveBeenCalledWith('tagenvy:bodyClassOne:bodyId', $location);
    });

});
