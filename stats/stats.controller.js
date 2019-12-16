'use strict';

app.controller('statsCtrl', ['statsService', 'typeService', 'userService', '$routeParams', '$rootScope', '$location', '$window', '$anchorScroll', '$filter',
    function(statsService, typeService, userService, $routeParams, $rootScope, $location, $window, $anchorScroll, $filter) {

    var ctrl = this;

    ctrl.pokemonFilterByName = "";
    ctrl.zoomPokemon = undefined;
    ctrl.loadedPokemon = [];

    ctrl.contestRanks = [ "Normal", "Super", "Hyper", "Master" ];
    ctrl.contestAttributes = [ "Beauty", "Cool", "Cute", "Smart", "Tough" ];
    ctrl.itemTypes = [ "Held", "TM", "HM", "Berry", "Evolution", "Mega", "Form", "ZCrystal", "Fossil", "Other" ];
    ctrl.itemTypesPretty = [ "Held Items", "Technical Machines", "Hidden Machines", "Berries", "Evolution Items", "Mega Evolution Items", "Form Changing Items", "Z-Crystals", "Fossils", "Other Items" ];

    statsService.findByName($routeParams.name)
    .then(function(response) {
        if (response.status == 200) {
            console.log(response.data);
            ctrl.trainer = response.data;
            ctrl.savedName = ctrl.trainer.name;
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
                if (response.status == 200) {
                    ctrl.zoomPokemon = response.data;
                    ctrl.loadedPokemon[dbid] = ctrl.zoomPokemon;
                }
            });
        }
    }

    ctrl.save = function() {
        statsService.updateStats(ctrl.trainer, ctrl.savedName)
        .success(
            function(response) {
                $window.location.assign('/stats/' + ctrl.trainer.name);
            }
        )
        .error(
            function(response) {
                ctrl.error = response.data;
            }
        );
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

    ctrl.getLegendaryProgressPercent = function(record, tier) {
        if (tier == 1) {
            return record.progress / record.requirementTier1 * 100;
        }
        else {
            return record.progress / record.requirementTier2 * 100;
        }
    }

    ctrl.getLegendaryProgressString = function(record, requirement) {
        if (record.section == "Reffing" || record.section == "Judging" ||
            record.section == "Art" || record.section == "Curating" ||
            record.section == "Writing" || record.section == "Grading" || record.section == "Ranger") {
            return $filter('currency')(record.progress, '$', 0) + "/" + $filter('currency')(requirement, '$', 0);
        }
        else if (record.section == "Contests") {
            return record.progress + "/" + requirement + " Master ribbons";
        }
        else if (record.section == "National Park") {
            return record.progress + "/" + requirement + " characters";
        }
        else if (record.section == "Legend Defender") {
            return record.progress + "/" + requirement + " wins";
        }
        else if (record.section == "Morphic") {
            return record.progress + "/" + requirement + " posts";
        }
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

    ctrl.getBadgeImage = function(badgeName) {
        badgeName = badgeName.toLowerCase();
        badgeName = badgeName.replace(/\s/g, "-");
        return $rootScope.imageBase + "/badges/" + badgeName + ".png";
    }

}]);

app.directive('statsTrainer', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/stats/partials/stats-trainer.component.html'
    }
});

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

app.directive('statsMatches', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/stats/partials/stats-matches.component.html'
    }
});

app.directive('statsAchievements', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/stats/partials/stats-achievements.component.html'
    }
});

app.directive('statsAchievementsNoviceLeague', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/stats/partials/stats-achievements-novice-league.component.html'
    }
});

app.directive('statsAchievementsAdvancedLeague', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/stats/partials/stats-achievements-advanced-league.component.html'
    }
});

app.directive('statsAchievementsLegendaryProgress', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/stats/partials/stats-achievements-legendary-progress.component.html'
    }
});

app.directive('statsAchievementsLegendaryProgressDetails', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/stats/partials/stats-achievements-legendary-progress-details.component.html'
    }
});