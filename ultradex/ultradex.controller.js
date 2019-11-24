'use strict';

app.controller('dexCtrl', ['pokemonService', '$routeParams', '$rootScope', '$location', '$window', '$anchorScroll', function(pokemonService, $routeParams, $rootScope, $location, $window, $anchorScroll) {
    var ctrl = this;

    ctrl.displayMove = {};
    ctrl.moveHintsType = "battle";

    pokemonService.findByName($routeParams.name)
    .then(function(response) {
        if (response.status == 200 && !ctrl.isMega(response.data.name)) {
            ctrl.pokemon = response.data;
            console.log(ctrl.pokemon);
            $rootScope.title = '#' + ctrl.pokemon.dexno + ": " + ctrl.pokemon.displayName;
            if (ctrl.pokemon.alteredForms !== undefined) {
                for (var i = 0; i < ctrl.pokemon.alteredForms.length; i++)
                {
                    var form = ctrl.pokemon.alteredForms[i];
                    if (form.name == ctrl.pokemon.name)
                    {
                        ctrl.pokemon.currentForm = i;
                        if (i == 0) {
                            ctrl.formWindowStart = 0;
                        }
                        else {
                            ctrl.formWindowStart = i - 1;
                        }
                        if (ctrl.formWindowStart > ctrl.pokemon.alteredForms.length - 4) {
                            ctrl.formWindowStart = ctrl.pokemon.alteredForms.length - 4;
                        }
                    }
                }
            }
            if (ctrl.pokemon.currentForm === undefined)
                ctrl.pokemon.currentForm = 0;
            if (ctrl.pokemon.parkLocation != null && ctrl.pokemon.parkLocation.name == "Abandoned Power Plant") {
                ctrl.pokemon.parkLocation.name = "Power Plant";
            }
            ctrl.loaded = true;
        }
        else if (response.status == 404) {
            $window.location.assign('/pokemonurpg-dot-com/notfound.html');
        }
        else if (ctrl.isMega(response.data.name)) {
		    $window.location.assign('/pokemon/' + ctrl.removeMegaSuffix(response.data.name));
        }
    });

    ctrl.isMega = function(name) {
        return name.toLowerCase().indexOf("-mega") != -1 || name.indexOf("-primal") != -1 || name.indexOf("-ultra") != -1;
    }

    ctrl.removeMegaSuffix = function(name) {
        if (name.toLowerCase().indexOf("-mega") != -1) {
            return name.toLowerCase().replace("-mega", "");
        }
        if (name.toLowerCase().indexOf("-primal") != -1) {
            return name.toLowerCase().replace("-primal", "");
        }
        if (name.toLowerCase().indexOf("-ultra") != -1) {
            return name.toLowerCase().replace("-ultra", "");
        }
    }

    ctrl.largestEvolutionStage = function()
    {
        var evolutionFamily = ctrl.pokemon.evolutionFamily;
        if (evolutionFamily == null)
            return 0;
        var length0 = evolutionFamily[0].length;
        var length1 = evolutionFamily[1].length;
        var length2 = evolutionFamily[2].length;
        var max = Math.max(length0, length1, length2);
        if (max == length0)
        {
                return evolutionFamily[0];
        }

        if (max == length1)
        {
                return evolutionFamily[1];
        }

        if (max == length2)
        {
                return evolutionFamily[2];
        }
    };

    ctrl.largestEvolutionStageLength = function()
    {
        var evolutionFamily = ctrl.pokemon.evolutionFamily;
        return Math.max(evolutionFamily[0].length, evolutionFamily[1].length, evolutionFamily[2].length);
    };

    ctrl.rowspanClass = function(stage)
    {
        var evolutionFamily = ctrl.pokemon.evolutionFamily;
        var longestLength = ctrl.largestEvolutionStageLength();

        if (stage.length != longestLength)
        {
            return "dex-evolution-chain-pokemon-rowspan" + longestLength;
        }
        else return "dex-evolution-chain-pokemon";
    };

    ctrl.evolveString = function(species)
    {
        var method = species.method;
        var evolutionFamily = ctrl.pokemon.evolutionFamily;
        var exp = 0;
        if (evolutionFamily[2].length > 0 && species.name != "Mr. Mime")
            exp = 5;
        else exp = 7;

        if (method != null)
        {
            if (method.indexOf("Level Up") != -1)
            {
                method = method.replace("Level Up", "Gain " + exp + " EXP");
            }
            else
            {
                method = "Gain " + exp + " EXP + " + method;
            }
        }
        return method;
    }

    ctrl.getCurrentImageTag = function() {
        if (ctrl.pokemon.alteredForms.length == 0) {
            return ctrl.suffix(ctrl.pokemon.displayName, ctrl.pokemon.name);
        }
        else if (ctrl.pokemon.alteredForms.length > 0) {
            var form = ctrl.pokemon.alteredForms[ctrl.pokemon.currentForm];
            return ctrl.suffix(form.displayName, form.name);
        }
    }

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

    this.hoverMove = function(move)
    {
        ctrl.displayMove = move;
    };

    this.threeDigit = function(input) {
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

    this.hpBenchmark = 540;
    this.statBenchmark = 450;

    this.getStatBarClass = function(stat, benchmark) {
        if (stat >= (benchmark * .66)) {
            return 'success';
        }
        else if (stat >= (benchmark * .5)) {
            return 'warning';
        }
        else return 'danger';
    }

    this.getStatBarSize = function(stat, benchmark) {
        if (stat >= benchmark) {
            return 100;
        }
        else {
            return Math.floor((stat / benchmark) * 100);
        }
    }

    this.getGrassKnotDamage = function(weight) {
        if (weight < 10)
            return 20;
        else if (weight < 25)
            return 40;
        else if (weight < 50)
            return 60;
        else if (weight < 100)
            return 80;
        else if (weight < 200)
            return 100;
        else
            return 120;
    };

    this.toImperialHeight = function(height) {
        var inches = Math.floor(height * 39.3701);
        var feet = Math.floor(inches / 12);
        inches = inches % 12;

        return "" + feet + "'" + inches + "\"";
    };

    this.toImperialWeight = function(weight) {
        var pounds = (weight * 2.20462).toFixed(1);
        return pounds;
    };

    ctrl.matchupClass = function(multiplier)
    {
        switch (multiplier)
        {
            case 0: return "type-box-0";
                    break;
            case 0.5: return "type-box-50";
                    break;
            case 1: return "type-box-100";
                    break;
            case 0.25: return "type-box-25";
                    break;
            case 2: return "type-box-200";
                    break;
            case 4: return "type-box-400";
                    break;
        }
    };

    ctrl.fraction = function(decimal) {
        if (decimal == '0')
            return '0';
        else if (decimal == '0.25')
            return '\xBC';
        else if (decimal == '0.5')
            return '\xBD';
        else if (decimal == '1')
            return '1';
        else if (decimal == '2')
            return '2';
        else if (decimal == '4')
            return '4';
    };

    ctrl.getMegaText = function() {
        if (ctrl.pokemon.name.toUpperCase().indexOf("NECROZMA") == -1)
        {
            return "Mega Evolve";
        }
        return "Ultra Burst";
    }

    ctrl.getMegaRingText = function() {
        if (ctrl.pokemon.name.toUpperCase().indexOf("NECROZMA") == -1)
        {
            return "Mega Ring + ";
        }
        return "";
    }

    ctrl.getForm = function(form, index) {
        if (form.baseName == ctrl.pokemon.alteredForms[ctrl.pokemon.currentForm].baseName)
            return index;
        else return ctrl.pokemon.currentForm;
    }

    ctrl.switchMoveHintsType = function () {
        if (ctrl.moveHintsType == "battle")
        {
            ctrl.moveHintsType = "contest";
        }
        else
        {
            ctrl.moveHintsType = "battle";
        }
    }

    ctrl.decrementFormWindow = function() {
        if (ctrl.formWindowStart > 0) {
            ctrl.formWindowStart--;
        }
    }

    ctrl.incrementFormWindow = function() {
        if (ctrl.formWindowStart < ctrl.pokemon.alteredForms.length - 4) {
            ctrl.formWindowStart++;
        }
    }

    ctrl.anchorScroll = function(anchor) {
        var old = $location.hash();
        $location.hash(anchor);
        $anchorScroll();

        //reset to old to keep any additional routing logic from kicking in
        $location.hash(old);
    }

    ctrl.getRseScore = function() {
        if (ctrl.displayMove.rseContestMoveType != null) {
            if (ctrl.displayMove.rseContestMoveType.score > 0)
                return ctrl.displayMove.rseContestMoveType.score;
            else return 0;
        }
        else return 0;
    }

    ctrl.getRseJam = function() {
        if (ctrl.displayMove.rseContestMoveType != null) {
            if (ctrl.displayMove.rseContestMoveType.jam > 0)
                return ctrl.displayMove.rseContestMoveType.jam;
            else return 0;
        }
        else return 0;
    }

    ctrl.getDppScore = function() {
        if (ctrl.displayMove.dppContestMoveType != null) {
            if (ctrl.displayMove.dppContestMoveType.score > 0)
                return ctrl.displayMove.dppContestMoveType.score;
            else return 0;
        }
        else return 0;
    }

    ctrl.getDppJam = function() {
        if (ctrl.displayMove.dppContestMoveType != null) {
            if (ctrl.displayMove.dppContestMoveType.jam > 0)
                return ctrl.displayMove.dppContestMoveType.jam;
            else return 0;
        }
        else return 0;
    }

    ctrl.getOrasScore = function() {
        if (ctrl.displayMove.orasContestMoveType != null) {
            if (ctrl.displayMove.orasContestMoveType.score > 0)
                return ctrl.displayMove.orasContestMoveType.score;
            else return 0;
        }
        else return 0;
    }

    ctrl.getOrasJam = function() {
        if (ctrl.displayMove.orasContestMoveType != null) {
            if (ctrl.displayMove.orasContestMoveType.jam > 0)
                return ctrl.displayMove.orasContestMoveType.jam;
            else return 0;
        }
        else return 0;
    }

}]);

app.directive('dexHeader', function() {
    return {
        restrict: 'E',
        templateUrl: "/pokemonurpg-dot-com/ultradex/partials/dex-header.component.html"
    };
});

app.directive('dexContainer', function() {
   return {
       restrict: 'E',
       templateUrl: '/pokemonurpg-dot-com/ultradex/partials/dex-container.component.html'
   };
});

app.directive('nametagContainer', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/ultradex/partials/nametag-container.component.html'
    }
});

app.directive('nametagForms', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/ultradex/partials/nametag-forms.component.html'
    }
});

app.directive('nametagSprite', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/ultradex/partials/nametag-sprite.component.html'
    }
});

app.directive('nametagInfo', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/ultradex/partials/nametag-info.component.html'
    }
});

app.directive('abilityContainer', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/ultradex/partials/ability-container.component.html'
    }
});

app.directive('statsContainer', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/ultradex/partials/stats-container.component.html'
    }
});

app.directive('typeMatchupContainer', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/ultradex/partials/type-matchup-container.component.html'
    }
});

app.directive('miscInfoContainer', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/ultradex/partials/misc-info-container.component.html'
    }
});

app.directive('evolutionStage', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/ultradex/partials/evolution-stage.component.html'
    }
});

app.directive('captureInfoContainer', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/ultradex/partials/capture-info-container.component.html'
    }
});

app.directive('learnsetContainer', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/ultradex/partials/learnset-container.component.html'
    }
});

app.directive('moveHintsContainer', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/ultradex/partials/move-hints-container.component.html'
    }
});

app.directive('megaEvolutionContainer', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/ultradex/partials/mega-evolution-container.component.html'
    }
});

app.directive('formInfoContainer', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/ultradex/partials/form-info-container.component.html'
    }
});

app.directive('moveHintsBattlePage', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/ultradex/partials/move-hints-battle-page.component.html'
    }
});

app.directive('moveHintsContestDppPage', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/ultradex/partials/move-hints-contest-dpp-page.component.html'
    }
});

app.directive('moveHintsContestRsePage', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/ultradex/partials/move-hints-contest-rse-page.component.html'
    }
});

app.directive('moveHintsContestOrasPage', function() {
    return {
        restrict: 'E',
        templateUrl: '/pokemonurpg-dot-com/ultradex/partials/move-hints-contest-oras-page.component.html'
    }
});