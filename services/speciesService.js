'use strict';
app.service('pokemonService', ['$http', '$rootScope', function($http, $rootScope){

    var service = this;

    service.findByName = function(name) {

        return $http.get($rootScope.serviceHost + "/pokemon/" + name)
            .then(
                function (response) {
                  return response.data;
                },
               function (httpError) {
                  throw httpError.status + " : " +
                        httpError.data;
               });

    };

}]);