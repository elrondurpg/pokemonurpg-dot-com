'use strict';

app.service('userService', ['$http', '$rootScope', function($http, $rootScope){

    var service = this;

    service.isLoggedIn = function(name) {
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


}]);