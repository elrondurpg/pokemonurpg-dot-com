app.controller('resourcesPokemonCtrl', ['pokemonService', 'attackService', 'abilityService', function(pokemonService, attackService, abilityService) {
	var ctrl = this;

    ctrl.delta = {};

    ctrl.searchKey = "muk-alola";

	ctrl.loadMain = function() {
	    if (ctrl.searchKey !== undefined && ctrl.searchKey != '') {
	        pokemonService.findByName(ctrl.searchKey).then(function (response) {
	            if (response.status == 200) {
	                ctrl.notFound = false;
                    ctrl.pokemon = response.data;
                    ctrl.delta.name = ctrl.pokemon.name;
                    ctrl.createAttacksDelta();
                    ctrl.createAbilitiesDelta();
                    ctrl.initMegaEvolution();
                    ctrl.initEvolution();
                    ctrl.create
	            }
	            else {
                    ctrl.notFound = true;
                }
	        });
	    }
	    else {
            ctrl.pokemon = {};
	    }
	}

	ctrl.loadAttacks = function() {
	    attackService.findAll().then(function(response) {
	        if (response.status == 200) {
	            ctrl.attacks = response.data;
	        }
	        else {
	            console.log("Encountered an error while trying to load the list of attacks from URPG Server. Please contact a system administrator if this issue persists after refreshing your browser.");
	        }
	    });
	}

	ctrl.loadAbilities = function() {
	    abilityService.findAll().then(function(response) {
	        if (response.status == 200) {
                ctrl.abilities = response.data;
            }
            else {
                console.log("Encountered an error while trying to load the list of abilities from URPG Server. Please contact a system administrator if this issue persists after refreshing your browser.");
            }
	    });
	}

	ctrl.loadSpecies = function() {
	    pokemonService.findAll().then(function(response) {
	        if (response.status == 200) {
                ctrl.species = response.data;
            }
            else {
                console.log("Encountered an error while trying to load the list of species from URPG Server. Please contact a system administrator if this issue persists after refreshing your browser.");
            }
	    });
	}

    ctrl.loadMain();
    ctrl.loadAttacks();
    ctrl.loadAbilities();
    ctrl.loadSpecies();

    ctrl.isDexnoValid = function () {
        var dexno = ctrl.delta.dexno;
        return dexno === undefined || dexno > 0;
    }

	ctrl.isDisplayNameValid = function() {
	    var displayName = ctrl.delta.displayName;
	    return displayName === undefined || displayName == '' || (displayName.length >= 3 && displayName.length <= 20);
	}

	ctrl.isFormNameValid = function() {
        var formName = ctrl.delta.formName;
        return formName === undefined || formName == '' || (formName.length >= 3 && formName.length <= 20);
    }

    ctrl.isClassificationValid = function() {
        var classification = ctrl.delta.classification;
        return classification === undefined || classification == '' || (classification.length >= 3 && classification.length <= 20);
    }

    ctrl.createAbilitiesDelta = function() {
        ctrl.abilitiesDelta = [];
        for (var i = 0; i < ctrl.pokemon.abilities.length; i++) {
            var ability = ctrl.pokemon.abilities[i];
            ctrl.abilitiesDelta[ability.name] = {};
            ctrl.abilitiesDelta[ability.name].hidden = ability.hidden;
            ctrl.abilitiesDelta[ability.name].deleted = false;
        }
    }

    ctrl.addAbility = function() {
        if (ctrl.abilitiesDelta[ctrl.newAbility] === undefined) {
            ctrl.abilitiesDelta[ctrl.newAbility] = {};
            ctrl.abilitiesDelta[ctrl.newAbility].hidden = false;
            ctrl.abilitiesDelta[ctrl.newAbility].deleted = false;

            var ability = {
                name: ctrl.newAbility,
                unsaved: true
            };
            ctrl.pokemon.abilities.unshift(ability);
        }

        ctrl.clearAbility();
    }

    ctrl.clearAbility = function() {
        ctrl.newAbility = "";
    }

    ctrl.attackFilter = "";
    ctrl.createAttacksDelta = function() {
        ctrl.attacksDelta = [];
        for (var i = 0; i < ctrl.pokemon.attacks.length; i++) {
            var attack = ctrl.pokemon.attacks[i];
            ctrl.attacksDelta[attack.name] = {};
            ctrl.attacksDelta[attack.name].method = attack.method;
            ctrl.attacksDelta[attack.name].generation = attack.generation;
            ctrl.attacksDelta[attack.name].deleted = false;
        }
    }

    ctrl.addAttack = function() {
        if (ctrl.attacksDelta[ctrl.newAttack] === undefined) {
            ctrl.attacksDelta[ctrl.newAttack] = {};
            ctrl.attacksDelta[ctrl.newAttack].deleted = false;

            var attack = {
                name: ctrl.newAttack,
                unsaved: true
            };
            ctrl.pokemon.attacks.unshift(attack);
        }

        ctrl.clearAttack();
    }

    ctrl.importAttacks = function() {
        var attacks = ctrl.bulkImportAttacks.split(",");
        if (ctrl.validateBulkImportAttacks()) {
            for (var i = 0; i < attacks.length; i++) {
                var attack = attacks[i].trim();
                ctrl.attacksDelta[attack] = {};
                ctrl.attacksDelta[attack].method = ctrl.bulkImportMethod;
                ctrl.attacksDelta[attack].generation = ctrl.bulkImportGeneration;
                ctrl.attacksDelta[attack].deleted = false;

                var newAttack = {
                    name: attack,
                    unsaved: true
                };
                ctrl.pokemon.attacks.unshift(newAttack);
            }
            ctrl.clearAttacks();
        }
    }

    ctrl.validateBulkImportAttacks = function() {
        var allValid = true;
        ctrl.bulkImportErrors = [];

        if (ctrl.bulkImportMethod == "" || ctrl.bulkImportMethod === undefined) {
            ctrl.bulkImportErrors.push("Please choose a learning method.");
            allValid = false;
        }
        if (ctrl.bulkImportMethod == "TM" && (ctrl.bulkImportGeneration == "" || ctrl.bulkImportGeneration === undefined)) {
            ctrl.bulkImportErrors.push("Please choose a TM generation.");
            allValid = false;
        }

        var attacks = ctrl.bulkImportAttacks.split(",");
        for (var i = 0; i < attacks.length; i++) {
            var attack = attacks[i].trim();
            if (attack != "") {
                if (ctrl.attacks.indexOf(attack) == -1) {
                    allValid = false;
                    ctrl.bulkImportErrors.push("Attack " + attack + " could not be imported.");
                }
                else if (ctrl.attacksDelta[attack] !== undefined) {
                    allValid = false;
                    ctrl.bulkImportErrors.push(ctrl.pokemon.name + " already learns " + attack + ".");
                }
            }
        }

        return allValid;
    }

    ctrl.clearAttack = function() {
        ctrl.newAttack = "";
    }

    ctrl.clearAttacks = function () {
        ctrl.bulkImportAttacks = "";
        ctrl.bulkImportMethod = "";
        ctrl.bulkImportGeneration = "";
        ctrl.bulkImportErrors = [];
    }

    ctrl.initEvolution = function () {
        ctrl.delta.evolvesFrom = {};
        if (ctrl.pokemon.evolvesFrom != undefined) {
            ctrl.delta.evolvesFrom.name = ctrl.pokemon.evolvesFrom.name;
            ctrl.delta.evolvesFrom.method = ctrl.pokemon.evolvesFrom.method;
        }
    }

    ctrl.initMegaEvolution = function () {
        ctrl.delta.megaEvolvesFrom = {};
        if (ctrl.pokemon.megaEvolvesFrom != undefined) {
            ctrl.delta.megaEvolvesFrom.name = ctrl.pokemon.megaEvolvesFrom.name;
            ctrl.delta.megaEvolvesFrom.megaStone = ctrl.pokemon.megaEvolvesFrom.megaStone;
        }
    }

}]);