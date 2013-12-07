'use strict';

describe('tagenvy.common module', function () {

    var module,
        dependencies;

    dependencies = [];

    var hasModule = function (module) {
        return dependencies.indexOf(module) >= 0;
    };

    beforeEach(function () {

        // Get module
        module = angular.module('tagenvy.common');
        dependencies = module.requires;
    });

    it('should load the tagenvy module', function () {
        expect(hasModule('tagenvy')).toBeTruthy();
    });

    it('should load the tagenvy.common.directives module', function () {
        expect(hasModule('tagenvy.common.directives')).toBeTruthy();
    });

    it('should load the tagenvy.common.services module', function () {
        expect(hasModule('tagenvy.common.services')).toBeTruthy();
    });
});
