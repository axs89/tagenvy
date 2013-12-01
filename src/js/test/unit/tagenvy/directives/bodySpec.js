'use strict';

// @todo Testing directives do not support the body element. Can we find an alternative?

describe('tagenvy.directives.body', function() {

    var $injector,
        $compile,
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
        $compile = $injector.get('$compile');
    });

    it('should broadcast a tagenvy:body:init event', function() {

        var rootScopeBroadcastSpy = spyOn($rootScope, '$broadcast');
        var $location = $injector.get('$location');

        var $element = angular.element(document.body);
        $compile($element)($rootScope);
        $rootScope.$digest();

        expect(rootScopeBroadcastSpy).toHaveBeenCalled();
        expect(rootScopeBroadcastSpy).toHaveBeenCalledWith('tagenvy:body:init', $location);
    });

    it('should broadcast a tagenvy:common:init event', function() {

        var rootScopeBroadcastSpy = spyOn($rootScope, '$broadcast');
        var $location = $injector.get('$location');

        var $element = angular.element(document.body);
        $compile($element)($rootScope);
        $rootScope.$digest();

        expect(rootScopeBroadcastSpy).toHaveBeenCalled();
        expect(rootScopeBroadcastSpy).toHaveBeenCalledWith('tagenvy:common:init', $location);
    });

    it('should broadcast a tagenvy:common:finalize event', function() {

        var rootScopeBroadcastSpy = spyOn($rootScope, '$broadcast');
        var $location = $injector.get('$location');

        var $element = angular.element(document.body);
        $compile($element)($rootScope);
        $rootScope.$digest();

        expect(rootScopeBroadcastSpy).toHaveBeenCalled();
        expect(rootScopeBroadcastSpy).toHaveBeenCalledWith('tagenvy:common:finalize', $location);
    });

    it('should broadcast a tagenvy:<bodyClassName>:init event', function() {

        var spy = spyOn($rootScope, '$broadcast');

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
