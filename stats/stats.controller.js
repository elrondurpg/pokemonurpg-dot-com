'use strict';

app.controller('statsCtrl', ['statsService', 'itemService', 'typeService', 'userService', '$routeParams', '$rootScope', '$location', '$window', '$anchorScroll', '$filter',
    function(statsService, itemService, typeService, userService, $routeParams, $rootScope, $location, $window, $anchorScroll, $filter) {

    var ctrl = this;

    ctrl.pokemonFilterByName = "";
    ctrl.zoomPokemon = undefined;
    ctrl.loadedPokemon = [];

    ctrl.contestRanks = [ "Normal", "Super", "Hyper", "Master" ];
    ctrl.contestAttributes = [ "Beauty", "Cool", "Cute", "Smart", "Tough" ];
    ctrl.itemTypes = [ "New", "Held", "TM", "HM", "Berry", "Evolution", "Mega", "Form", "ZCrystal", "Fossil", "Other" ];
    ctrl.itemTypesPretty = [ "Newly Added Items", "Held Items", "Technical Machines", "Hidden Machines", "Berries", "Evolution Items", "Mega Evolution Items", "Form Changing Items", "Z-Crystals", "Fossils", "Other Items" ];

    ctrl.logFilterByDate = 7;

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

    ctrl.loadItems = function() {
        itemService.findAll().then(function(response) {
            if (response.status == 200) {
                ctrl.items = response.data;
            }
            else {
                console.log("Encountered an error while trying to load the list of items from URPG Server. Please contact a system administrator if this issue persists after refreshing your browser.");
            }
        });
    }

    ctrl.loadTypes();
    ctrl.loadItems();

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
                if (ctrl.trainer.name != ctrl.savedName) {
                    userService.logout();
                }
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

    ctrl.hasItem = function(item) {
        if (ctrl.trainer !== undefined && ctrl.trainer.items !== undefined) {
            for (var i = 0; i < ctrl.trainer.items.length; i++) {
                var check = ctrl.trainer.items[i];
                if (check.name == item) {
                    return true;
                }
            }
        }
        return false;
    }

    ctrl.addItem = function(item, quantity) {
        var newItem = {};
        newItem.name = item;
        newItem.quantity = quantity;
        newItem.type = "New";
        ctrl.trainer.items.push(newItem);
        ctrl.clearItem();
        $('#newItemModal').modal('hide');
    }

    ctrl.clearItem = function() {
        ctrl.newItem = "";
        ctrl.newItemQuantity = 1;
    }

    ctrl.getBadgeImage = function(badgeName) {
        badgeName = badgeName.toLowerCase();
        badgeName = badgeName.replace(/\s/g, "-");
        return $rootScope.imageBase + "/badges/" + badgeName + ".png";
    }

    ctrl.toLocalDate = function(utc) {
        var d = new Date(0);
        d.setUTCMilliseconds(utc);
        return d.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
    }

    ctrl.logWithinLimit = function(log) {
        var d = new Date();
        var limitDate = new Date();
        limitDate.setDate(d.getDate() - ctrl.logFilterByDate);

        return log.timestamp > limitDate.getTime() / 1000;
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

app.directive('statsInventoryAddItemModal', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/stats/partials/stats-inventory-add-item-modal.component.html'
    }
});

app.directive('statsLogs', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/stats/partials/stats-logs.component.html'
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