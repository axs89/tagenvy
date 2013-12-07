/**
 * @ngdoc object
 * @name service:location
 *
 * @description
 * Service factory for location object
 *
 * Wrapper for the AngularJS $location service to prevent
 * tampering with location if necessary.
 *
 * Currently just wraps the $location service without changes.
 *
 */

angular.module('tagenvy.services')
    .factory('location', ['$location', function ($location) {

        return $location;

    }]);