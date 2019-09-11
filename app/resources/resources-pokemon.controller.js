app.controller('resourcesPokemonCtrl', ['pokemonService', function(pokemonService) {
	var ctrl = this;

    ctrl.delta = {};

    ctrl.searchKey = "muk-alola";

	ctrl.load = function() {
	    if (ctrl.searchKey !== undefined && ctrl.searchKey != '') {
	        pokemonService.findByName(ctrl.searchKey).then(function (response) {
	            if (response.status == 200) {
	                ctrl.notFound = false;
                    ctrl.pokemon = response.data;
                    ctrl.delta.name = ctrl.pokemon.name;
                    ctrl.createAttacksDelta();
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

    ctrl.load();

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
        console.log(ctrl.attacksDelta);
    }

    ctrl.deleteOrRestoreAttack = function(attack) {
        ctrl.attacksDelta[attack.name].deleted = !ctrl.attacksDelta[attack.name].deleted;
    }

}]);