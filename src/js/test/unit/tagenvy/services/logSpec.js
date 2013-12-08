'use strict';

// Since we are wrapping the $log service, we don't need to
// explicitly test the functionality, but merely the presence
// of the expected methods

describe('tagenvy log service', function() {

    var service;

    beforeEach(module('tagenvy'));

    beforeEach(inject(function($injector) {
        service = $injector.get('log');
    }));

    it('should exist', function() {
        expect(service).toBeDefined();
    });

    it('should have a \'debug\' method', function() {
        expect(typeof service.debug).toBe('function');
    });

    it('should have a \'error\' method', function() {
        expect(typeof service.error).toBe('function');
    });

    it('should have a \'info\' method', function() {
        expect(typeof service.info).toBe('function');
    });
    it('should have a \'log\' method', function() {
        expect(typeof service.log).toBe('function');
    });

    it('should have a \'warn\' method', function() {
        expect(typeof service.warn).toBe('function');
    });

});
