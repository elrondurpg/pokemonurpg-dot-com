'use strict';

app.service('userService', ['$http', '$rootScope', '$window', '$q', function($http, $rootScope, $window, $q){

    var service = this;

    service.oauth2Url = "https://discordapp.com/api/oauth2/authorize"
    service.oauth2ResponseType = "code";
    service.oauth2ClientID = "610294152034385922";
    service.oauth2Scope = "identify";
    service.oauth2RedirectUrl = "http://localhost/pokemonurpg-dot-com/php/loginRedirect.php";

    service.findAll = function() {
        return $http.get($rootScope.serviceHost + "/user").then(
            function (response) {
                return response.data;
            }
        );
    }

    service.sendAuthenticatedRequest = function(method, url, payload) {
        var input = {};
        input.method = method;
        input.url = url;
        input.payload = payload;
        return $http.post('/pokemonurpg-dot-com/php/sendAuthenticatedRequest.php', input).success(function(response) {
            return response;
        }).error(function(response) {
            return response;
        });
    }

    service.login = function(payload) {
        var state = Math.floor(Math.random() * 1000000000);

        $http.post('/pokemonurpg-dot-com/php/setAuthenticationState.php', state)
        .success(
            function(response) {
                $window.location.assign(service.oauth2Url + "?response_type=" + service.oauth2ResponseType + "&client_id=" + service.oauth2ClientID + "&scope=" + service.oauth2Scope + "&state=" + state + "&redirect_uri=" + service.oauth2RedirectUrl);
            }
        )
        .error(
            function(response) {
                return "Something went wrong while trying to log you in with Discord. Please contact your system administrator.";
            }
        );
    }

    service.getUser = function() {
        return $http.post('/pokemonurpg-dot-com/php/getSessionParameter.php', 'username').then(function(response){
            if (response != undefined && response.status == 200) {
                if (response.data !== undefined && response.data != '')
                {
                    service.user = response.data;
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

    service.invite = function(inviteDto) {
        return service.sendAuthenticatedRequest("POST", $rootScope.serviceHost + "/user/invite", inviteDto)
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

    service.logout = function() {
        return $http.post('/pokemonurpg-dot-com/php/logout.php').then(function(response){
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