'use strict';
app.service('roleService', ['userService', '$http', '$rootScope', function(userService, $http, $rootScope){

    var service = this;

    service.findAll = function() {
        return $http.get($rootScope.serviceHost + "/role").then(
            function (response) {
                return response.data;
            }
        );
    }

    service.findByName = function(name) {
        return $http.get($rootScope.serviceHost + "/role/" + name).then(
             function (response) {
                return response.data;
             }
        );
    }

    service.createRole = function(payload) {
        return userService.sendAuthenticatedRequest("POST", $rootScope.serviceHost + "/role/", payload)
        .success(
            function (response) {
                return response;
            }
        )
        .error(
            function(response) {
                return response;
            }
        );
    }

    service.updateRole = function(payload) {
        return userService.sendAuthenticatedRequest("PUT", $rootScope.serviceHost + "/role/", payload)
        .success(
            function (response) {
                return response;
            }
        )
        .error(
            function(response) {
                return response;
            }
        );
    }
}]);