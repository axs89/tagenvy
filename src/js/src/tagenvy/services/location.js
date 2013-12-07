/**
 * @ngdoc object
 * @name service:location
 *
 * @description
 * Service factory for location object
 *
 * This wraps the AngularJS $location service but only provides getter methods
 * to prevent tampering with the actual location.
 *
 */

angular.module('tagenvy.services')
    .factory('location', ['$location', function ($location) {

        var Location = function Location() {};

        angular.extend(Location.prototype, {
            absUrl: function(){
                return $location.absUrl();
            }
        });

        return new Location();
    }]);