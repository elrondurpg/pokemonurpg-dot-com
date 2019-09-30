'use strict';

app.service('userService', ['$http', '$rootScope', '$window', function($http, $rootScope, $window){

    var service = this;

    service.login = function(payload) {
        return $http.post('/app/php/login.php',payload).then(function(response){
            if (response.status == 200){
                service.username = response.data.username;
            }
            return response;
        });
    }

    service.getUser = function() {
        return service.username;
    }



    /*service.isLoggedIn = function(name) {
        return sessionStorage.getItem("username") == name;
    }

    service.login = function(payload) {
        return $http.post($rootScope.serviceHost + "/user/login", payload).success(
            function (response) {
                if (response.status == 200) {
                    sessionStorage.setItem("username", payload.username);
                    sessionStorage.setItem("authToken", response.data);
                }
                return response;
            }
        );
    }



    service.buildAuthenticatedRequest = function(payload) {
        var request = {};
        request.username = service.getUser();
        request.authToken = service.getAuthToken();
        request.browser = service.getBrowser();
        request.payload = payload;
        return request;
    }

    service.getUser = function() {
        return sessionStorage.getItem("username");
    }

    service.getAuthToken = function() {
        return sessionStorage.getItem("authToken");
    }

    service.getBrowser = function() {
        return $window.navigator.userAgent;
    }*/


}]);