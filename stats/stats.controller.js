'use strict';

app.controller('statsCtrl', ['statsService', 'typeService', '$routeParams', '$rootScope', '$location', '$window', '$anchorScroll', function(statsService, typeService, $routeParams, $rootScope, $location, $window, $anchorScroll) {
    var ctrl = this;

    ctrl.pokemonFilterByName = "";

    statsService.findByName($routeParams.name)
    .then(function(response) {
        if (response.status == 200) {
            ctrl.trainer = response.data;
            $rootScope.title = ctrl.trainer.name + "'s Stats";

            ctrl.loaded = true;
        }
        else if (response.status == 404) {
            $window.location.assign('/pokemonurpg-dot-com/notfound.html');
        }
    });

    ctrl.loadTypes = function() {
        typeService.findAll().then(function(response) {
            if (response.status == 200) {
                ctrl.types = response.data;
                ctrl.types.splice(ctrl.types.indexOf("NONE"), 1);
            }
            else {
                console.log("Encountered an error while trying to load the list of types from URPG Server. Please contact a system administrator if this issue persists after refreshing your browser.");
            }
        });
    }

    ctrl.loadTypes();

    this.suffix = function(base, input) {
        if (input !== undefined) {
            if (input.toLowerCase().indexOf("ultra") != -1)
            {
                return "-ultra";
            }

            base = base.toLowerCase();
            input = input.toLowerCase();

            base = base.replace("\\", "");
            input = input.replace("\\", "");

            if ($rootScope.dashExceptions.indexOf(input) == -1)
            {
                return input.replace(base, "");
            }
        }
        return "";
    };

}]);
app.directive('statsPokemon', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/stats/partials/stats-pokemon.component.html'
    }
});