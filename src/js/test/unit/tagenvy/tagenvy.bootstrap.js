'use strict';

describe('tagenvy', function() {

    var $injector,
        $rootScope,
        tagenvy;

    // Load tagenvy from global window object
    tagenvy = window.tagenvy;

    tagenvy.bootstrap();

    beforeEach(function(){

        // Get root scope from tagenvy
        $rootScope = tagenvy.$rootScope;
    });

    it('should broadcast a tagenvy:ready event', function() {

        var rootScopeBroadcastSpy = spyOn($rootScope, '$broadcast');

        tagenvy.postBootstrap();

        expect(rootScopeBroadcastSpy).toHaveBeenCalled();
        expect(rootScopeBroadcastSpy).toHaveBeenCalledWith('tagenvy:ready');
    });

});
