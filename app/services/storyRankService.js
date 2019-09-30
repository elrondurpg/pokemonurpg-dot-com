'use strict';
app.service('storyRankService', ['$http', '$rootScope', function($http, $rootScope){

    var service = this;

    service.findAll = function() {
        return $http.get($rootScope.serviceHost + "/storyrank").then(
            function (response) {
                return response.data;
            }
        );
    }

}]);