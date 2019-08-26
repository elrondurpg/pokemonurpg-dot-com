'use strict';

app.controller("statsCtrl", [ '$http', '$location', '$scope', 'sessionService', 'badgeService', '$window', '$rootScope', function ($http, $location, $scope, sessionService, badgeService, $window, $rootScope) {
    var stats = this;
    
    stats.displayPane = 'pokemon';
    stats.pokemonLoaded = false;
    stats.itemsLoaded = false;
    stats.pokemonSearchType = 'limit';
    stats.changePane = function(pane)
    {
        stats.displayPane = pane;
        if (pane == 'items')
        {
            if (stats.itemsLoaded == false)
                stats.loadItems();
        }
        if (pane == 'pokemon')
        {
        	if (stats.pokemonLoaded == false)
        	{
        		if (stats.pokemonSearchType == 'limit')
        		{
		            var payload = {
						index: stats.index,
						limit: stats.limit
					};
        		}
        		else if (stats.pokemonSearchType == 'species')
        		{
        			if (stats.pokemonSearchText != "" && stats.pokemonSearchText != null)
        				stats.pokemonSearchSpecies = stats.pokemonSearchText;
		    		var payload = {
		    			species: stats.pokemonSearchSpecies
		    		};
		    		stats.pokemonSearchText = "";
        		}
	            
	            stats.loadPokemon(payload);  
        	}
        }
        if (pane == 'matches')
        {
        	// TODO: Add stuff here
        }
    }
    
    var path = $location.$$path;
    var regex = path.match(/^\/stats\/(.*)$/);
    stats.name = regex[1];
    stats.changes = {};
    
    stats.showModal = {
    	money: false,
    	pokemon: false,
    	alert: false,
    	visible: false
    };
    stats.modal = {};
    stats.toggleModal = function(modal, event) {
    	if (stats.showModal[modal] && event !== undefined)
    	{
	    	var clickedElement = event.target;
	    	if (!clickedElement)
	    		return;
	    	
	    	var elementClasses = clickedElement.classList;

	    	if (elementClasses.contains('close-modal'))
	    	{
	    		stats.showModal[modal] = !stats.showModal[modal];
	        	stats.showModal.visible = !stats.showModal.visible;
	        	
	        	stats.modal[modal] = {};
	        	
	            if (event !== undefined)
	                event.stopPropagation();
	    	}	
    	}
    	else
    	{
    		if (modal == 'species')
    		{
    			stats.modal[modal] = {};
    		}
    		
    		stats.showModal[modal] = !stats.showModal[modal];
        	stats.showModal.visible = !stats.showModal.visible;
        	
        	if (stats.showModal[modal] == false)
        	{
        		stats.modal[modal] = {};
        	}
        	
            if (event !== undefined)
                event.stopPropagation();
    	}
    }
    
    stats.avatar = "";
    stats.contestCredits = 0;
    stats.discordName = "";
    stats.draws = 0;
    stats.items = [];
    stats.losses = 0;
    stats.money = 0;
    stats.occupations = [];
    stats.wins = 0;
    stats.shoppeTokens = 0;
    
    stats.index = 0;
    stats.limit = 5;
    
    stats.modal.wld = {};
    stats.loadTrainer = function () {
	    $http.get($rootScope.serviceHost + '/stats/name/' + stats.name).success(function(data) {
	        stats.name = data.name;
	        stats.changes.name = data.name;
	        stats.avatar = data.avatar;
	        stats.contestCredits = data.contestCredits;
	        stats.discordName = data.discordName;
	        stats.draws = data.draws;
	        stats.losses = data.losses;
	        stats.money = data.money;
	        stats.occupations = data.occupations;
	        stats.wins = data.wins;
	        stats.shoppeTokens = data.shoppeTokens;
	    });
	    stats.changes = {};
	    stats.changes.items = {};
    };
    stats.loadTrainer();
    stats.showCommands = true;
    
    stats.pokemon = [];
    stats.pokemonLoaded = false;
    
    stats.pokemonNames = {};
    $http.get($rootScope.serviceHost + '/pokemon/').success(function (data) {
        stats.pokemonNames = data;
    });
    
    stats.loadPokemon = function(payload) {
    	stats.pokemonLoaded = true;
        $http.post($rootScope.serviceHost + '/stats/name/' + stats.name + '/pokemon', payload).success(function(data) {
            stats.pokemon = data;
            stats.pokemon.forEach(function(element) {
                element.displayPane = 'info';
            });
        });
    };   
    
	if (stats.displayPane == 'pokemon')
	{
		/*stats.pokemonSearchType = 'species';
		stats.pokemonSearchSpecies = "Snivy";
		var payload = {
			species: stats.pokemonSearchSpecies
		};*/
		stats.pokemonSearchType = 'limit';
		var payload = {
			index: stats.index,
			limit: stats.limit
		};
		stats.loadPokemon(payload);
	}
	
	stats.pokemonSearchText = "";
	stats.updatePokemonSearchText = function(text) {
		stats.pokemonSearchText = text;
	}
	
	stats.searchPokemon = function() {
		stats.pokemonSearchType = 'species';
		var payload = {
			species: stats.pokemonSearchText
		};
		stats.loadPokemon(payload);
	}
	
	stats.backPage = function() {
		stats.pokemonSearchType = 'limit';
		if (stats.index - 5 < 0)
			stats.index = 0;
		else stats.index = stats.index - 5;
		var payload = {
			index: stats.index,
			limit: stats.limit
		};
		stats.loadPokemon(payload);
	}
	
	stats.nextPage = function () {
		stats.pokemonSearchType = 'limit';
		stats.index += 5;
		var payload = {
			index: stats.index,
			limit: stats.limit
		};
		stats.loadPokemon(payload);
	}
	
	stats.resetPage = function () {
		stats.pokemonSearchType = 'limit';
		var payload = {
			index: stats.index,
			limit: stats.limit
		};
		stats.loadPokemon(payload);
	}
	
	stats.natures = [ "Adamant", "Bashful", "Bold", "Brave", "Calm", 
	                  "Careful", "Docile", "Gentle", "Hardy", "Hasty", 
	                  "Impish", "Jolly", "Lax", "Lonely", "Mild", 
	                  "Modest", "Naive", "Naughty", "Quiet", "Quirky", 
	                  "Rash", "Relaxed", "Sassy", "Serious", "Timid" ];
	
	stats.obtainedMethods = [ "Starter", "Trade", "Pokemart", "Gift", "Auction", "Story", "Art", "National Park",
	                          "Berry Store", "Event", "Underground", "New Life", "Rental",
	                          "Prize", "Prize (Temporary Legend)", "Prize (Permanent Legend)", 
	                          "Champion Legend", "Legend Defender (Temporary)", "Legend Defender (Permanent)", 
	                          "Reffing Legend", "Grader Legend", "Curator Legend", "Story Legend", "Art Legend", 
	                          "Contest Legend", "Judge Legend", "Ranger Legend", "Chronicler Legend", "After Hours RP Legend", 
	                          "National Park RP Legend"];
	
	stats.modal.species = {};
	stats.loadSpecies = function(species) {
        $http.get($rootScope.serviceHost + '/pokemon/name/' + species).success(function(data) {
        	stats.modal.species = {};
        	
            stats.modal.species.name = data.name;
            stats.modal.species.displayName = data.displayName;
            stats.modal.species.dex = data.dex;
            stats.modal.species.type1 = data.type1;
            stats.modal.species.type2 = data.type2;
            stats.modal.species.abilities = data.abilities;
            stats.modal.species.hp = data.hp;
            stats.modal.species.attack = data.attack;
            stats.modal.species.defense = data.defense;
            stats.modal.species.specialAttack = data.specialAttack;
            stats.modal.species.specialDefense = data.specialDefense;
            stats.modal.species.speed = data.speed;
            stats.modal.species.femaleAllowed = data.femaleAllowed;
            stats.modal.species.maleAllowed = data.maleAllowed;
            if (stats.modal.species.maleAllowed == true && stats.modal.species.femaleAllowed == false)
            	stats.modal.species.gender = 'M';
            else if (stats.modal.species.maleAllowed == false && stats.modal.species.femaleAllowed == true)
            	stats.modal.species.gender = 'F';
            else if (stats.modal.species.maleAllowed == false && stats.modal.species.femaleAllowed == false)
            	stats.modal.species.gender = 'G';
            else
            	stats.modal.species.gender = 'M';

            stats.modal.species.levelUpMoves = data.levelUpMoves;
            stats.modal.species.TMs = [];
            
            for (var i = 0; i < data.tms.length; i++)
            {
            	var gen = data.tms[i];
            	for (var j = 0; j < gen.length; j++)
            	{
            		var move = gen[j];

            		if (stats.modal.species.TMs.length == 0)
            		{
            			stats.modal.species.TMs.push(move);
            		}
            		else 
            		{
	            		for (var k = 0; k <= stats.modal.species.TMs.length; k++)
	            		{
	            			var nextMove = stats.modal.species.TMs[k];
	            			if (k >= stats.modal.species.TMs.length)
	            			{
	            				stats.modal.species.TMs.push(move);
	            				break;
	            			}
	            			else if (move.name < nextMove.name)
	            			{
	            				stats.modal.species.TMs.splice(k, 0, move);
	            				break;
	            			}
	            		}
            		}
            	}
            }
            
            stats.modal.species.exp = 0;
            
            stats.modal.species.HMs = data.hms;
            stats.modal.species.BMs = data.bms;
            stats.modal.species.MTs = data.mts;
            stats.modal.species.SMs = data.sms;
            
            stats.modal.species.owned = {};
            stats.modal.species.owned.TMs = [];
            stats.modal.species.owned.HMs = [];
            stats.modal.species.owned.BMs = [];
            stats.modal.species.owned.MTs = [];
            stats.modal.species.owned.SMs = [];
        }).error(function(data) {
        });
    };
    
    stats.loadOwnedPokemon = function (pokemon) {
    	stats.modal.species = {};
    	
    	$http.get($rootScope.serviceHost + '/pokemon/name/' + pokemon.name).success(function(data) {
        	stats.modal.species = {};
        	
            stats.modal.species.name = data.name;
            stats.modal.species.displayName = data.displayName;
            stats.modal.species.dex = data.dex;
            stats.modal.species.type1 = data.type1;
            stats.modal.species.type2 = data.type2;
            stats.modal.species.abilities = data.abilities;
            stats.modal.species.hp = data.hp;
            stats.modal.species.attack = data.attack;
            stats.modal.species.defense = data.defense;
            stats.modal.species.specialAttack = data.specialAttack;
            stats.modal.species.specialDefense = data.specialDefense;
            stats.modal.species.speed = data.speed;
            stats.modal.species.femaleAllowed = data.femaleAllowed;
            stats.modal.species.maleAllowed = data.maleAllowed;
            if (stats.modal.species.maleAllowed == true && stats.modal.species.femaleAllowed == false)
            	stats.modal.species.gender = 'M';
            else if (stats.modal.species.maleAllowed == false && stats.modal.species.femaleAllowed == true)
            	stats.modal.species.gender = 'F';
            else if (stats.modal.species.maleAllowed == false && stats.modal.species.femaleAllowed == false)
            	stats.modal.species.gender = 'G';
            else
            	stats.modal.species.gender = 'M';

            stats.modal.species.levelUpMoves = data.levelUpMoves;
            stats.modal.species.TMs = [];
            
            for (var i = 0; i < data.tms.length; i++)
            {
            	var gen = data.tms[i];
            	for (var j = 0; j < gen.length; j++)
            	{
            		var move = gen[j];

            		if (stats.modal.species.TMs.length == 0)
            		{
            			stats.modal.species.TMs.push(move);
            		}
            		else 
            		{
	            		for (var k = 0; k <= stats.modal.species.TMs.length; k++)
	            		{
	            			var nextMove = stats.modal.species.TMs[k];
	            			if (k >= stats.modal.species.TMs.length)
	            			{
	            				stats.modal.species.TMs.push(move);
	            				break;
	            			}
	            			else if (move.name < nextMove.name)
	            			{
	            				stats.modal.species.TMs.splice(k, 0, move);
	            				break;
	            			}
	            		}
            		}
            	}
            }
                   
            stats.modal.species.HMs = data.hms;
            stats.modal.species.BMs = data.bms;
            stats.modal.species.MTs = data.mts;
            stats.modal.species.SMs = data.sms;
            
            stats.modal.species.owned = {};
            stats.modal.species.owned.TMs = [];
            stats.modal.species.owned.HMs = [];
            stats.modal.species.owned.BMs = [];
            stats.modal.species.owned.MTs = [];
            stats.modal.species.owned.SMs = [];
            
            stats.modal.species.nickname = pokemon.nickname;
        	
        	if (pokemon.exp !== undefined)
        	{
        		stats.modal.species.exp = parseInt(pokemon.exp);
        	}
        	else
        		stats.modal.species.exp = 0;
        	
        	if (pokemon.nature !== undefined)
        	{
        		stats.modal.species.nature = pokemon.nature;
        	}
        	
        	stats.modal.species.dbid = pokemon.dbid;
        	stats.modal.species.gender = pokemon.gender;
        	stats.modal.species.obtained = pokemon.obtained;
        	
        	// Mark any owned abilities as obtained.
        	for (var i = 0; i < stats.modal.species.abilities.length; i++)
        	{
        		var ability = stats.modal.species.abilities[i];
        		if (ability.hidden == true)
        		{
	        		for (var j = 0; j < pokemon.abilities.length; j++)
	        		{
	        			if (pokemon.abilities[j].name == ability.name)
	        			{
	        				ability.obtained = true;
	        			}
	        		}
        		}
        	}
        	
        	// Add any owned extra moves to the 'owned' arrays.
        	var moveTypes = [ "TMs", "HMs", "BMs", "MTs", "SMs" ];
        	for (var i = 0; i < moveTypes.length; i++)
        	{
        		var type = moveTypes[i];
        		var tempType = type.toLowerCase();
        		if (tempType == "tms")
        			tempType = "sortedTMs";
    			for (var j = 0; j < pokemon[tempType].length; j++)
    			{
    				var move = pokemon[tempType][j];
    				stats.addMove(move, stats.modal.species.owned[type], type);
    			}
        	}
        	
        	stats.modal.species.evolutions = pokemon.evolutionFamily[0];
        }).error(function(data) {
        });
    }
	
    stats.addMove = function(move, list, type) {  	
    	// If the list is empty, push the first row onto the array
    	if (list.length == 0)
    	{
    		list.push([]);
    	}
    	
    	// if there are more than four moves in the current row, push an extra row onto the array
    	else if (list[list.length - 1].length >= 4)
    	{
    		list.push([]);
    	}
    	
    	// Verify that this is a legal move for this type.
    	var legalMoves = stats.modal.species[type];
    	var found = false;
    	for (var i = 0; i < legalMoves.length; i++)
    	{
    		if (legalMoves[i].name == move.name)
    		{
    			found = true;
    		}
    	}
    	if (!found)
    	{
    		return false;
    	}
    	
    	// find whether the move is already in the current list.
    	found = false;
    	for (var i = 0; i < list.length; i++)
    	{
    		for (var j = 0; j < list[i].length; j++)
    		{
    			if (move.name == list[i][j])
    			{
    				found = true;
    			}
    		}
    	}
    	
    	// If the move is not already in the list, add it.
    	if (!found)
    	{
    		list[list.length - 1].push(move.name);
    		return true;
    	}
    	else
    	{
    		return false;
    	}
    };
    
    stats.bulkType = "";
    stats.addMoves = function(moves) {
    	var type = stats.bulkType;
    	moves = moves.split(",");
    	var failedMoves = "Failed to add the following moves: ";
    	var numFailedMoves = 0;
    	for (var i = 0; i < moves.length; i++)
    	{
    		var move = moves[i].trim();
    		var success = stats.addMove({ name: move }, stats.modal.species.owned[type], type);
    		if (!success)
    		{
    			failedMoves += move + ", ";
    			numFailedMoves++;
    		}
    	}
    	if (numFailedMoves > 0)
    	{
    		stats.modal.alert = {};
    		stats.modal.alert.header = "Bulk Import - Warnings";
    		stats.modal.alert.message = failedMoves;
			stats.toggleModal('alert');
    	}
    }
    
	stats.suffix = function(base, input) {
		var exceptions = ["nidoran-f", "nidoran-m", "ho-oh", "meowstic-m", "basculin-red-striped", "unown-a", "porygon-z" ];
		
		if (base === undefined) 
			return "";
		
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

    stats.items = {};
    stats.itemTypes = [];
    stats.items.left = [];
    stats.items.right = [];
    stats.left = 0;
    stats.right = 0;
    
    stats.config = {};
    stats.config.items = [];
    stats.itemNames = [];
    $scope.itemSelector = "";
    
    stats.changes.items = {};
    $http.get($rootScope.serviceHost + '/items/').success(function(data) {
    	for (var i = 0; i < data.length; i++)
    	{
    		var item = data[i];
    		stats.itemNames.push(item.name);
    		stats.config.items.push(item);
    	}
    });
    stats.loadItems = function() {
        stats.itemsLoaded = true;
        stats.items = {};
        stats.items.left = [];
        stats.items.right = [];
        stats.left = 0;
        stats.right = 0;
        $http.get($rootScope.serviceHost + '/stats/name/' + stats.name + '/items').success(function(data) {
            for (var i = 0; i < data.length; i++)
            {
                var item = data[i];
                if (item.quantity > 0)
                {
	                stats.items[item.name] = {
	                		quantity: item.quantity,
	                		originalQuantity: item.quantity
	                };
	                item.originalQuantity = item.quantity;
	                var type = item.type;
	                if (stats.itemTypes.indexOf(type) == -1)
	                    stats.itemTypes.push(type);
	                if (stats.items[type] === undefined)
	                {
	                    stats.items[type] = [];
	                }
	                stats.items[type].push(item);
                }
            }
            
            for (var i = 0; i < stats.itemTypes.length; i++)
            {
                var type = stats.itemTypes[i];
                if (stats.items[type] !== undefined)
                {
	                var size = stats.items[type].length;
	                
	                if (stats.left <= stats.right)
	                {
	                    stats.items.left.push(type);
	                    stats.left += size*42 + 52 + 20;
	                }
	                else 
	                {
	                    stats.items.right.push(type);
	                    stats.right += size*42 + 52 + 20;
	                }
                }
            }
        });
        stats.changes.items = {};
    }
    if (stats.displayPane == 'items')
    {
        stats.loadItems();
    }
    stats.itemImages = {
        Berry: "berry",
        Held: "held",
        Mega: "mega",
        ZCrystal: "zcrystal",
        Evolution: "evolution",
        Contest: "contest",
        TM: "tm",
        HM: "hm",
        Special: "special-item",
        Fossil: "fossil",
        Mail: "mail",
        Other: "other-item"
    };
    stats.itemTitles = {
        Berry: "Berries",
        Held: "Held Items",
        Mega: "Mega Stones",
        ZCrystal: "Z-Crystals",
        Evolution: "Evolution Items",
        Contest: "Contest Items",
        TM: "Technical Machines",
        HM: "Hidden Machines",
        Special: "Special Items",
        Fossil: "Fossils",
        Mail: "Mail",
        Other: "Other Items"
    };
    
    stats.update = function(key, value)
    {
    	if (stats.validate(key, value))
    		stats.changes[key] = value;
    }
    
    stats.updateItem = function(name, quantity)
    {
    	quantity = parseInt(quantity);
    	if (quantity < 0)
			quantity = 0;
    	if (name != "" && name !== undefined && name != " ")
    	{
    		if (stats.validate('itemQuantity', quantity))
    		{
    			if (stats.items[name] !== undefined)
    				stats.items[name].quantity = quantity;
    			
				stats.changes.items[name] = quantity;
				for (var i = 0; i < stats.itemTypes.length; i++)
				{
					var type = stats.itemTypes[i];
					if (stats.items[type] !== undefined)
					{
						for (var j = 0; j < stats.items[type].length; j++)
						{
							var item = stats.items[type][j];
							if (item.name == name)
							{
								item.quantity = quantity;
							}
						}
					}
				}
    		}
    	}
    }
    
    stats.validate = function(key, value)
    {
    	if (key == 'money' || key == 'contestCredits' || key == 'shoppeTokens' || key == 'itemQuantity')
    	{
    		if (stats.isNumber(value) && value >= 0)
    		{
    			return true;
    		}
    		else
    		{
    			return false;
    		}
    	}
    	else return false;
    }
    
    stats.save = function() {
        var payload = {
            "username": sessionService.username,
            "loginString": sessionService.loginString,
            "browser": $window.navigator.userAgent,
            "id": sessionService.id, 
            "stats": stats.changes
        };
        $http.post($rootScope.serviceHost + '/stats/name/' + stats.name + '/update', payload).then(function(data) {
            stats.loadTrainer();
            stats.pokemonLoaded = false;
            stats.itemsLoaded = false;
            stats.changePane(stats.displayPane);
        });
    }
    
    stats.createPokemon = function() {
    	var payload = {
			"username": sessionService.username,
            "loginString": sessionService.loginString,
            "browser": $window.navigator.userAgent,
            "id": sessionService.id, 
            "pokemon": stats.modal.species
    	};
        $http.post($rootScope.serviceHost + '/stats/name/' + stats.name + '/pokemon/create', payload).then(function(msg) {
        	var data = msg.data;
        	if (data.responseCode == "200")
        	{
        		stats.pokemonSearchType = 'species';
        		stats.pokemonSearchText = "";
        		stats.toggleModal('species');
        		stats.toggleModal('alert');
        		stats.modal.alert = {};
        		stats.modal.alert.header = "Add Pokemon - Success!";
        		stats.modal.alert.message = data.messsage;
        		
        		stats.loadTrainer();
                stats.pokemonLoaded = false;
                stats.itemsLoaded = false;
                stats.changePane(stats.displayPane);
        	}
        	else
        	{
        		stats.toggleModal('alert');
        		stats.modal.alert = {};
        		stats.modal.alert.header = "Add Pokemon - Failed";
        		stats.modal.alert.message = data.message;
        	}
        });
    	
    }
    
    stats.updatePokemon = function() {
    	var payload = {
			"username": sessionService.username,
            "loginString": sessionService.loginString,
            "browser": $window.navigator.userAgent,
            "id": sessionService.id, 
            "pokemon": stats.modal.species
    	};
        $http.post($rootScope.serviceHost + '/stats/name/' + stats.name + '/pokemon/update', payload).then(function(msg) {
        	var data = msg.data;
        	if (data.responseCode == "200")
        	{
        		stats.toggleModal('edit');
        		stats.toggleModal('alert');
        		stats.modal.alert = {};
        		stats.modal.alert.header = "Edit Pokemon - Success!";
        		stats.modal.alert.message = data.messsage;
        		
        		stats.loadTrainer();
                stats.pokemonLoaded = false;
                stats.itemsLoaded = false;
                stats.changePane(stats.displayPane);
        	}
        	else
        	{
        		stats.toggleModal('alert');
        		stats.modal.alert = {};
        		stats.modal.alert.header = "Edit Pokemon - Failed";
        		stats.modal.alert.message = data.message;
        	}
        });
    	
    }
    
    stats.updateMatches = function() {
    	
    	var payload = {
			"username": sessionService.username,
            "loginString": sessionService.loginString,
            "browser": $window.navigator.userAgent,
            "id": sessionService.id
    	};
    	    	
    	var valid = true;
    	if (stats.modal.wld.wins !== undefined)
    	{
    		if (stats.isNumber(stats.modal.wld.wins) && stats.modal.wld.wins >= 0)
    		{
    			payload.wins = stats.modal.wld.wins;
    		}
    		else
    		{
    			valid = false;
    		}
    	}
    	
    	if (stats.modal.wld.losses !== undefined)
    	{
    		if (stats.isNumber(stats.modal.wld.losses) && stats.modal.wld.losses >= 0)
    		{
    			payload.losses = stats.modal.wld.losses;
    		}
    		else
    		{
    			valid = false;
    		}
    	}
    	
    	if (stats.modal.wld.draws !== undefined)
    	{
    		if (stats.isNumber(stats.modal.wld.draws) && stats.modal.wld.draws >= 0)
    		{
    			payload.wins = stats.modal.wld.draws;
    		}
    		else
    		{
    			valid = false;
    		}
    	}
    	
    	if (valid)
    	{
    		$http.post($rootScope.serviceHost + '/stats/name/' + stats.name + '/wld', payload).then(function(msg) {
            	var data = msg.data;
            	if (data.responseCode == "200")
            	{
            		stats.toggleModal('wld');
            		stats.toggleModal('alert');
            		stats.modal.alert = {};
            		stats.modal.alert.header = "Edit Battle Record - Success!";
            		stats.modal.alert.message = data.messsage;
            		
            		stats.loadTrainer();
                    stats.pokemonLoaded = false;
                    stats.itemsLoaded = false;
                    stats.changePane(stats.displayPane);
            	}
            	else
            	{
            		stats.toggleModal('alert');
            		stats.modal.alert = {};
            		stats.modal.alert.header = "Update Battle Record - Error";
            		stats.modal.alert.message = data.message;
            	}
            });
    	}
    	else
    	{
    		stats.toggleModal('alert');
    		stats.modal.alert = {};
    		stats.modal.alert.header = "Update Battle Record - Error";
    		stats.modal.alert.message = "You've entered an invalid value for wins, losses, or draws. Please check your values and resubmit.";
    	}    	
    }
    
    stats.prepareEvolution = function (evolution, $event)
    {
    	if (stats.modal.evolve == null)
    	{
    		stats.modal.evolve = {};
    	}
    	stats.modal.evolve.evolution = evolution;
    	stats.toggleModal('evolve', $event);
    }
    
    stats.evolvePokemon = function() {
    	var payload = {
			"username": sessionService.username,
            "loginString": sessionService.loginString,
            "browser": $window.navigator.userAgent,
            "id": sessionService.id, 
            "pokemon": stats.modal.species,
            "evolution": stats.modal.evolve.evolution.name
    	};
        $http.post($rootScope.serviceHost + '/stats/name/' + stats.name + '/pokemon/evolve', payload).then(function(msg) {
        	var data = msg.data;
        	if (data.responseCode == "200")
        	{
        		stats.pokemonSearchSpecies = stats.modal.evolve.evolution.name;
        		stats.pokemonSearchType = 'species';
        		stats.pokemonSearchText = "";
        		stats.toggleModal('evolve');
        		stats.toggleModal('edit');
        		stats.toggleModal('alert');
        		stats.modal.alert = {};
        		stats.modal.alert.header = "Evolve Pokemon - Success!";
        		stats.modal.alert.message = data.messsage;

        		stats.loadTrainer();
                stats.pokemonLoaded = false;
                stats.itemsLoaded = false;
                stats.changePane(stats.displayPane);
        	}
        	else
        	{
        		stats.toggleModal('alert');
        		stats.modal.alert = {};
        		stats.modal.alert.header = "Evolve Pokemon - Failed";
        		stats.modal.alert.message = data.message;
        	}
        });
    	
    }
    
    stats.deletePokemon = function() {
    	var payload = {
			"username": sessionService.username,
            "loginString": sessionService.loginString,
            "browser": $window.navigator.userAgent,
            "id": sessionService.id, 
            "pokemon": stats.modal.species,
    	};
        $http.post($rootScope.serviceHost + '/stats/name/' + stats.name + '/pokemon/delete', payload).then(function(msg) {
        	var data = msg.data;
        	if (data.responseCode == "200")
        	{
       			stats.pokemonSearchSpecies = stats.modal.species;
        		stats.toggleModal('delete');
        		stats.toggleModal('edit');
        		stats.toggleModal('alert');
        		stats.modal.alert = {};
        		stats.modal.alert.header = "Delete Pokemon - Success!";
        		stats.modal.alert.message = data.messsage;

        		stats.loadTrainer();
                stats.pokemonLoaded = false;
                stats.itemsLoaded = false;
                stats.changePane(stats.displayPane);
        	}
        	else
        	{
        		stats.toggleModal('alert');
        		stats.modal.alert = {};
        		stats.modal.alert.header = "Delete Pokemon - Failed";
        		stats.modal.alert.message = data.message;
        	}
        });
    	
    }
    
    stats.out = function (s) {
    }
    
    stats.isNumber = function(value) {
    	var numerals = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
    	if (value.length < 1 || value === undefined)
    		return false;
        for (var i = 0; i < value.length; i++)
        {  
            if (numerals.indexOf(value[i]) == -1)
            {
                return false;
            }
        }
        return true;
    }
    
    /*stats.badges = data.badges;

    stats.itemTypes = [];
    stats.itemsByType = {};
    for (var i = 0; i < stats.items.length; i++)
    {
        var item = stats.items[i];
        if (stats.itemTypes.indexOf(item.type) == -1)
        {
            stats.itemTypes.push(item.type);
        }
        if (stats.itemsByType[item.type] === undefined)
        {
            stats.itemsByType[item.type] = [];
        }
        stats.itemsByType[item.type].push(item);
    }
    
    stats.badgeNames = badgeService.getAllBadgeNames();
    stats.allBadges = badgeService.getAll();
    
    stats.regions = [ "Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Orange Islands" ];
    
    stats.hasBadge = function(badge) {
        if (stats.badges === undefined) 
            return false;
        if (stats.badges.indexOf(badge) != -1)
            return true;
        else return false;
    };*/

}]);

app.directive('statsHeader', function() {
    return {
        restrict: 'E',
        templateUrl: "/partials/stats/stats-header.html"
    };
});

app.directive('statsNews', function() {
    return {
        restrict: 'E',
        templateUrl: "/partials/stats/stats-news.html"
    };
});

app.directive('statsPokemon', function() {
    return {
        restrict: 'E',
        templateUrl: "/partials/stats/stats-pokemon.html"
    };
});

app.directive('statsItems', function() {
    return {
        restrict: 'E',
        templateUrl: "/partials/stats/stats-items.html"
    };
});

app.directive('statsMatches', function() {
    return {
        restrict: 'E',
        templateUrl: "/partials/stats/stats-matches.html"
    };
});

app.directive('statsAchievements', function() {
    return {
        restrict: 'E',
        templateUrl: "/partials/stats/stats-achievements.html"
    };
});

app.directive('statsAbout', function() {
    return {
        restrict: 'E',
        templateUrl: "/partials/stats/stats-about.html"
    };
});

app.directive('pokemonInfo', function() {
	return {
		restrict: 'E',
		templateUrl: "/partials/stats/pokemon-info.html"
	}
});

app.directive('pokemonBattle', function() {
	return {
		restrict: 'E',
		templateUrl: "/partials/stats/pokemon-battle.html"
	}
});

app.directive('pokemonContest', function() {
	return {
		restrict: 'E',
		templateUrl: "/partials/stats/pokemon-contest.html"
	}
});

app.directive('pokemonWishlist', function() {
	return {
		restrict: 'E',
		templateUrl: "/partials/stats/pokemon-wishlist.html"
	}
});
