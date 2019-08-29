'use strict';

app.controller('dexCtrl', ['pokemonService', '$routeParams', '$rootScope', '$window', function(pokemonService, $routeParams, $rootScope, $window) {
    var ctrl = this;

    ctrl.displayMove = {};
    ctrl.moveHintsType = "battle";

    pokemonService.findByName($routeParams.name)
        .then(function(response) {
            if (response.status == 200) {
                ctrl.pokemon = response.data;
                $rootScope.title = '#' + ctrl.pokemon.dexno + ": " + ctrl.pokemon.displayName;
                if (ctrl.pokemon.alteredForms !== undefined) {
                    for (var i = 0; i < ctrl.pokemon.alteredForms.length; i++)
                    {
                        var form = ctrl.pokemon.alteredForms[i];
                        if (form.name == ctrl.pokemon.name)
                        {
                            ctrl.pokemon.currentForm = i;
                        }
                    }
                }
                if (ctrl.pokemon.currentForm === undefined)
                    ctrl.pokemon.currentForm = 0;
                ctrl.loaded = true;
            }
         });

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

    ctrl.evolveString = function(method)
    {
        var evolutionFamily = ctrl.pokemon.evolutionFamily;
        var exp = 0;
        if (evolutionFamily[2].length > 0)
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

    this.getHpBarSize = function(stat) {
        var maxWidth = 217;

        if (stat >= 714)
            return 217;
        else
            return (stat/714)*217;
    }

    this.getHpBarClass = function(stat) {
        if (stat < 325)
            return "low";
        else if (stat < 400)
            return "medium";
        else
            return "high";
    }

    this.getStatBarSize = function(stat) {
        var maxWidth = 217;

        if (stat >= 559)
            return 217;
        else
            return (stat/559)*217;
    }

    this.getStatBarClass = function(stat) {
        if (stat < 239)
            return "low";
        else if (stat < 299)
            return "medium";
        else
            return "high";
    };

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

}]);

app.directive('pokemon', function() {
    return {
        restrict: 'E',
        templateUrl: "/app/ultradex/partials/pokemon.html"
    };
});

app.directive('dexHeader', function() {
    return {
        restrict: 'E',
        templateUrl: "/app/ultradex/partials/dex-header.html"
    };
});

app.directive('buttonPrev', function() {
    return {
        restrict: 'E',
        template: "<img src='https://pokemonurpg.com/img/icons/control-prev.gif'>"
    };
});

 app.directive('buttonNext', function() {
    return {
        restrict: 'E',
        template: "<img src='https://pokemonurpg.com/img/icons/control-next.gif'>"
    };
});

app.directive('dexBody', function() {
   return {
       restrict: 'E',
       templateUrl: '/app/ultradex/partials/dex-body.html'
   };
});

app.directive('dexInfo', function() {
    return {
        restrict: 'E', 
        templateUrl: '/app/ultradex/partials/dex-info.html'
    };
});

app.directive('horizontalLine', function() {
    return {
        restrict: 'E',
        template: '<div class="horizontal-line"></div>'
    };
});

app.directive('verticalLine', function() {
    return {
        restrict: 'E', 
        template: '<div class="vertical-line"></div>'
    };
});

app.directive('pokemonSprite', function() {
   return {
       restrict: 'E',
       templateUrl: '/app/ultradex/partials/pokemon-sprite.html'
   };
});

app.directive('pokemonDexInfo', function() {
    return {
        restrict: 'E',
        templateUrl: '/app/ultradex/partials/pokemon-dex-info.html'
    }; 
});

app.directive('abilityInfo', function() {
    return {
        restrict: 'E',
        templateUrl: '/app/ultradex/partials/ability-info.html'
    };
});

app.directive('statsInfo', function() {
    return {
        restrict: 'E',
        templateUrl: '/app/ultradex/partials/stats-info.html'
    }; 
});

app.directive('formTabs', function() {
    return {
        restrict: 'E',
        templateUrl: '/app/ultradex/partials/form-tabs.html'
    }; 
});

app.directive('typeMatchups', function() {
    return {
        restrict: 'E',
        templateUrl: '/app/ultradex/partials/type-matchups.html'
    };
});

app.directive('miscInfo', function() {
    return {
        restrict: 'E',
        templateUrl: '/app/ultradex/partials/misc-info.html'
    };
});

app.directive('evolutionFamily', function() {
    return {
        restrict: 'E',
        templateUrl: '/app/ultradex/partials/evolution-family.html'
    };
});

app.directive('captureInfo', function() {
    return {
        restrict: 'E',
        templateUrl: '/app/ultradex/partials/capture-info.html'
    }; 
});

app.directive('learnset', function() {
    return {
        restrict: 'E',
        templateUrl: '/app/ultradex/partials/learnset.html'
    };
});

app.directive('megaEvolutions', function() {
    return {
        restrict: 'E',
        templateUrl: '/app/ultradex/partials/mega-evolutions.html'
    };
});

app.directive('megaTabs', function() {
    return {
        restrict: 'E', 
        templateUrl: '/app/ultradex/partials/mega-tabs.html'
    };
});

app.directive('formInfo', function() {
    return {
        restrict: 'E', 
        templateUrl: '/app/ultradex/partials/form-info.html'
    };
});

app.directive('moveHints', function() {
    return {
        restrict: 'E',
        templateUrl: '/app/ultradex/modals/move-hints.html'
    }
})