'use strict';

describe('tagenvy.common module', function() {

    var module,
        dependencies;

    dependencies = [];

    var hasModule = function(module) {
        return dependencies.indexOf(module) >= 0;
    };

    beforeEach(function() {

        // Get module
        module = angular.module('tagenvy.common');
        dependencies = module.requires;
    });

    it('should load directives module', function() {
        expect(hasModule('tagenvy.common.directives')).toBeTruthy();
    });

    it('should load common module', function() {
        expect(hasModule('tagenvy.common.services')).toBeTruthy();
    });

});
