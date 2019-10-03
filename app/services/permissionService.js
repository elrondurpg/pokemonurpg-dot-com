'use strict';
app.service('permissionService', ['userService', '$http', '$rootScope', function(userService, $http, $rootScope){

    var service = this;

    service.findAll = function() {
        return $http.get($rootScope.serviceHost + "/permission").then(
            function (response) {
                return response.data;
            }
        );
    }

    service.findByName = function(name) {
        return $http.get($rootScope.serviceHost + "/permission/" + name).then(
             function (response) {
                return response.data;
             }
        );
    }

    service.createPermission = function(payload) {
        return userService.sendAuthenticatedRequest("POST", $rootScope.serviceHost + "/permission/", payload).then(
            function (response) {
                return response.data;
            }
        );
    }

    service.updatePermission = function(payload) {
        return userService.sendAuthenticatedRequest("PUT", $rootScope.serviceHost + "/permission/", payload).then(
            function (response) {
                return response.data;
            }
        );
    }
}]);