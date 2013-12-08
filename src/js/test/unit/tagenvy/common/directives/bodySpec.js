'use strict';

describe('tagenvy.directives.body', function() {

    var $injector,
        $compile,
        $rootScope,
        tagenvy;

    beforeEach(module('tagenvy.common'));

    beforeEach(function(){

        // Bootstrap tagenvy
        tagenvy = window.tagenvy;
        tagenvy.bootstrap();

        // Get injector and root scope from tagenvy
        $injector = tagenvy.$injector;
        $rootScope = tagenvy.$rootScope;
        $compile = $injector.get('$compile');
    });

    it('should broadcast a tagenvy:common:init event', function() {

        var rootScopeBroadcastSpy = spyOn($rootScope, '$broadcast');

        var $element = angular.element(document.body);
        $compile($element)($rootScope);
        $rootScope.$digest();

        expect(rootScopeBroadcastSpy).toHaveBeenCalled();
        expect(rootScopeBroadcastSpy).toHaveBeenCalledWith('tagenvy:common:init', jasmine.any(Object), jasmine.any(Object));
    });

    it('should broadcast a tagenvy:common:finalize event', function() {

        var rootScopeBroadcastSpy = spyOn($rootScope, '$broadcast');

        var $element = angular.element(document.body);
        $compile($element)($rootScope);
        $rootScope.$digest();

        expect(rootScopeBroadcastSpy).toHaveBeenCalled();
        expect(rootScopeBroadcastSpy).toHaveBeenCalledWith('tagenvy:common:finalize', jasmine.any(Object), jasmine.any(Object));
    });

    it('should broadcast a tagenvy:<bodyClassName>:init event', function() {

        var spy = spyOn($rootScope, '$broadcast');

        var $element = angular.element(document.body);
        $element.addClass('bodyClassOne');

        $compile($element)($rootScope);

        $rootScope.$digest();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('tagenvy:common:bodyClassOne:init', jasmine.any(Object), jasmine.any(Object));
    });


    it('should broadcast a tagenvy:<bodyClassName>:<bodyId> event', function() {

        var spy = spyOn($rootScope, '$broadcast');

        var $element = angular.element(document.body);

        $element.attr('id', 'bodyId');
        $element.addClass('bodyClassOne');

        $compile($element)($rootScope);

        $rootScope.$digest();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('tagenvy:common:bodyClassOne:init', jasmine.any(Object), jasmine.any(Object));
        expect(spy).toHaveBeenCalledWith('tagenvy:common:bodyClassOne:bodyId', jasmine.any(Object), jasmine.any(Object));
    });

});
