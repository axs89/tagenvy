'use strict';

describe('tagenvy.directives.body', function() {

    var $rootScope,
        rootScopeBroadcastSpy;

    beforeEach(module('tagenvy.client'));

    beforeEach(inject(function($compile, _$rootScope_, _$injector_) {

        // Attach injector and rootscope to tagenvy
        window.tagenvy.$injector = _$injector_;
        window.tagenvy.$rootScope = _$rootScope_;

        $rootScope = _$rootScope_;

        // Create spy
        rootScopeBroadcastSpy = spyOn($rootScope, '$broadcast');

        // Compile markup
        $compile('<html><body><p></p></body></html>')($rootScope);

        // Perform digest cycle
        $rootScope.$digest();

        // Perform postBootstrap
        window.tagenvy.postBootstrap();
    }));

    it('should broadcast a tagenvy:ready event', function() {
        expect(rootScopeBroadcastSpy).toHaveBeenCalledWith('tagenvy:ready');
    });

});
