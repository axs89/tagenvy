'use strict';

describe('tagenvy', function() {

    var module,
        dependencies;

    dependencies = [];

    var hasModule = function(module) {
        return dependencies.indexOf(module) >= 0;
    };

    beforeEach(function() {

        // Get module
        module = angular.module('tagenvy');
        dependencies = module.requires;
    });

    it('should load the tagenvy.config module', function() {
        expect(hasModule('tagenvy.config')).toBeTruthy();
    });

    it('should load the tagenvy.services module', function() {
        expect(hasModule('tagenvy.services')).toBeTruthy();
    });

});
