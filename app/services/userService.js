'use strict';

app.service('userService', ['$http', '$rootScope', '$window', function($http, $rootScope, $window){

    var service = this;

    service.sendAuthenticatedRequest = function(method, url, payload) {
        var input = {};
        input.method = method;
        input.url = url;
        input.payload = payload;
        return $http.post('/app/php/sendAuthenticatedRequest.php', input).success(function(response) {
            return response;
        }).error(function(response) {
            return response;
        });
    }

    service.login = function(payload) {
        payload.browser = $window.navigator.userAgent;
        return $http.post('/app/php/login.php',payload).then(function(response){
            return response;
        });
    }

    service.getUser = function() {
        return $http.post('/app/php/getUser.php').then(function(response){
            if (response != undefined && response.status == 200) {
                if (response.data !== undefined && response.data != '')
                {
                    return response.data;
                }
            }
            return '';
        });
    }

    service.findByName = function(name) {
        return $http.get($rootScope.serviceHost + "/user/" + name).then(
             function (response) {
                return response.data;
             }
        );
    }

    service.invite = function(username) {
        return service.sendAuthenticatedRequest("POST", $rootScope.serviceHost + "/user/invite", username)
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

    service.registerBeta = function(payload) {
        return $http.put($rootScope.serviceHost + "/user/registerBeta", payload).then(
            function (response) {
                return response;
            }
        );
    }

    service.logout = function() {
        return $http.post('/app/php/logout.php').then(function(response){
            return response;
        });
    }

    service.updateMember = function(payload) {
        return service.sendAuthenticatedRequest("PUT", $rootScope.serviceHost + "/user/", payload)
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