app.controller('resourcesPokemonCtrl', ['pokemonService', 'attackService', 'abilityService', 'typeService', 'storyRankService', 'artRankService', 'parkRankService', 'parkLocationService',
    function(pokemonService, attackService, abilityService, typeService, storyRankService, artRankService, parkRankService, parkLocationService) {

	var ctrl = this;

    ctrl.delta = {};

    ctrl.searchKey = "vivillon";

	ctrl.loadMain = function() {
        ctrl.pokemon = {};
	    if (ctrl.searchKey !== undefined && ctrl.searchKey != '') {
	        pokemonService.findByName(ctrl.searchKey).then(function (response) {
	            if (response.status == 200) {
	                ctrl.notFound = false;
                    ctrl.pokemon = response.data;
                    ctrl.delta.name = ctrl.pokemon.name;
                    ctrl.createAttacksDelta();
                    ctrl.createAbilitiesDelta();
                    ctrl.delta.evolvesFrom = {};
                    ctrl.delta.megaEvolvesFrom = {};
                    ctrl.createFormsDelta();
	            }
	            else {
                    ctrl.notFound = true;
                }
	        });
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

	ctrl.loadTypes = function() {
	    typeService.findAll().then(function(response) {
            if (response.status == 200) {
                ctrl.types = response.data;
            }
            else {
                console.log("Encountered an error while trying to load the list of types from URPG Server. Please contact a system administrator if this issue persists after refreshing your browser.");
            }
        });
	}

	ctrl.loadStoryRanks = function() {
        storyRankService.findAll().then(function(response) {
            if (response.status == 200) {
                ctrl.storyRanks = response.data;
            }
            else {
                console.log("Encountered an error while trying to load the list of story ranks from URPG Server. Please contact a system administrator if this issue persists after refreshing your browser.");
            }
        });
    }

    ctrl.loadArtRanks = function() {
        artRankService.findAll().then(function(response) {
            if (response.status == 200) {
                ctrl.artRanks = response.data;
            }
            else {
                console.log("Encountered an error while trying to load the list of art ranks from URPG Server. Please contact a system administrator if this issue persists after refreshing your browser.");
            }
        });
    }

    ctrl.loadParkRanks = function() {
        parkRankService.findAll().then(function(response) {
            if (response.status == 200) {
                ctrl.parkRanks = response.data;
            }
            else {
                console.log("Encountered an error while trying to load the list of park ranks from URPG Server. Please contact a system administrator if this issue persists after refreshing your browser.");
            }
        });
    }

    ctrl.loadParkLocations = function() {
        parkLocationService.findAll().then(function(response) {
            if (response.status == 200) {
                ctrl.parkLocations = response.data;
            }
            else {
                console.log("Encountered an error while trying to load the list of park locations from URPG Server. Please contact a system administrator if this issue persists after refreshing your browser.");
            }
        });
    }

    ctrl.loadMain();
    ctrl.loadAttacks();
    ctrl.loadAbilities();
    ctrl.loadSpecies();
    ctrl.loadTypes();
    ctrl.loadStoryRanks();
    ctrl.loadArtRanks();
    ctrl.loadParkRanks();
    ctrl.loadParkLocations();

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

    ctrl.createFormsDelta = function() {
        ctrl.formsDelta = {};
        for (var i = 0; i < ctrl.pokemon.alteredForms.length; i++) {
            var form = ctrl.pokemon.alteredForms[i];
            if (form.cosmetic == true) {
                ctrl.formsDelta[form.name] = {};
                ctrl.formsDelta[form.name].deleted = false;
            }
        }
    }

    ctrl.addForm = function() {
        if (ctrl.formsDelta[ctrl.newForm] === undefined) {
            ctrl.formsDelta[ctrl.newForm] = {};
            ctrl.formsDelta[ctrl.newForm].formName = ctrl.newFormTitle;
            ctrl.formsDelta[ctrl.newForm].deleted = false;

            var form = {
                name: ctrl.newForm,
                cosmetic: true,
                unsaved: true
            };
            ctrl.pokemon.alteredForms.unshift(form);
        }

        ctrl.clearForm();
    }

    ctrl.clearForm = function() {
        ctrl.newForm = "";
        ctrl.newFormTitle = "";
    }

    ctrl.createAbilitiesDelta = function() {
        ctrl.abilitiesDelta = {};
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
        ctrl.attacksDelta = {};
        for (var i = 0; i < ctrl.pokemon.attacks.length; i++) {
            var attack = ctrl.pokemon.attacks[i];
            ctrl.attacksDelta[attack.name] = {};
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

    ctrl.save = function() {
        if (ctrl.pokemon.name !== undefined) {
            ctrl.stageAttacksDelta();
            ctrl.stageAbilitiesDelta();
            ctrl.stageFormsDelta();
            pokemonService.updateSpecies(ctrl.delta);
        }
    }

    ctrl.stageAttacksDelta = function () {
        ctrl.delta.attacks = [];
        for (name in ctrl.attacksDelta) {
            ctrl.stageAttack(name);
        }
    }

    ctrl.stageAttack = function(name) {
        var attack = ctrl.attacksDelta[name];
        attack.name = name;
        ctrl.delta.attacks.push(attack);
    }

    ctrl.stageAbilitiesDelta = function() {
        ctrl.delta.abilities = [];
        for (name in ctrl.abilitiesDelta) {
            ctrl.stageAbility(name);
        }
    }

    ctrl.stageAbility = function(name) {
        var ability = ctrl.abilitiesDelta[name];
        ability.name = name;
        ctrl.delta.abilities.push(ability);
    }

    ctrl.stageFormsDelta = function() {
        ctrl.delta.cosmeticForms = [];
        for (name in ctrl.formsDelta) {
            ctrl.stageForm(name);
        }
    }

    ctrl.stageForm = function(name) {
        var form = ctrl.formsDelta[name];
        form.name = name;
        ctrl.delta.cosmeticForms.push(form);
    }

}]);