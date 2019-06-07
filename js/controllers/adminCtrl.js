'use strict';

app.controller("adminCtrl", [ '$http', '$location', '$scope', 'sessionService', '$window', '$rootScope', function ($http, $location, $scope, sessionService, $window, $rootScope) {
    var admin = this;
        
    admin.prototype = {};
    admin.instance = {};
    admin.instance.TMs = [];
    admin.changes = {};
    admin.changes.deleted = {};
    
    admin.showSidebar = false;
    admin.showAbilities = false;
    admin.showEvolutions = false;
    admin.showMegaEvolutions = false;
    admin.showAttacks = true;
    admin.showBulk = false;
    
    admin.toggleModal = function(event) {
        admin.showBulk = !admin.showBulk;
        
        if (event !== undefined)
            event.stopPropagation();
        if (admin.showBulk)
        {
            $window.onclick = function(event) {
                var clickedElement = event.target;

                if (!clickedElement) 
                    return;

                var elementClasses = clickedElement.classList;

                if (!elementClasses.contains('static'))
                {
                    admin.toggleModal();
                    $scope.$apply();
                }
            }
        }
        else
        {
            $window.onclick = null;
        }
    }
    
    admin.getUsername = function () {
        return sessionService.username;
    };
    
    admin.pokemonNames = {};
    
    $http.get($rootScope.serviceHost + ':8443/pokemon/').success(function (data) {
        admin.pokemonNames = data;
    });
    
    admin.abilityNames = {};
    
    $http.get($rootScope.serviceHost + ':8443/ability/').success(function (data) {
        admin.abilityNames = data;
    });
    
    admin.loadAbility = function (ability, name) {
        $http.get($rootScope.serviceHost + ':8443/ability/name/' + name).success(function (data) {
            ability.new = true;
            ability.name = name;
            ability.description = data.description;

            if (admin.changes.abilities === undefined)
            {
                admin.changes.abilities = [];
            }
            if (admin.changes.abilities.indexOf(ability) == -1)
                admin.changes.abilities.push(ability);
        });
    };
    
    admin.updateAbilityHidden = function(ability, abilityHidden) {
        ability.hidden = abilityHidden;
    };
    
    admin.attackNames = {};
    $http.get($rootScope.serviceHost + ':8443/attack/').success(function(data) {
        admin.attackNames = data; 
    });
    
    admin.tempLevel = "";
    admin.tempTM = "";
    admin.tempTMGen = "";
    admin.tempHM = "";
    admin.tempBM = "";
    admin.tempMT = "";
    admin.tempSM = "";
    admin.loadAttack = function(type)
    {
        if (type == 'level')
        {
            var move = admin.tempLevel;

            if (admin.moveCheck(move))
            {
                return false;
            }

            var newAttack = { 
                "name": move
            };

            if (admin.instance.levelUpMoves === undefined)
            {
                admin.instance.levelUpMoves = [];
            }
            admin.instance.levelUpMoves.push(newAttack);

            if (admin.changes.deleted.levelUpMoves !== undefined && admin.changes.deleted.levelUpMoves.indexOf(move) != -1)
            {
                var index = admin.changes.deleted.levelUpMoves.indexOf(move);
                admin.changes.deleted.levelUpMoves.splice(index, 1);
            }
            else
            {
                if (admin.changes.levelUpMoves === undefined)
                    admin.changes.levelUpMoves = [];
                admin.changes.levelUpMoves.push(newAttack.name);
            }
        }
        if (type == 'tm')
        {
            var move = admin.tempTM;
            var gen = admin.tempTMGen;

            if (admin.moveCheck(move))
                return false;
				
			if (gen < 1 || gen > 7) 
            {
                admin.tmGenValid = false;
                return;
            }

            var newAttack = { 
                "name": move
            };

			if (admin.instance.TMs === undefined)
			{
				admin.instance.TMs = [];
			}
            if (admin.instance.TMs[gen] === undefined)
            {
                admin.instance.TMs[gen] = [];
            }
            admin.instance.TMs[gen].push(newAttack);

            if (admin.changes.deleted.TMs !== undefined && admin.changes.deleted.TMs[gen] !== undefined && admin.changes.deleted.TMs[gen].indexOf(move) != -1)
            {
                var index = admin.changes.deleted.TMs[gen].indexOf(move);
                admin.changes.deleted.TMs[gen].splice(index, 1);
            }
            else
            {
				if (admin.changes.TMs === undefined)
					admin.changes.TMs = [];
                if (admin.changes.TMs[gen] === undefined)
                    admin.changes.TMs[gen] = [];
                admin.changes.TMs[gen].push(newAttack.name);
            }
        }
        if (type == 'bm')
        {
            var move = admin.tempBM;

            if (admin.moveCheck(move))
                return false;

            var newAttack = { 
                "name": move
            };

            if (admin.instance.BMs === undefined)
            {
                admin.instance.BMs = [];
            }
            admin.instance.BMs.push(newAttack);

            if (admin.changes.deleted.BMs !== undefined && admin.changes.deleted.BMs.indexOf(move) != -1)
            {
                var index = admin.changes.deleted.BMs.indexOf(move);
                admin.changes.deleted.BMs.splice(index, 1);
            }
            else
            {
                if (admin.changes.BMs === undefined)
                    admin.changes.BMs = [];
                admin.changes.BMs.push(newAttack.name);
            }
        }
        if (type == 'hm')
        {
            var move = admin.tempHM;

            if (admin.moveCheck(move))
                return false;

            var newAttack = { 
                "name": move
            };

            if (admin.instance.HMs === undefined)
            {
                admin.instance.HMs = [];
            }
            admin.instance.HMs.push(newAttack);

            if (admin.changes.deleted.HMs !== undefined && admin.changes.deleted.HMs.indexOf(move) != -1)
            {
                var index = admin.changes.deleted.HMs.indexOf(move);
                admin.changes.deleted.HMs.splice(index, 1);
            }
            else
            {
                if (admin.changes.HMs === undefined)
                    admin.changes.HMs = [];
                admin.changes.HMs.push(newAttack.name);
            }
        }
        if (type == 'mt')
        {
            var move = admin.tempMT;

            if (admin.moveCheck(move))
                return false;

            var newAttack = { 
                "name": move
            };

            if (admin.instance.MTs === undefined)
            {
                admin.instance.MTs = [];
            }
            admin.instance.MTs.push(newAttack);

            if (admin.changes.deleted.MTs !== undefined && admin.changes.deleted.MTs.indexOf(move) != -1)
            {
                var index = admin.changes.deleted.MTs.indexOf(move);
                admin.changes.deleted.MTs.splice(index, 1);
            }
            else
            {
                if (admin.changes.MTs === undefined)
                    admin.changes.MTs = [];
                admin.changes.MTs.push(newAttack.name);
            }
        }
        if (type == 'sm')
        {
            var move = admin.tempSM;

            if (admin.moveCheck(move))
                return false;

            var newAttack = { 
                "name": move
            };

            if (admin.instance.SMs === undefined)
            {
                admin.instance.SMs = [];
            }
            admin.instance.SMs.push(newAttack);

            if (admin.changes.deleted.SMs !== undefined && admin.changes.deleted.SMs.indexOf(move) != -1)
            {
                var index = admin.changes.deleted.SMs.indexOf(move);
                admin.changes.deleted.SMs.splice(index, 1);
            }
            else
            {
                if (admin.changes.SMs === undefined)
                    admin.changes.SMs = [];
                admin.changes.SMs.push(newAttack.name);
            }
        }
        
        return true;
    };
    
    admin.removeAttack = function(type, index, gen)
    {
        if (type == 'level')
        {
            var move = admin.instance.levelUpMoves[index];
            
            if (admin.changes.deleted.levelUpMoves === undefined)
            {
                admin.changes.deleted.levelUpMoves = [];
            }
            
            var found = false;
            
            if (admin.changes.levelUpMoves !== undefined)
            {
                for (var i = 0; i < admin.changes.levelUpMoves.length; i++)
                {
                    if (admin.changes.levelUpMoves[i] == move.name)
                    {
                        found = true;
                    }
                }
            }
            
            if (found)
            {
                var newIndex = index - admin.instance.levelUpMoves.length + 1; 
                admin.changes.levelUpMoves.splice(newIndex, 1);
            }
            else 
            {
                admin.changes.deleted.levelUpMoves.push(move.name);
            }
            
            admin.instance.levelUpMoves.splice(index, 1);
        }
        if (type == 'tm')
        {
            var move = admin.instance.TMs[gen][index];
            
			if (admin.changes.deleted.TMs === undefined)
			{
				admin.changes.deleted.TMs = [];
			}
			
            if (admin.changes.deleted.TMs[gen] === undefined)
            {
                admin.changes.deleted.TMs[gen] = [];
            }
            
            var found = false;
            
            if (admin.changes.TMs !== undefined && admin.changes.TMs[gen] !== undefined)
            {
                for (var i = 0; i < admin.changes.TMs[gen].length; i++)
                {
                    if (admin.changes.TMs[gen][i] == move.name)
                    {
                        found = true;
                    }
                }
            }
            
            if (found)
            {
                var newIndex = index - admin.instance.TMs[gen].length + 1; 
                admin.changes.TMs[gen].splice(newIndex, 1);
            }
            else 
            {
                admin.changes.deleted.TMs[gen].push(move.name);
            }
            
            admin.instance.TMs[gen].splice(index, 1);
        }
        if (type == 'bm')
        {
            var move = admin.instance.BMs[index];
            
            if (admin.changes.deleted.BMs === undefined)
            {
                admin.changes.deleted.BMs = [];
            }
            
            var found = false;
            
            if (admin.changes.BMs !== undefined)
            {
                for (var i = 0; i < admin.changes.BMs.length; i++)
                {
                    if (admin.changes.BMs[i] == move.name)
                    {
                        found = true;
                    }
                }
            }
            
            if (found)
            {
                var newIndex = index - admin.instance.BMs.length + 1; 
                admin.changes.BMs.splice(newIndex, 1);
            }
            else 
            {
                admin.changes.deleted.BMs.push(move.name);
            }
            
            admin.instance.BMs.splice(index, 1);
        }
        if (type == 'hm')
        {
            var move = admin.instance.HMs[index];
            
            if (admin.changes.deleted.HMs === undefined)
            {
                admin.changes.deleted.HMs = [];
            }
            
            var found = false;
            
            if (admin.changes.HMs !== undefined)
            {
                for (var i = 0; i < admin.changes.HMs.length; i++)
                {
                    if (admin.changes.HMs[i] == move.name)
                    {
                        found = true;
                    }
                }
            }
            
            if (found)
            {
                var newIndex = index - admin.instance.HMs.length + 1; 
                admin.changes.HMs.splice(newIndex, 1);
            }
            else 
            {
                admin.changes.deleted.HMs.push(move.name);
            }
            
            admin.instance.HMs.splice(index, 1);
        }
        if (type == 'mt')
        {
            var move = admin.instance.MTs[index];
            
            if (admin.changes.deleted.MTs === undefined)
            {
                admin.changes.deleted.MTs = [];
            }
            
            var found = false;
            
            if (admin.changes.MTs !== undefined)
            {
                for (var i = 0; i < admin.changes.MTs.length; i++)
                {
                    if (admin.changes.MTs[i] == move.name)
                    {
                        found = true;
                    }
                }
            }
            
            if (found)
            {
                var newIndex = index - admin.instance.MTs.length + 1; 
                admin.changes.MTs.splice(newIndex, 1);
            }
            else 
            {
                admin.changes.deleted.MTs.push(move.name);
            }
            
            admin.instance.MTs.splice(index, 1);
        }
        if (type == 'sm')
        {
            var move = admin.instance.SMs[index];
            
            if (admin.changes.deleted.SMs === undefined)
            {
                admin.changes.deleted.SMs = [];
            }
            
            var found = false;
            
            if (admin.changes.SMs !== undefined)
            {
                for (var i = 0; i < admin.changes.SMs.length; i++)
                {
                    if (admin.changes.SMs[i] == move.name)
                    {
                        found = true;
                    }
                }
            }
            
            if (found)
            {
                var newIndex = index - admin.instance.SMs.length + 1; 
                admin.changes.SMs.splice(newIndex, 1);
            }
            else 
            {
                admin.changes.deleted.SMs.push(move.name);
            }
            
            admin.instance.SMs.splice(index, 1);
        }
    };
    
    admin.moveCheck = function(name)
    {
        if(admin.attackNames.indexOf(name) == -1)
        {
            return true;
        }
        for (var move in admin.instance.levelUpMoves)
        {
            if (admin.instance.levelUpMoves[move].name == name)
                return true;
        }
        for (var i in admin.instance.TMs)
        {
            var gen = admin.instance.TMs[i];
            for (var move in gen)
            {
                if (gen[move].name == name)
                {
                    return true;
                }
            }
        }
        for (var move in admin.instance.HMs)
        {
            if (admin.instance.HMs[move].name == name)
                return true;
        }
        for (var move in admin.instance.BMs)
        {
            if (admin.instance.BMs[move].name == name)
                return true;
        }
        for (var move in admin.instance.MTs)
        {
            if (admin.instance.MTs[move].name == name)
                return true;
        }
        for (var move in admin.instance.SMs)
        {
            if (admin.instance.SMs[move].name == name)
                return true;
        }
        return false;
    };
    
    admin.attackList = [];
    admin.updateAttackList = function(attackList) 
    {
        admin.attackList = attackList.split(",");
    };
    
    admin.saveImport = function()
    {
        var failedList = [];
        for (var i = 0; i < admin.attackList.length; i++)
        {
            var attack = admin.attackList[i].trim();
            if (admin.bulkType == "Level-Up Moves")
            {
                admin.tempLevel = attack;
                var success = admin.loadAttack('level');
                if (!success)
                    failedList.push(attack);
            }
            if (admin.bulkType == "TMs")
            {
                admin.tempTM = attack;
                admin.tempTMGen = admin.tmGen;
                var success = admin.loadAttack('tm');
                if (!success)
                    failedList.push(attack);
            }
            if (admin.bulkType == "HMs")
            {
                admin.tempHM = attack;
                var success = admin.loadAttack('hm');
                if (!success)
                    failedList.push(attack);
            }
            if (admin.bulkType == "BMs")
            {
                admin.tempBM = attack;
                var success = admin.loadAttack('bm');
                if (!success)
                    failedList.push(attack);
            }
            if (admin.bulkType == "MTs")
            {
                admin.tempMT = attack;
                var success = admin.loadAttack('mt');
                if (!success)
                    failedList.push(attack);
            }
            if (admin.bulkType == "SMs")
            {
                admin.tempSM = attack;
                var success = admin.loadAttack('sm');
                if (!success)
                    failedList.push(attack);
            }
        }
        
        if (failedList.length > 0)
        {
            alert(failedList);
        }
    }
    
    admin.captureMethods = {};
    $http.get($rootScope.serviceHost + ':8443/captureInfo/').success(function(data) {
        admin.captureMethods = data;
    });
    
    admin.loadMethod = function(type, rank)
    {
        if (type == "story")
        {
            for (var r in admin.captureMethods.story)
            {
                if (admin.captureMethods.story[r] == rank)       
                {
                    admin.instance.storyRank = r;
                    admin.instance.storyReq = rank;
                    
                    if (r == admin.prototype.storyRank)
                    {
                        delete admin.changes.storyRank;
                    }
                    else
                    {
                        admin.changes.storyRank = r;
                    }
                }
            }
        }
        
        if (type == "art")
        {
            for (var r in admin.captureMethods.art)
            {
                if (admin.captureMethods.art[r] == rank)       
                {
                    admin.instance.artRank = r;
                    admin.instance.artReq = rank;
                    
                    if (r == admin.prototype.artRank)
                    {
                        delete admin.changes.artRank;
                    }
                    else
                    {
                        admin.changes.artRank = r;
                    }
                }
            }
        }
        
        if (type == "park")
        {
            for (var r in admin.captureMethods.park)
            {
                if (admin.captureMethods.park[r] == rank)       
                {
                    admin.instance.parkRank = r;
                    admin.instance.parkReq = rank;
                    
                    if (r == admin.prototype.parkRank)
                    {
                        delete admin.changes.parkRank;
                    }
                    else
                    {
                        admin.changes.parkRank = r;
                    }
                }
            }
        }
        
        if (type == "parkLocation")
        {
            for (var r in admin.captureMethods.parkLocation)
            {
                if (admin.captureMethods.parkLocation[r] == rank)
                {
                    admin.instance.parkLocation = rank;
                    
                    if (rank == admin.prototype.parkLocation)
                    {
                        delete admin.changes.parkLocation;
                    }
                    else
                    {
                        admin.changes.parkLocation = rank;
                    }
                }
            }
        }
    };
    
    admin.loadEvolutions = function(pokemon)
    {
        if (pokemon.name == undefined || pokemon.name == "") return {};
        $http.get($rootScope.serviceHost + ':8443/pokemon/name/' + pokemon.name + '/evolutions/').success(function(data) {
            pokemon.evolutions = data;
        });
    };
    
    admin.addEvolution = function()
    {
        if (admin.instance.evolutions === undefined)
            admin.instance.evolutions = [];
        admin.instance.evolutions.push({
            "name": "",
            "method": "",
            "exp": "",
            "new": true
        });
    };
    
    
    admin.updateEvolution = function(evolution)
    {  
        var valid = true;
        if (admin.pokemonNames.indexOf(evolution.name) == -1)
        {
            if (admin.changes.evolutions != undefined)
            {
                if (admin.changes.evolutions.length == 1 && admin.changes.evolutions.indexOf(evolution) != -1)
                    delete admin.changes.evolutions;
                else
                    admin.changes.evolutions.splice(1, admin.changes.evolutions.indexOf(evolution));
            }
            valid = false;
        }
        
        if (evolution.method == "")
        {
            if (admin.changes.evolutions != undefined)
            {
                if (admin.changes.evolutions.length == 1 && admin.changes.evolutions.indexOf(evolution) != -1)
                    delete admin.changes.evolutions;
                else
                    admin.changes.evolutions.splice(1, admin.changes.evolutions.indexOf(evolution));
            }
            evolution.methodValid = false;
            valid = false;
        }
        else
        {
            evolution.methodValid = true;
        }
        
        if (evolution.exp != "5" && evolution.exp != "7")
        {
            if (admin.changes.evolutions != undefined)
            {
                if (admin.changes.evolutions.length == 1 && admin.changes.evolutions.indexOf(evolution) != -1)
                    delete admin.changes.evolutions;
                else
                    admin.changes.evolutions.splice(1, admin.changes.evolutions.indexOf(evolution));
            }
            evolution.expValid = false;
            valid = false;
        }
        else
        {
            evolution.expValid = true;        
        }
        
        if (!valid) 
        {
            return;
        }
        
        if (admin.changes.evolutions == undefined)
        {
            admin.changes.evolutions = [];
        }
        
        var found = false;
        for (var i = 0; i < admin.changes.evolutions.length; i++)
        {
            var evo = admin.changes.evolutions[i];
            if (evo == evolution)
                found = true;
        }
        
        if (!found)
        {
            admin.changes.evolutions.push(evolution);
        }
    };
    
    admin.updateEvolutionName = function(evolution, name)
    {
        evolution.name = name;
        admin.updateEvolution(evolution);
    };
    
    admin.updateEvolutionMethod = function(evolution, method)
    {
        evolution.method = method;
        admin.updateEvolution(evolution);
    };
    
    admin.updateEvolutionEXP = function(evolution, exp)
    {
        evolution.exp = exp;
        admin.updateEvolution(evolution);
    };
    
    admin.removeEvolution = function(index) {
        admin.instance.evolutions.splice(index, 1);
        var length = 0;
        if (admin.prototype.evolutions != undefined)
            length = admin.prototype.evolutions.length;
        index = index - length;
        if (admin.changes.evolutions !== undefined)
            admin.changes.evolutions.splice(index, 1);
    };
    
    admin.addMegaEvolution = function()
    {
        if (admin.instance.megaEvolutions === undefined)
            admin.instance.megaEvolutions = [];
        admin.instance.megaEvolutions.push({
            "name": "",
            "megaStone": "",
            "new": true
        });
    };
    
    admin.updateMegaEvolution = function(megaEvolution)
    {  
        var valid = true;
        if (admin.pokemonNames.indexOf(megaEvolution.name) == -1 || megaEvolution.name.indexOf(admin.instance.name) == -1)
        {
            if (admin.changes.megaEvolutions != undefined)
            {
                if (admin.changes.megaEvolutions.length == 1 && admin.changes.megaEvolutions.indexOf(megaEvolution) != -1)
                    delete admin.changes.megaEvolutions;
                else
                    admin.changes.megaEvolutions.splice(1, admin.changes.megaEvolutions.indexOf(megaEvolution));
            }
            valid = false;
        }
        
        if (megaEvolution.megaStone == "")
        {
            if (admin.changes.megaEvolutions != undefined)
            {
                if (admin.changes.megaEvolutions.length == 1 && admin.changes.megaEvolutions.indexOf(megaEvolution) != -1)
                    delete admin.changes.megaEvolutions;
                else
                    admin.changes.megaEvolutions.splice(1, admin.changes.megaEvolutions.indexOf(megaEvolution));
            }
            megaEvolution.megaStoneValid = false;
            valid = false;
        }
        else
        {
            megaEvolution.megaStoneValid = true;
        }
        
        if (!valid) 
        {
            return;
        }
        
        if (admin.changes.megaEvolutions == undefined)
        {
            admin.changes.megaEvolutions = [];
        }
        
        var found = false;
        for (var i = 0; i < admin.changes.megaEvolutions.length; i++)
        {
            var mega = admin.changes.megaEvolutions[i];
            if (mega == megaEvolution)
                found = true;
        }
        
        if (!found)
        {
            admin.changes.megaEvolutions.push(megaEvolution);
        }
    };
    
    admin.updateMegaEvolutionName = function(megaEvolution, name)
    {
        megaEvolution.name = name;
        admin.updateMegaEvolution(megaEvolution);
    };
    
    admin.updateMegaEvolutionMegaStone = function(megaEvolution, megaStone)
    {
        megaEvolution.megaStone = megaStone;
        admin.updateMegaEvolution(megaEvolution);
    };
    
    admin.removeMegaEvolution = function(index) {
        admin.instance.megaEvolutions.splice(index, 1);
        var length = 0;
        if (admin.prototype.megaEvolutions != undefined)
            length = admin.prototype.megaEvolutions.length;
        index = index - length;
        if (admin.changes.megaEvolutions !== undefined)
            admin.changes.megaEvolutions.splice(index, 1);
    };
    
    admin.nameValid = true;
    admin.updateName = function(name)
    {
        if (name.length > 2 && name.length < 20)
        {
            admin.instance.name = name;
            admin.changes.name = name;
            admin.nameValid = true;
        }
        else
        {
            admin.nameValid = false;
            delete admin.changes.name;
        }
    };
    
    admin.dexValid = true;
    admin.updateDex = function(dex)
    {
        var numerals = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
        for (var i = 0; i < dex.length; i++)
        {
            if (numerals.indexOf(dex[i]) == -1)
            {
                admin.dexValid = false;
                delete admin.changes.dex;
                return;
            }
        }
        
        if (dex > 0 && dex <= 900)
        {
            admin.changes.dex = dex;
            admin.dexValid = true;
        }
        else
        {
            admin.dexValid = false;
            delete admin.changes.dex;
        }
    };
    
    admin.displayNameValid = true;
    admin.updateDisplayName = function(displayName)
    {
        if (displayName.length > 2 && displayName.length < 20)
        {
            admin.changes.displayName = displayName;
            admin.displayNameValid = true;
        }
        else
        {
            admin.displayNameValid = false;
            delete admin.changes.displayName;
        }
    };
    
    admin.formNameValid = true;
    admin.updateFormName = function(formName)
    {
        if (formName.length < 20)
        {
            admin.changes.formName = formName;
            admin.formNameValid = true;
        }
        else
        {
            admin.formNameValid = false;
            delete admin.changes.formName;
        }
    };
    
    admin.formMethodValid = true;
    admin.updateFormMethod = function(formMethod)
    {
            admin.changes.formMethod = formMethod;
            admin.formMethodValid = true;
    };
    
    admin.classificationValid = true;
    admin.updateClassification = function(classification)
    {
        if (classification.length > 2 && classification.length < 15)
        {
            admin.changes.classification = classification;
            admin.classificationValid = true;
        }
        else
        {
            admin.classificationValid = false;
            delete admin.changes.classification;
        }
    };
    
    admin.heightValid = true;
    admin.updateHeight = function(height)
    {
        if (height > 0)
        {
            admin.changes.height = height;
            admin.heightValid = true;
        }
        else
        {
            admin.heightValid = false;
            delete admin.changes.height;
        }
    };
    
    admin.weightValid = true;
    admin.updateWeight = function(weight)
    {
        if (weight > 0)
        {
            admin.changes.weight = weight;
            admin.weightValid = true;
        }
        else
        {
            admin.weightValid = false;
            delete admin.changes.weight;
        }
    };
    
    admin.updateMaleAllowed = function(maleAllowed)
    {
        admin.changes.maleAllowed = maleAllowed;
    }
    
    admin.updateFemaleAllowed = function(femaleAllowed)
    {
        admin.changes.femaleAllowed = femaleAllowed;
    }
    
    admin.type1Valid = true;
    admin.updateType1 = function(type)
    {
        if (admin.attackTypes.indexOf(type) != -1)
        {
            admin.changes.type1 = type;
            admin.type1Valid = true;
        }
        else
        {
            admin.type1Valid = false;
            delete admin.changes.type1;
        }
    };
    
    admin.type2Valid = true;
    admin.updateType2 = function(type)
    {
        if (admin.attackTypes.indexOf(type) != -1)
        {
            admin.changes.type2 = type;
            admin.type2Valid = true;
        }
        else
        {
            admin.type2Valid = false;
            delete admin.changes.type2;
        }
    };
    
    admin.loadPokemon = function(pokemon) {
        $http.get($rootScope.serviceHost + ':8443/pokemon/name/' + pokemon).success(function(data) {
			admin.pokemon = {};
            admin.pokemon.name = data.name;
            admin.pokemon.dex = data.dex;
            admin.pokemon.prevMon = data.lastMon;
            admin.pokemon.prevDex = data.lastDex;
            admin.pokemon.prevIcon = "http://urpgdex.monbrey.com.au/art/icons/" + admin.pokemon.prevDex + ".png";
            admin.pokemon.prevUrl = "/admin/" + admin.pokemon.prevMon;
            admin.pokemon.nextMon = data.nextMon;
            admin.pokemon.nextDex = data.nextDex;
            admin.pokemon.nextIcon = "http://urpgdex.monbrey.com.au/art/icons/" + admin.pokemon.nextDex + ".png";
            admin.pokemon.nextUrl = "/admin/" + admin.pokemon.nextMon;
            admin.pokemon.classification = data.classification;
            admin.pokemon.type1 = data.type1;
            admin.pokemon.type2 = data.type2;
            admin.pokemon.abilities = data.abilities;
            admin.pokemon.hp = data.hp;
            admin.pokemon.attack = data.attack;
            admin.pokemon.defense = data.defense;
            admin.pokemon.specialAttack = data.specialAttack;
            admin.pokemon.specialDefense = data.specialDefense;
            admin.pokemon.speed = data.speed;
            admin.pokemon.typeMatchups = data.typeMatchups;
            admin.pokemon.femaleAllowed = data.femaleAllowed;
            admin.pokemon.maleAllowed = data.maleAllowed;
            admin.pokemon.height = data.height;
            admin.pokemon.weight = data.weight;
            admin.pokemon.evolutionFamily = data.evolutionFamily;
            admin.pokemon.storyRank = data.storyRank;
            admin.pokemon.storyReq = data.storyReq;
            admin.pokemon.pokemart = data.pokemart;
            admin.pokemon.artRank = data.artRank;
            admin.pokemon.artReq = data.artReq;
            admin.pokemon.parkRank = data.parkRank;
            admin.pokemon.parkArea = data.parkArea;
            admin.pokemon.parkReq = data.parkReq;
            admin.pokemon.berryStore = data.contestCredits;
            admin.pokemon.sodaShoppe = data.sodaShoppe;
            admin.pokemon.levelUpMoves = data.levelUpMoves;
            admin.pokemon.TMs = data.tms;
            admin.pokemon.HMs = data.hms;
            admin.pokemon.BMs = data.bms;
            admin.pokemon.MTs = data.mts;
            admin.pokemon.SMs = data.sms;
            admin.pokemon.megaEvolutions = data.megaEvolutions;
            admin.pokemon.sprites = [ "http://urpgdex.monbrey.com.au/art/models/" + admin.pokemon.dex + ".gif" ];
            admin.pokemon.megaIcons = [];

            for (var i = 0; i < admin.pokemon.megaEvolutions.length; i++)
            {
                var megaName = "http://urpgdex.monbrey.com.au/art/icons/" + admin.pokemon.dex + admin.suffix(admin.pokemon.name, admin.pokemon.megaEvolutions[i].name) + ".png";
                
                admin.pokemon.megaIcons.push(megaName);
            }
            
            for (i = 0; i < admin.pokemon.evolutionFamily.length; i++)
            {
                for (var j = 0; j < admin.pokemon.evolutionFamily[i].length; j++)
                {
                    var species = admin.pokemon.evolutionFamily[i][j];
                    species.icon = "http://urpgdex.monbrey.com.au/art/icons/" + species.dex + ".png";
                    species.url = "/pokemon/" + species.name;
                }
            }
			
			admin.prototype = JSON.parse(JSON.stringify(admin.pokemon));
            admin.loadEvolutions(admin.prototype);
			admin.instance = JSON.parse(JSON.stringify(admin.prototype));
            admin.loadEvolutions(admin.instance);
            admin.changes = {};
            admin.changes.name = admin.instance.name;
            admin.changes.deleted = {};
        }).error(function(data) {
        });
    };
    
    admin.suffix = function(base, input) {
        var exceptions = ["nidoran-f", "nidoran-m", "ho-oh", "meowstic-m", "basculin-red-striped", "unown-a", "porygon-z" ];

        base = base.toLowerCase();
        input = input.toLowerCase();

        if (exceptions.indexOf(input) == -1)
        {
            return input.replace(base, "");
        }
    };
    
    admin.addAbility = function() {
        if (admin.instance.abilities === undefined)
            admin.instance.abilities = [];
        admin.instance.abilities.push({
            "name": "new",
            "description": "",
            "hidden": false
        });
    };
    
    admin.removeAbility = function(index) {
        admin.instance.abilities.splice(index, 1);
        index = index - admin.prototype.abilities.length;
        admin.changes.abilities.splice(index, 1);
    };
    
    admin.hpValid = true;
    admin.newHP = "New Value";
    admin.updateHP = function(hp) {
        var minHP = 214;
        var maxHP = 714;
        
        if (admin.instance.name == undefined || admin.instance.name == "")
        {
            delete admin.changes.hp;
            return;
        }
        
        var numerals = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
        for (var i = 0; i < hp.length; i++)
        {
            if (numerals.indexOf(hp[i]) == -1)
            {
                admin.hpValid = false;
                delete admin.changes.hp;
                return;
            }
        }
        
        if (hp == "")
        {
            admin.hpValid = true; 
            delete admin.changes.hp;
            return;
        }
        
        if (hp % 2 != 0)
        {
            admin.hpValid = false; 
            delete admin.changes.hp;
            return;
        }
        
        if (hp < minHP || hp > maxHP)
        {
            admin.hpValid = false; 
            delete admin.changes.hp;
            return;
        }

        admin.changes.hp = hp;
        admin.instance.hp = hp;
        admin.hpValid = true;
    };
    
    admin.attackValid = true;
    admin.newAttack = "New Value";
    admin.updateAttack = function(attack) {
        var minAttack = 109;
        var maxAttack = 479;
        
        if (admin.instance.name == undefined || admin.instance.name == "")
        {
            delete admin.changes.attack;
            return;
        }
        
        var numerals = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
        for (var i = 0; i < attack.length; i++)
        {  
            if (numerals.indexOf(attack[i]) == -1)
            {
                admin.attackValid = false;
                delete admin.changes.attack;
                return;
            }
        }
        
        if (attack == "")
        {
            admin.attackValid = true; 
            delete admin.changes.attack;
            return;
        }
        
        if (attack % 2 != 1)
        {
            admin.attackValid = false; 
            delete admin.changes.attack;
            return;
        }
        
        if (attack < minAttack || attack > maxAttack)
        {
            admin.attackValid = false; 
            delete admin.changes.attack;
            return;
        }

        admin.changes.attack = attack;
        admin.instance.attack = attack;
        admin.attackValid = true;
    };
    
    admin.defenseValid = true;
    admin.newDefense = "New Value";
    admin.updateDefense = function(defense) {
        var minDefense = 109;
        var maxDefense = 559;
        
        if (admin.instance.name == undefined || admin.instance.name == "")
        {
            delete admin.changes.defense;
            return;
        }
        
        var numerals = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
        for (var i = 0; i < defense.length; i++)
        {
            if (numerals.indexOf(defense[i]) == -1)
            {
                admin.defenseValid = false;
                delete admin.changes.defense;
                return;
            }
        }
        
        if (defense == "")
        {
            admin.defenseValid = true; 
            delete admin.changes.defense;
            return;
        }
        
        if (defense % 2 != 1)
        {
            admin.defenseValid = false; 
            delete admin.changes.defense;
            return;
        }
        
        if (defense < minDefense || defense > maxDefense)
        {
            admin.defenseValid = false; 
            delete admin.changes.defense;
            return;
        }

        admin.changes.defense = defense;
        admin.instance.defense = defense;
        admin.defenseValid = true;
    };
    
    admin.specialAttackValid = true;
    admin.newSpecialAttack = "New Value";
    admin.updateSpecialAttack = function(specialAttack) {
        var minSpecialAttack = 109;
        // (((31 + 2 * 194 + (252/4) ) * 100/100 ) + 5) * 1
        var maxSpecialAttack = 487;
        
        if (admin.instance.name == undefined || admin.instance.name == "")
        {
            delete admin.changes.specialAttack;
            return;
        }
        
        var numerals = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
        for (var i = 0; i < specialAttack.length; i++)
        {
            if (numerals.indexOf(specialAttack[i]) == -1)
            {
                admin.specialAttackValid = false;
                delete admin.changes.specialAttack;
                return;
            }
        }
        
        if (specialAttack == "")
        {
            admin.specialAttackValid = true; 
            delete admin.changes.specialAttack;
            return;
        }
        
        if (specialAttack % 2 != 1)
        {
            admin.specialAttackValid = false; 
            delete admin.changes.specialAttack;
            return;
        }
        
        if (specialAttack < minSpecialAttack || specialAttack > maxSpecialAttack)
        {
            admin.specialAttackValid = false; 
            delete admin.changes.specialAttack;
            return;
        }

        admin.changes.specialAttack = specialAttack;
        admin.instance.specialAttack = specialAttack;
        admin.specialAttackValid = true;
    };
    
    admin.specialDefenseValid = true;
    admin.newSpecialDefense = "New Value";
    admin.updateSpecialDefense = function(specialDefense) {
        var minSpecialDefense = 109;
        // (((31 + 2 * 230 + (252/4) ) * 100/100 ) + 5) * 1
        var maxSpecialDefense = 559;
        
        if (admin.instance.name == undefined || admin.instance.name == "")
        {
            delete admin.changes.specialDefense;
            return;
        }
        
        var numerals = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
        for (var i = 0; i < specialDefense.length; i++)
        {
            if (numerals.indexOf(specialDefense[i]) == -1)
            {
                admin.specialDefenseValid = false;
                delete admin.changes.specialDefense;
                return;
            }
        }
        
        if (specialDefense == "")
        {
            admin.specialDefenseValid = true; 
            delete admin.changes.specialDefense;
            return;
        }
        
        if (specialDefense % 2 != 1)
        {
            admin.specialDefenseValid = false; 
            delete admin.changes.specialDefense;
            return;
        }
        
        if (specialDefense < minSpecialDefense || specialDefense > maxSpecialDefense)
        {
            admin.specialDefenseValid = false; 
            delete admin.changes.specialDefense;
            return;
        }

        admin.changes.specialDefense = specialDefense;
        admin.instance.specialDefense = specialDefense;
        admin.specialDefenseValid = true;
    };
    
    admin.speedValid = true;
    admin.newSpeed = "New Value";
    admin.updateSpeed = function(speed) {
        var minSpeed = 109;
        var maxSpeed = 459;
        
        if (admin.instance.name == undefined || admin.instance.name == "")
        {
            delete admin.changes.speed;
            return;
        }
        
        var numerals = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
        for (var i = 0; i < speed.length; i++)
        {
            if (numerals.indexOf(speed[i]) == -1)
            {
                admin.speedValid = false;
                delete admin.changes.speed;
                return;
            }
        }
        
        if (speed == "")
        {
            admin.speedValid = true; 
            delete admin.changes.speed;
            return;
        }
        
        if (speed % 2 != 1)
        {
            admin.speedValid = false; 
            delete admin.changes.speed;
            return;
        }
        
        if (speed < minSpeed || speed > maxSpeed)
        {
            admin.speedValid = false; 
            delete admin.changes.speed;
            return;
        }

        admin.changes.speed = speed;
        admin.instance.speed = speed;
        admin.speedValid = true;
    };
    
    admin.pokemartValid = true;
    admin.newPokemart = "New Value";
    admin.updatePokemart = function(pokemart) {
        var minPokemart = 5000;
        var maxPokemart = 15000;
        
        if (admin.instance.name == undefined || admin.instance.name == "")
        {
            delete admin.changes.pokemart;
            return;
        }
        
        if (pokemart == "")
        {
            admin.pokemartValid = true; 
            delete admin.changes.pokemart;
            return;
        }
        
        if (pokemart != "-")
        {        
            if (pokemart.indexOf("$") == 0)
                pokemart = pokemart.replace("$", "");
            
            pokemart = pokemart.replace(/,/g, '');
            
            var numerals = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
            for (var i = 0; i < pokemart.length; i++)
            {
                if (numerals.indexOf(pokemart[i]) == -1)
                {
                    admin.pokemartValid = false;
                    delete admin.changes.pokemart;
                    return;
                }
            }

            if (pokemart < minPokemart || pokemart > maxPokemart)
            {
                admin.pokemartValid = false; 
                delete admin.changes.pokemart;
                return;
            }
            
            if (pokemart.indexOf("$") == -1)
                pokemart = "$" + pokemart;
        }

        admin.changes.pokemart = pokemart;
        admin.instance.pokemart = pokemart;
        admin.pokemartValid = true;
    };
    
    admin.berryStoreValid = true;
    admin.newBerryStore = "New Value";
    admin.updateBerryStore = function(berryStore) {
        var minBerryStore = 10000;
        var maxBerryStore = 50000;
        
        if (admin.instance.name == undefined || admin.instance.name == "")
        {
            delete admin.changes.berryStore;
            return;
        }
        
        if (berryStore == "")
        {
            admin.berryStoreValid = true; 
            delete admin.changes.berryStore;
            return;
        }
        
        if (berryStore != "-")
        {        
            if (berryStore.indexOf("$") == 0)
                berryStore = berryStore.replace("$", "");
            
            berryStore = berryStore.replace(/,/g, '');
            
            var numerals = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
            for (var i = 0; i < berryStore.length; i++)
            {
                if (numerals.indexOf(berryStore[i]) == -1)
                {
                    admin.berryStoreValid = false;
                    delete admin.changes.berryStore;
                    return;
                }
            }

            if (berryStore < minBerryStore || berryStore > maxBerryStore)
            {
                admin.berryStoreValid = false; 
                delete admin.changes.berryStore;
                return;
            }
            
            if (berryStore.indexOf("$") == -1)
                berryStore = "$" + berryStore;
        }

        admin.changes.berryStore = berryStore;
        admin.instance.berryStore = berryStore;
        admin.berryStoreValid = true;
    };
    
    admin.sodaShoppeValid = true;
    admin.newSodaShoppe = "New Value";
    admin.updateSodaShoppe = function(sodaShoppe) {
        var minSodaShoppe = 4200;
        var maxSodaShoppe = 9000;
        
        if (admin.instance.name == undefined || admin.instance.name == "")
        {
            delete admin.changes.sodaShoppe;
            return;
        }
        
        if (sodaShoppe == "")
        {
            admin.sodaShoppeValid = true; 
            delete admin.changes.sodaShoppe;
            return;
        }
        
        if (sodaShoppe != "-")
        {        
            if (sodaShoppe.indexOf("$") == 0)
                sodaShoppe = sodaShoppe.replace("$", "");
            
            sodaShoppe = sodaShoppe.replace(/,/g, '');
            
            var numerals = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
            for (var i = 0; i < sodaShoppe.length; i++)
            {
                if (numerals.indexOf(sodaShoppe[i]) == -1)
                {
                    admin.sodaShoppeValid = false;
                    delete admin.changes.sodaShoppe;
                    return;
                }
            }

            if (sodaShoppe < minSodaShoppe || sodaShoppe > maxSodaShoppe)
            {
                admin.sodaShoppeValid = false; 
                delete admin.changes.sodaShoppe;
                return;
            }
            
            if (sodaShoppe.indexOf("$") == -1)
                sodaShoppe = "$" + sodaShoppe;
        }

        admin.changes.sodaShoppe = sodaShoppe;
        admin.instance.sodaShoppe = sodaShoppe;
        admin.sodaShoppeValid = true;
    };
    
    admin.savePokemon = function() {
        var payload = {
            "username": sessionService.username,
            "loginString": sessionService.loginString,
            "browser": $window.navigator.userAgent,
            "id": sessionService.id, 
            "pokemon": admin.changes
        };
        
        $http.post($rootScope.serviceHost + ':8443/pokemon/name/' + admin.instance.name + '/update', payload).then(function(data) { 
            admin.loadPokemon(admin.prototype.name);
            alert(JSON.stringify(data.data));
        });
    };
    
    admin.saveNewPokemon = function() {
        var payload = {
            "username": sessionService.username,
            "loginString": sessionService.loginString,
            "browser": $window.navigator.userAgent,
            "id": sessionService.id, 
            "pokemon": admin.changes
        };
        
        $http.post($rootScope.serviceHost + ':8443/pokemon/name/' + admin.instance.name + "/create", payload).then(function(data) { 
            //$location.path('/admin/add-pokemon');
        });
    };
    
    admin.attackNameValid = true;
    admin.updateAttackName = function(name)
    {
        if (name.length > 3 && name.length < 17)
        {
            admin.changes.name = name;
            admin.attackNameValid = true;
        }
        else
        {
            admin.attackNameValid = false;
            delete admin.changes.name;
        }
    };
    
    admin.attackTypes = {};
    $http.get($rootScope.serviceHost + ':8443/type/').success(function (data) {
        admin.attackTypes = data;
    });
    admin.attackTypeValid = true;
    admin.updateAttackType = function(type)
    {
        if (admin.attackTypes.indexOf(type) != -1)
        {
            admin.changes.type = type;
            admin.attackTypeValid = true;
        }
        else
        {
            admin.attackTypeValid = false;
            delete admin.changes.type;
        }
    };
    
    admin.attackDescriptionValid = true;
    admin.updateAttackDescription = function(description)
    {
        if (description.length < 100)
        {
            admin.changes.description = description;
            admin.attackDescriptionValid = true;
        }
        else
        {
            admin.attackDescriptionValid = false;
            delete admin.changes.description;
        }
    };
    
    admin.attackPowerValid = true;
    admin.updateAttackPower = function(power)
    {
        var numerals = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
        for (var i = 0; i < power.length; i++)
        {
            if (numerals.indexOf(power[i]) == -1)
            {
                admin.attackPowerValid = false;
                delete admin.changes.power;
                return;
            }
        }
        
        if (power >= 0 && power <= 250)
        {
            admin.changes.power = power;
            admin.attackPowerValid = true;
        }
        else
        {
            admin.attackPowerValid = false;
            delete admin.changes.power;
        }
    };
    
    admin.attackAccuracyValid = true;
    admin.updateAttackAccuracy = function(accuracy)
    {
        var numerals = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
        for (var i = 0; i < accuracy.length; i++)
        {
            if (numerals.indexOf(accuracy[i]) == -1)
            {
                admin.attackAccuracyValid = false;
                delete admin.changes.accuracy;
                return;
            }
        }
        
        if (accuracy >= 0 && accuracy <= 100)
        {
            admin.changes.accuracy = accuracy;
            admin.attackAccuracyValid = true;
        }
        else
        {
            admin.attackAccuracyValid = false;
            delete admin.changes.accuracy;
        }
    };
    
    admin.attackPPValid = true;
    admin.updateAttackPP = function(pp)
    {
        var numerals = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
        for (var i = 0; i < pp.length; i++)
        {
            if (numerals.indexOf(pp[i]) == -1)
            {
                admin.attackPPValid = false;
                delete admin.changes.pp;
                return;
            }
        }
        
        if (pp > 0 && pp <= 40)
        {
            admin.changes.pp = pp;
            admin.attackPPValid = true;
        }
        else
        {
            admin.attackPPValid = false;
            delete admin.changes.pp;
        }
    };
    
    admin.attackCategories = [ "Physical", "Special", "Status" ];
    admin.attackCategoryValid = true;
    admin.updateAttackCategory = function(category)
    {
        if (admin.attackCategories.indexOf(category) != -1)
        {
            admin.changes.category = category;
            admin.attackCategoryValid = true;
        }
        else
        {
            admin.attackCategoryValid = false;
            delete admin.changes.category;
        }
    };
    
    admin.attackTargets = [ "Any Adjacent Foe",
                            "Any Adjacent Ally",
                            "Any Adjacent Ally, or User",
                            "Any Adjacent Pokemon",
                            "Any Adjacent Pokemon, or User",
                            "Any Pokemon",
                            "All Adjacent Opponents",
                            "All Opponents",
                            "All Adjacent Pokemon",
                            "All Pokemon",
                            "User",
                            "User's Team",
                            "Random Adjacent Opponent",
                            "Random Target" ];
    admin.attackTargetSymbols = [ "1 Enemy", "A", "S or A", "1", "1 or S", "1 Reach",                                 "2", "3 Enemy", "3", "4", "Self", "P", 
                                  "Random Enemy", "Random" ];
    admin.attackTargetValid = true;
    admin.updateAttackTarget = function(target)
    {
        if (admin.attackTargets.indexOf(target) != -1)
        {
            admin.changes.target = admin.attackTargetSymbols[admin.attackTargets.indexOf(target)];
            admin.attackTargetValid = true;
        }
        else
        {
            admin.attackTargetValid = false;
            delete admin.changes.target;
        }
    };
    
    admin.updateAttackContact = function(contact)
    {
        admin.changes.contact = contact;
    }
    
    admin.updateAttackSheerForce = function(sheerForce)
    {
        admin.changes.sheerForce = sheerForce;
    }
    
    admin.updateAttackSnatch = function(snatch)
    {
        admin.changes.snatch = snatch;
    }
    
    admin.updateAttackSubstitute = function(substitute)
    {
        admin.changes.substitute = substitute;
    }
    
    admin.updateAttackMagicCoat = function(magicCoat)
    {
        admin.changes.magicCoat = magicCoat;
    }
    
    admin.saveAttack = function() {
        var payload = {
            "username": sessionService.username,
            "loginString": sessionService.loginString,
            "browser": $window.navigator.userAgent,
            "id": sessionService.id, 
            "attack": admin.changes
        };
        
        $http.post($rootScope.serviceHost + ':8443/attack/name/' + admin.instance.name + '/create', payload).then(function(data) { 
            alert(JSON.stringify(data.data));
        });
    };
    
}]);