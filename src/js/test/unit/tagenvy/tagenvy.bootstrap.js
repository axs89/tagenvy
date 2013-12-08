'use strict';

describe('tagenvy', function() {

    var $rootScope,
        tagenvy;

    beforeEach(function(){

        // Bootstrap tagenvy
        tagenvy = window.tagenvy;
        tagenvy.bootstrap();
        $rootScope = tagenvy.$rootScope;
    });

    it('should broadcast a tagenvy:ready event', function() {

        var rootScopeBroadcastSpy = spyOn($rootScope, '$broadcast');

        tagenvy.postBootstrap();

        expect(rootScopeBroadcastSpy).toHaveBeenCalled();
        expect(rootScopeBroadcastSpy).toHaveBeenCalledWith('tagenvy:ready');
    });

});
