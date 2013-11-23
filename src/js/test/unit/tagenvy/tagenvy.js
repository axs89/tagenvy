'use strict';

// Set the jasmine fixture path
// jasmine.getFixtures().fixturesPath = 'base/';

describe('tagenvy', function() {

    var module;
    var dependencies;
    dependencies = [];

    var hasModule = function(module) {
        return dependencies.indexOf(module) >= 0;
    };

    beforeEach(function() {

        // Get module
        module = angular.module('tagenvy');
        dependencies = module.requires;
    });

    it('should load config module', function() {
        expect(hasModule('tagenvy.config')).toBeTruthy();
    });

    it('should load controllers module', function() {
        expect(hasModule('tagenvy.controllers')).toBeTruthy();
    });

    it('should load filters module', function() {
        expect(hasModule('tagenvy.filters')).toBeTruthy();
    });

    it('should load directives module', function() {
        expect(hasModule('tagenvy.directives')).toBeTruthy();
    });

    it('should load services module', function() {
        expect(hasModule('tagenvy.services')).toBeTruthy();
    });

});
