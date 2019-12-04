'use strict';

app.controller('statsCtrl', ['statsService', 'typeService', '$routeParams', '$rootScope', '$location', '$window', '$anchorScroll', function(statsService, typeService, $routeParams, $rootScope, $location, $window, $anchorScroll) {
    var ctrl = this;

    ctrl.pokemonFilterByName = "";
    ctrl.zoomPokemon = undefined;
    ctrl.loadedPokemon = [];

    ctrl.contestRanks = [ "Normal", "Super", "Hyper", "Master" ];
    ctrl.contestAttributes = [ "Beauty", "Cool", "Cute", "Smart", "Tough" ];
    ctrl.itemTypes = ["TM", "HM", "Berry", "Held", "Evolution", "Mega", "Form", "ZCrystal", "Fossil", "Other" ];
    ctrl.itemTypesPretty = [ "TMs", "HMs", "Berries", "Held Items", "Evolution Items", "Mega Evolution Items", "Form Changing Items", "Z-Crystals", "Fossils", "Other Items" ];

    statsService.findByName($routeParams.name)
    .then(function(response) {
        console.log(response);
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

    ctrl.zoomOnPokemon = function(dbid) {
        if (ctrl.loadedPokemon[dbid] !== undefined) {
            ctrl.zoomPokemon = ctrl.loadedPokemon[dbid];
        }
        else {
            statsService.findOwnedPokemonByDbid(dbid)
            .then(function(response) {
                console.log(response);
                if (response.status == 200) {
                    ctrl.zoomPokemon = response.data;
                    ctrl.loadedPokemon[dbid] = ctrl.zoomPokemon;
                }
            });
        }
    }

    ctrl.getRibbonQuantity = function(attribute, rank) {
        var ribbons = ctrl.zoomPokemon.ribbons;
        for (var i = 0; i < ribbons.length; i++) {
            if (ribbons[i].attribute == attribute) {
                if (ribbons[i].rank == rank) {
                    return ribbons[i].quantity;
                }
            }
        }
        return 0;
    }

    ctrl.hasRibbons = function(attribute) {
        var ribbons = ctrl.zoomPokemon.ribbons;
        for (var i = 0; i < ribbons.length; i++) {
            if (ribbons[i].attribute == attribute) {
                if (ribbons[i].quantity > 0) {
                    return true;
                }
            }
        }
        return false;
    }

    ctrl.suffix = function(base, input) {
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

    ctrl.threeDigit = function(input) {
        if (input < 10)
        {
            return "00" + input;
        }
        else if (input < 100)
        {
            return "0" + input;
        }
        else return input;
    };

    ctrl.hasItemOfType = function(itemType) {
        for (var i = 0; i < ctrl.trainer.items.length; i++) {
            var item = ctrl.trainer.items[i];
            if (itemType == item.type) {
                return true;
            }
        }
        return false;
    }

}]);

app.directive('statsPokemon', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/stats/partials/stats-pokemon.component.html'
    }
});

app.directive('statsPokemonZoom', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/stats/partials/stats-pokemon-zoom.component.html'
    }
});

app.directive('statsInventory', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/stats/partials/stats-inventory.component.html'
    }
});