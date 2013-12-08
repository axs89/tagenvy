'use strict';

// Since we are wrapping the $location service, we don't need to
// explicitly test the functionality, but merely the presence
// of the expected methods

describe('tagenvy location service', function() {

    var service;

    beforeEach(module('tagenvy'));

    beforeEach(inject(function($injector) {
        service = $injector.get('location');
    }));

    it('should exist', function() {
        expect(service).toBeDefined();
    });

    it('should have a \'absUrl\' method', function() {
        expect(typeof service.absUrl).toBe('function');
    });

    it('should have a \'hash\' method', function() {
        expect(typeof service.hash).toBe('function');
    });

    it('should have a \'host\' method', function() {
        expect(typeof service.host).toBe('function');
    });
    it('should have a \'path\' method', function() {
        expect(typeof service.path).toBe('function');
    });

    it('should have a \'port\' method', function() {
        expect(typeof service.port).toBe('function');
    });

    it('should have a \'protocol\' method', function() {
        expect(typeof service.protocol).toBe('function');
    });

    it('should have a \'search\' method', function() {
        expect(typeof service.search).toBe('function');
    });

    it('should have a \'url\' method', function() {
        expect(typeof service.url).toBe('function');
    });
});
