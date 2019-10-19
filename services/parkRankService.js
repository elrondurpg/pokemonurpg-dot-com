'use strict';
app.service('parkRankService', ['$http', '$rootScope', function($http, $rootScope){

    var service = this;

    service.findAll = function() {
        return $http.get($rootScope.serviceHost + "/parkrank").then(
            function (response) {
                return response.data;
            }
        );
    }

}]);