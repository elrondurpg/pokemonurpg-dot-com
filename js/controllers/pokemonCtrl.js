'use strict';

app.controller("pokemonCtrl", [ '$http', '$location', '$scope', 'sessionService', '$rootScope', '$window', function($http, $location, $scope, sessionService, $rootScope, $window) {
        var page = this;
    
        var path = $location.$$path;
        var regex = path.match(/^\/pokemon\/([^\/#]+)$/);

        page.pokemon = {};
        page.pokemon.name = regex[1];

        page.displayMove = {};
        page.moveHintsType = "battle";
    
        page.showSidebar = false;
        
        $http.get($rootScope.serviceHost + '/pokemon/' + page.pokemon.name).then(function(response) {
            if (response.status != 200) {
                $window.location.assign('/notfound.html');
            }
            else {
                page.pokemon = response.data;
                for (var i = 0; i < page.pokemon.alteredForms.length; i++)
                {
                    var form = page.pokemon.alteredForms[i];
                    if (form.name == page.pokemon.name)
                    {
                        page.pokemon.currentForm = i;
                    }
                }
                if (page.pokemon.currentForm === undefined)
                    page.pokemon.currentForm = 0;
                console.log(page.pokemon);
                page.loaded = true;
            }
        });

        this.hoverMove = function(move)
        {
            page.displayMove = move;
        };

        this.suffix = function(base, input) {
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
            return "";
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

        this.filter = function(out) {
            console.log("Trying to filter on gen " + out);
        }

        /*$http.get($rootScope.serviceHost + '/pokemon/').success(function (data) {
        	pokemon.pokemonNames = data.map(function(value) {
        	      return value.toUpperCase();
            });
            
            if (pokemon.pokemonNames.indexOf(pokemon.name.toUpperCase()) == -1)
            {
            	$window.location.assign('/notfound.html');
            }
            else {
	            $http.get($rootScope.serviceHost + '/pokemon/name/' + pokemon.name).success(function(data) {
	                console.log($rootScope.serviceHost);
	                console.log(pokemon);
	                pokemon.name = data.name;
	                pokemon.displayName = data.displayName;
	                pokemon.dex = data.dex;
	                pokemon.prevMon = data.lastMon;
	                pokemon.prevDex = data.lastDex;
	                pokemon.prevIcon = $rootScope.iconBase + pokemon.prevDex + ".png";
	                pokemon.prevUrl = "/pokemon/" + pokemon.prevMon;
	                pokemon.nextMon = data.nextMon;
	                pokemon.nextDex = data.nextDex;
	                pokemon.nextIcon = $rootScope.iconBase + pokemon.nextDex + ".png";
	                pokemon.nextUrl = "/pokemon/" + pokemon.nextMon;
	                pokemon.classification = data.classification;
	                pokemon.type1 = data.type1;
	                pokemon.type2 = data.type2;
	                pokemon.abilities = data.abilities;
	                pokemon.hp = data.hp;
	                pokemon.attack = data.attack;
	                pokemon.defense = data.defense;
	                pokemon.specialAttack = data.specialAttack;
	                pokemon.specialDefense = data.specialDefense;
	                pokemon.speed = data.speed;
	                pokemon.typeMatchups = data.typeMatchups;
	                pokemon.femaleAllowed = data.femaleAllowed;
	                pokemon.maleAllowed = data.maleAllowed;
	                pokemon.height = data.height;
	                pokemon.weight = data.weight;
	                pokemon.evolutionFamily = data.evolutionFamily;
	                pokemon.storyRank = data.storyRank;
	                pokemon.storyReq = data.storyReq;
	                pokemon.pokemart = data.pokemart;
	                pokemon.artRank = data.artRank;
	                pokemon.artReq = data.artReq;
	                pokemon.parkRank = data.parkRank;
	                pokemon.parkArea = data.parkArea;
	                pokemon.parkReq = data.parkReq;
	                pokemon.contestCredits = data.contestCredits;
	                pokemon.levelUpMoves = data.levelUpMoves;
	                pokemon.TMs = data.tms;
	                pokemon.HMs = data.hms;
	                pokemon.BMs = data.bms;
	                pokemon.MTs = data.mts;
	                pokemon.SMs = data.sms;
	                pokemon.megaEvolutions = data.megaEvolutions;
	                pokemon.sprites = [ $rootScope.modelBase + pokemon.dex + pokemon.suffix(pokemon.name, pokemon.name) + ".gif" ];
	                pokemon.megaIcons = [];
	                pokemon.megaImages = [];
	                pokemon.sodaShoppe = data.sodaShoppe;
	
	                for (var i = 0; i < pokemon.megaEvolutions.length; i++)
	                {
	                    var megaIcon = $rootScope.iconBase + pokemon.dex + pokemon.suffix(pokemon.name, pokemon.megaEvolutions[i].name) + ".png";
	                    var megaImage = $rootScope.modelBase + pokemon.dex + pokemon.suffix(pokemon.name, pokemon.megaEvolutions[i].name) + ".gif";
	                    
	                    pokemon.megaIcons.push(megaIcon);
	                    pokemon.megaImages.push(megaImage);
	                }
	                
	                for (i = 0; i < pokemon.evolutionFamily.length; i++)
	                {
	                    for (var j = 0; j < pokemon.evolutionFamily[i].length; j++)
	                    {
	                        var species = pokemon.evolutionFamily[i][j];
	                        species.icon = $rootScope.iconBase + species.dex + pokemon.suffix(species.displayName, species.name) + ".png";
	                        species.url = "/pokemon/" + species.name;
	                    }
	                }
	                
	                pokemon.alteredFormMethod = data.alteredFormMethod;
	                pokemon.alteredFormType = data.alteredFormType;
	                pokemon.alteredForms = data.alteredForms;
	                
	                if (pokemon.alteredForms !== null && pokemon.alteredForms !== undefined)
	                {
	                    pokemon.alteredFormMoves = pokemon.getAlteredFormMoveList(pokemon.alteredForms);
	                    for (i = 0; i < pokemon.alteredForms.length; i++)
	                    {
	                        var form = pokemon.alteredForms[i];
	                        if (form.name == pokemon.name)
	                        {
	                            pokemon.currentForm = i;
	                        }
	                    }
	                }
	                else
	                {
	                    pokemon.currentForm = 0;
	                    pokemon.alteredForms = [];
	                    pokemon.alteredForms.push({
	                        displayName: pokemon.displayName,
	                        name: pokemon.name
	                    });
	                }
	                
	                pokemon.loaded=true;
	                
	            }).error(function(data) {
	            });
	        }
        });
        
    
        pokemon.getAlteredFormMoveList = function(forms) {
            // Three arrays: 
            // moves = contains the NAME of each move that should be displayed. 
            // checkedMoves = contains each MOVE that we have checked so far, such that the KEY = NAME and the VALUE = METHOD
            
            var moves = [];
            var checkedMoves = {};
            
            for (var i = 0; i < forms.length; i++)
            {
                var form = forms[i];
                for (var move in form.attacks)
                {
                    var method = form.attacks[move];
                    // If this move is already in MOVES, then we needn't check it again.
                    if (moves.indexOf(move) == -1)
                    {
                        // If checkedMoves has a key for this move, compare it against the entry in that array.
                        if (checkedMoves[move] !== undefined)
                        {
                            if (checkedMoves[move] != method)
                            {
                                moves.push(move);
                                delete checkedMoves[move];
                            }
                            else if (i == forms.length - 1)
                            {
                                delete checkedMoves[move];
                            }
                        }
                        
                        // Otherwise, if this is the first FORM we're checking, add this move to checkedMoves
                        else if (i == 0)
                        {
                            checkedMoves[move] = method;
                        }
                        
                        // If this ISN'T the first form we're checking, then that means the first form was missing this move, so it should immediately go into the moves array.
                        else
                        {
                            moves.push(move);
                        }
                        
                    }
                }
            }
            
            for (var key in checkedMoves)
            {
                moves.push(key);
            }
            return moves;
        }
        
        pokemon.getDummyArray = function (score) {
            if (score != null && score != "Varies")
            {
                var intScore = parseInt(score);
                if (intScore < 0) 
                    intScore = -intScore;
                var array = new Array(intScore);
                for (var i = 0; i < intScore; i++)
                {
                    array[i] = i;                
                }
                return array;
            }
            else return null;
        }
        
        pokemon.getUsername = function()
        {
            return sessionService.username;
        }
        
        pokemon.switchMoveHintsType = function () {
            if (pokemon.moveHintsType == "battle")
            {
                pokemon.moveHintsType = "contest";
            }
            else
            { 
                pokemon.moveHintsType = "battle";
            }
        }
        
        pokemon.categoryIcon = function(category)
        {
            if (category == "Physical")
            {
                return "/img/physical.png";
            }
            if (category == "Special")
            {
                return "/img/special.png";
            }
            if (category == "Status")
            {
                return "/img/other.png";
            }
        }
        
        pokemon.prettyTarget = function(target)
        {
            if (target == "1")
            {
                return "May target any Pokemon adjacent to the user.";
            }
            if (target == "1 Enemy")
            {
                return "May target any opponent adjacent to the user.";
            }
            if (target == "1 or S")
            {
                return "May target the user or any adjacent Pokemon.";
            }
            if (target == "1 Reach")
            {
                return "May target any Pokemon.";
            }
            if (target == "2")
            {
                return "Affects all adjacent opponents.";
            }
            if (target == "3")
            {
                return "Affects all adjacent Pokemon.";
            }
            if (target == "3 Enemy")
            {
                return "Affects all opponents.";
            }
            if (target == "4")
            {
                return "Affects all Pokemon on the battlefield.";
            }
            if (target == "A")
            {
                return "May target any adjacent ally.";   
            }
            if (target == "P")
            {
                return "Affects all Pokemon on the user's team.";
            }
            if (target == "Random")
            {
                return "The attack's effects and target are random.";
            }
            if (target == "Random Enemy")
            {
                return "Targets one adjacent opponent at random.";
            }
            if (target == "S or A")
            {
                return "May target the user or any adjacent ally.";
            }
            if (target == "Self")
            {
                return "Affects the user.";
            }
        }
        
        pokemon.hoverMove = function(move)
        {
            pokemon.displayMove = move;
        };
        
        pokemon.rowspanClass = function(stage, evolutionFamily)
        {
            // {{ stage.length != pokemon.largestEvolutionStage(pokemon.evolutionFamily).length ? pokemon.largestEvolutionStageLength(pokemon.evolutionFamily) : 1}}
            
            var longestLength = pokemon.largestEvolutionStageLength(pokemon.evolutionFamily)
            
            if (stage.length != longestLength)
            {
                return "dex-evolution-chain-pokemon-rowspan" + longestLength;
            }
            else return "dex-evolution-chain-pokemon";
        };
        
        pokemon.largestEvolutionStageLength = function(evolutionFamily)
        {
            return Math.max(evolutionFamily[0].length, evolutionFamily[1].length, evolutionFamily[2].length);
        };
        
        pokemon.largestEvolutionStage = function(evolutionFamily)
        {
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
        
        pokemon.evolveString = function(method, evolutionFamily)
        {
            var exp = 0;
            if (evolutionFamily[2].length > 0)
            {
                exp = 5;
            }
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
        
        pokemon.imperialWeight = function(weight) {
            var pounds = (weight * 2.20462).toFixed(1);
            return pounds;
        }
        
        pokemon.imperialHeight = function(height) {
            var inches = Math.floor(height * 39.3701);
            var feet = Math.floor(inches / 12);
            inches = inches % 12;
            
            return "" + feet + "'" + inches + "\"";
        };
        
        pokemon.matchupClass = function(multiplier)
        {
            switch (multiplier)
            {
                case "0": return "type-box-0";
                        break;
                case "0.5": return "type-box-50";
                        break;
                case "1": return "type-box-100";
                        break;
                case "0.25": return "type-box-25";
                        break;
                case "2": return "type-box-200";
                        break;
                case "4": return "type-box-400";
                        break;
            }
        };
        
        pokemon.suffix = function(base, input) {
			if (input.toLowerCase().indexOf("ultra") != -1)
			{
				return "-ultra";
			}
			
            var exceptions = ["nidoran-f", "nidoran-m", "ho-oh", "meowstic-m", "basculin-red-striped", "unown-a", "porygon-z" ];
            
            base = base.toLowerCase();
            input = input.toLowerCase();
            
            base = base.replace("\\", "");
            input = input.replace("\\", "");
            
            if (exceptions.indexOf(input) == -1)
            {
                return input.replace(base, "");
            }
            return "";
        };
        
        pokemon.threeDigit = function(input) {
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
        
        pokemon.fraction = function(decimal) {
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
		
		pokemon.getMegaText = function() {
			if (pokemon.name.toUpperCase().indexOf("NECROZMA") == -1)
            {
                return "Mega Evolve";
            }
            return "Ultra Burst";
		}
		
		pokemon.getMegaRingText = function() {
			if (pokemon.name.toUpperCase().indexOf("NECROZMA") == -1)
            {
                return "Mega Ring + ";
            }
            return "";
		}
        
        this.grassKnot = function() {
            if (pokemon.weight < 10)
                return 20;
            else if (pokemon.weight < 25)
                return 40;
            else if (pokemon.weight < 50)
                return 60;
            else if (pokemon.weight < 100)
                return 80;
            else if (pokemon.weight < 200)
                return 100;
            else 
                return 120;
        };
        
        this.statBarHP = function(stat) {
            var maxWidth = 217;
            
            if (stat >= 714) 
                return 217;
            else
                return (stat/714)*217;
        }
        
        this.statBarClassHP = function(stat) {
            if (stat < 325) 
                return "low";
            else if (stat < 400)
                return "medium";
            else 
                return "high";
        }
        
        this.statBar = function(stat) {
            var maxWidth = 217;
            
            if (stat >= 559) 
                return 217;
            else
                return (stat/559)*217;
        }
        
        this.statBarClass = function(stat) {
            if (stat < 239) 
                return "low";
            else if (stat < 299)
                return "medium";
            else 
                return "high";
        }
        */
    }]);

    app.directive('pokemon', function() {
        return {
            restrict: 'E',
            templateUrl: "/partials/pokemon/pokemon.html"
        };
    });
    
    app.directive('dexHeader', function() {
        return {
            restrict: 'E',
            templateUrl: "/partials/pokemon/dex-header.html"
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
           templateUrl: '/partials/pokemon/dex-body.html'
       };
    });
    
    app.directive('dexInfo', function() {
        return {
            restrict: 'E', 
            templateUrl: '/partials/pokemon/dex-info.html'
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
           templateUrl: '/partials/pokemon/pokemon-sprite.html'
       };
    });
    
    app.directive('pokemonDexInfo', function() {
        return {
            restrict: 'E',
            templateUrl: '/partials/pokemon/pokemon-dex-info.html'
        }; 
    });
    
    app.directive('abilityInfo', function() {
        return {
            restrict: 'E',
            templateUrl: '/partials/pokemon/ability-info.html'
        };
    });
    
    app.directive('statsInfo', function() {
        return {
            restrict: 'E',
            templateUrl: '/partials/pokemon/stats-info.html'
        }; 
    });
    
    app.directive('formTabs', function() {
        return {
            restrict: 'E',
            templateUrl: '/partials/pokemon/form-tabs.html'
        }; 
    });
    
    app.directive('typeMatchups', function() {
        return {
            restrict: 'E',
            templateUrl: '/partials/pokemon/type-matchups.html'
        };
    });
    
    app.directive('miscInfo', function() {
        return {
            restrict: 'E',
            templateUrl: '/partials/pokemon/misc-info.html'
        };
    });
    
    app.directive('evolutionFamily', function() {
        return {
            restrict: 'E',
            templateUrl: '/partials/pokemon/evolution-family.html'
        };
    });
    
    app.directive('captureInfo', function() {
        return {
            restrict: 'E',
            templateUrl: '/partials/pokemon/capture-info.html'
        }; 
    });
    
    app.directive('learnset', function() {
        return {
            restrict: 'E',
            templateUrl: '/partials/pokemon/learnset.html'
        };
    });
    
    app.directive('megaEvolutions', function() {
        return {
            restrict: 'E',
            templateUrl: '/partials/pokemon/mega-evolutions.html'
        };
    });
    
    app.directive('megaTabs', function() {
        return {
            restrict: 'E', 
            templateUrl: '/partials/pokemon/mega-tabs.html'
        };
    });

    app.directive('formInfo', function() {
        return {
            restrict: 'E', 
            templateUrl: '/partials/pokemon/form-info.html'
        };
    });
