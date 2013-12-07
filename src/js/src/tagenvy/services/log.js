/**
 * @ngdoc object
 * @name service:log
 *
 * @description
 * Service factory for log object
 *
 * Wrapper for the AngularJS $log service.
 *
 * Currently just wraps the $log service without changes.
 *
 */

angular.module('tagenvy.services')
    .factory('log', ['$log', function ($log) {

        return $log;

    }]);