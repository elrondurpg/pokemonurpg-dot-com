var PokemonList = [];
var TypeList = [];

var AP = [];

initAP(1, emptyPoke());
initAP(2, emptyPoke());

var triggerEvents = true;

function EntryDialog() {
	if(location.href.indexOf('battlev2') > 0) {
		$('#entry-dialog').dialog({
			buttons: [{
				text: "Go to new version",
				click: function() { window.location = "/pokemonurpg-dot-com/calcs/battlev3" }
			}],
			modal: true,
			width: 600
		});
	}
}

//These two functions are used to send Pokemon from Team Storage to active.
function Reset(sender) {
	var p = sender.id[sender.id.length-1];

	$('#AS'+p+', #DS'+p+', #SAS'+p+', #SDS'+p+', #SS'+p).each(function() {
		$(this)[0].selectize.setValue(1);
	});

	$('#attack'+p).val(AP[p].Attack);
	$('#defence'+p).val(AP[p].Defence);
	$('#SA'+p).val(AP[p].SpAttack);
	$('#SD'+p).val(AP[p].SpDefence);
	$('#speed'+p).val(AP[p].Speed);

	AP[p].Attack_Modded = AP[p].Attack;
	AP[p].Defence_Modded = AP[p].Defence;
	AP[p].SpAttack_Modded = AP[p].SpAttack;
	AP[p].SpDefence_Modded = AP[p].SpDefence;
	AP[p].Speed_Modded = AP[p].Speed;

	AP[p].Attack_Calced = AP[p].Attack;
	AP[p].Defence_Calced = AP[p].Defence;
	AP[p].SpAttack_Calced = AP[p].SpAttack;
	AP[p].SpDefence_Calced = AP[p].SpDefence;
	AP[p].Speed_Calced = AP[p].Speed;
}

function pokemon_stats(sender) {
	triggerEvents = false;

	var p = sender.id[sender.id.length-1];
	var pval = $(sender).val();

	if(!initAP(p, PokemonList[pval])) return false;

	$('#type'+p+'A')[0].selectize.setValue(AP[p].TypeA);
	$('#type'+p+'B')[0].selectize.setValue(AP[p].TypeB);
	$('#HP'+p).val(AP[p].HP);
	$('#attack'+p).val(AP[p].Attack);
	$('#defence'+p).val(AP[p].Defence);
	$('#SA'+p).val(AP[p].SpAttack);
	$('#SD'+p).val(AP[p].SpDefence);
	$('#speed'+p).val(AP[p].Speed);

	$('#DP'+p).val(AP[p].DP);
	$('#percent'+p).val('100%');

	$('#ability'+p)[0].selectize.setValue("NO");
	$('#stat'+p)[0].selectize.setValue("NO");
	$('#effect'+p)[0].selectize.setValue("NO");
	$('#hitem'+p)[0].selectize.setValue("(none)");

	Reset(sender);

	triggerEvents = true;
}

function initAP(p, poke) {
	if(poke == null) return false;

	AP[p] = JSON.parse(JSON.stringify(poke));

	AP[p].Attack_Modded = AP[p].Attack;
	AP[p].Defence_Modded = AP[p].Defence;
	AP[p].SpAttack_Modded = AP[p].SpAttack;
	AP[p].SpDefence_Modded = AP[p].SpDefence;
	AP[p].Speed_Modded = AP[p].Speed;

	AP[p].Attack_Calced = AP[p].Attack;
	AP[p].Defence_Calced = AP[p].Defence;
	AP[p].SpAttack_Calced = AP[p].SpAttack;
	AP[p].SpDefence_Calced = AP[p].SpDefence;
	AP[p].Speed_Calced = AP[p].Speed;

	AP[p].AS = AP[p].DS = AP[p].SAS = AP[p].SDS = AP[p].SS = 1;
	AP[p].DP = AP[p].HP;

	//AP[p].Ability = AP[p].Status = AP[p].Effect = AP[p].Item = "NO";

	return true;
}

function emptyPoke() {
	var empty = "";

	empty.Name = "(none)";
	empty.TypeA = "NO";
	empty.TypeB = "NO";
	empty.Attack = 0;
	empty.Defence = 0;
	empty.SpAttack = 0;
	empty.SpDefence = 0;
	empty.Speed = 0;
	empty.HP = 0;

	return empty;
}

function setAPval(sender) {
	if(!triggerEvents) return;

	if(sender.id.substring(0,4) == "type") {
		var ab = sender.id[sender.id.length-1];
		var p = sender.id[sender.id.length-2];

		switch(ab) {
			case 'A': AP[p].TypeA = $(sender).val(); break;
			case 'B': AP[p].TypeB = $(sender).val(); break;
			default: break;
		}
	}
	else {
		var p = sender.id[sender.id.length-1];
		var field = sender.id.substring(0, sender.id.length-1);

		switch(field) {
			case 'gender': AP[p].Gender = $(sender).val(); break;
			case 'ability': AP[p].Ability = $(sender).val(); break;
			case 'stat': AP[p].Status = $(sender).val(); break;
			case 'effect': AP[p].Effect = $(sender).val(); break;
			case 'hitem': AP[p].Item = $(sender).val(); break;
			case 'attack': AP[p].Attack_Modded = $(sender).val(); statMod(document.getElementById('AS'+p)); break;
			case 'AS': AP[p].AS = $(sender).val(); break;
			case 'defence': AP[p].Defence_Modded = $(sender).val(); statMod(document.getElementById('DS'+p)); break;
			case 'DS': AP[p].DS = $(sender).val(); break;
			case 'SA': AP[p].SpAttack_Modded = $(sender).val(); statMod(document.getElementById('SAS'+p)); break;
			case 'SAS': AP[p].SAS = $(sender).val(); break;
			case 'SD': AP[p].SpDefence_Modded = $(sender).val(); statMod(document.getElementById('SDS'+p)); break;
			case 'SDS': AP[p].SDS = $(sender).val(); break;
			case 'speed': AP[p].Speed_Modded = $(sender).val(); statMod(document.getElementById('SS'+p)); break;
			case 'SS': AP[p].SS = $(sender).val(); break;
			case 'HP': AP[p].HP = AP[p].DP = $(sender).val(); break;
			default: break;
		}
	}
}

function PopulateLists() {
	console.log("populating lists");
	//Pokemon
	$.ajax({
		async: false, type: 'GET', url: '/pokemonurpg-dot-com/calcs/resources/Pokemon.csv', success: function (data) {
			PokemonList = $.csv.toObjects(data);

			for(var i = 0; i < PokemonList.length; i++)
			{
				var oe = "<option value='"+i+"'>"+PokemonList[i].Name+"</option>";
				$('#pokemon1, #pokemon2').append(oe);
			}
		}
	});

	//Types
	$.ajax({
		async: false, type: 'GET', url: '/pokemonurpg-dot-com/calcs/resources/Types.csv', success: function (data) {

			var Types = $.csv.toObjects(data);

			for(i = 0; i < Types.length; i++) {
				TypeList[Types[i].Code] = Types[i];
			}

			for(var i = 0; i < Types.length; i++) {
				var oe = "<option value='"+Types[i].Code+"'>"+Types[i].Name+"</option>";
				$('#type1A, #type1B, #type2A, #type2B').append(oe);
				if(i != 0)
					$('#AT1, #AT2').append(oe);
			}
		}
	});

	//Genders
	$.ajax({
		async: false, type: 'GET', url: '/pokemonurpg-dot-com/calcs/resources/Genders.csv', success: function (data) {

			var list = $.csv.toArrays(data);

			for(i = 0; i < list.length; i++) {
				var oe = "<option value='"+list[i][0]+"'>"+list[i][1]+"</option>";
				$('#gender1, #gender2').append(oe);
			}
		}
	});

	//Abilities
	$.ajax({
		async: false, type: 'GET', url: '/pokemonurpg-dot-com/calcs/resources/Abilities.csv', success: function (data) {

			var list = $.csv.toArrays(data);

			for(i = 0; i < list.length; i++) {
				var oe = "<option value='"+list[i][0]+"'>"+list[i][1]+"</option>";
				$('#ability1, #ability2').append(oe);
			}
		}
	});

	//Statuses
	$.ajax({
		async: false, type: 'GET', url: '/pokemonurpg-dot-com/calcs/resources/Statuses.csv', success: function (data) {

			var list = $.csv.toArrays(data);

			for(i = 0; i < list.length; i++) {
				var oe = "<option value='"+list[i][0]+"'>"+list[i][1]+"</option>";
				$('#stat1, #stat2').append(oe);
			}
		}
	});

	//Effects
	$.ajax({
		async: false, type: 'GET', url: '/pokemonurpg-dot-com/calcs/resources/Effects.csv', success: function (data) {

			var list = $.csv.toArrays(data);

			for(i = 0; i < list.length; i++) {
				var oe = "<option value='"+list[i][0]+"'>"+list[i][1]+"</option>";
				$('#effect1, #effect2').append(oe);
			}
		}
	});

	//Stat mods
	$.ajax({
		async: false, type: 'GET', url: '/pokemonurpg-dot-com/calcs/resources/Statmods.csv', success: function (data) {

			var list = $.csv.toArrays(data);

			for(i = 0; i < list.length; i++) {
				var oe = "<option value='"+list[i][0]+"'>"+list[i][1]+"</option>";
				$('#AS1, #DS1, #SAS1, #SDS1, #SS1, #AS2, #DS2, #SAS2, #SDS2, #SS2').append(oe);
			}
		}
	});
	$('#AS1, #DS1, #SAS1, #SDS1, #SS1, #AS2, #DS2, #SAS2, #SDS2, #SS2').val(1);

	//Items
	$.ajax({
		async: false, type: 'GET', url: '/pokemonurpg-dot-com/calcs/resources/Items.csv', success: function (data) {

			var list = $.csv.toArrays(data);

			for(i = 0; i < list.length; i++) {
				if(list[i][0].charAt(list[i][0].length-1) == '*')
					oe = "<option value='"+list[i][0].substring(0, list[i][0].length - 2)+"'>"+list[i][0]+"</option>";
				else
					oe = "<option value='"+list[i][0]+"'>"+list[i][0]+"</option>";
				$('#hitem1, #hitem2').append(oe);
			}
		}
	});

	ConfigureSelectize();
	ConfigureTeamStorage();
}

function ConfigureSelectize() {
	$('select:not(.site-header select)').selectize({
		selectOnTab: true,
		onChange: function() { document.activeElement.blur(); }
	});
}

function ConfigureTeamStorage() {
	$('.storageRow > input').attr('readonly','true');
}

function Damage_Recovery(sender) {
	var p = sender.id[sender.id.length-1];

	newDP = parseFloat($('#DP'+p).val()) + parseInt($('#ED'+p).val());

	if(parseInt(newDP) > parseInt(AP[p].HP))
		newDP = AP[p].HP;

	AP[p].DP = newDP;
	$('#DP'+p).val(AP[p].DP);
	$('#percent'+p).val(parseFloat(.01 * Math.floor(AP[p].DP / AP[p].HP * 10000)).toFixed(2) + "%");
}

function Percents(sender)
{
	var p = sender.id[sender.id.length-1];

	newDP = parseFloat($('#DP'+p).val()) + parseInt(parseFloat($('#ED'+p).val()) * .01 * AP[p].HP);

	if(parseInt(newDP) > parseInt(AP[p].HP))
		newDP = AP[p].HP;

	AP[p].DP = newDP;
	$('#DP'+p).val(AP[p].DP);
	$('#percent'+p).val(parseFloat(.01 * Math.floor(AP[p].DP / AP[p].HP * 10000)).toFixed(2) + "%");
}

function speed_stats()
{
	if(!triggerEvents) return;

	var speedvar = 1;
	var par = 1;
	var IMS = 1;

	if(AP[1] != null && AP[1] != emptyPoke()) {
		if(AP[1].Status == "PAR" && AP[1].Ability != "QF")
			par *= 0.5;

		//Ability Mods
		if(AP[1].Ability == "CL" && ($('#weather').val() == "SUN" || $('#weather').val() == "HSUN") && AP[2].Ability != "CN" && AP[2].Ability != "AI")
			speedvar = 2;
		else if(AP[1].Ability == "SWS" && ($('#weather').val() == "RAIN" || $('#weather').val() == "HRAIN") && AP[2].Ability != "CN" && AP[2].Ability != "AI")
			speedvar = 2;
		else if(AP[1].Ability == "SRH" && $('#weather').val() == "SAND" && AP[2].Ability != "CN" && AP[2].Ability != "AI")
			speedvar = 2;
		else if(AP[1].Ability == "SLR" && $('#weather').val() == "HAIL" && AP[2].Ability != "CN" && AP[2].Ability != "AI")
			speedvar = 2;
		else if(AP[1].Ability == "QF" && AP[1].Status != "NO")
			speedvar = 1.5;

		//Item Mods
		if (AP[1].Item == "Choice Scarf" && AP[1].Ability != "KL")
			IMS = 1.5;
		if ((AP[1].Item == "Iron Ball" || AP[1].Item == "Macho Brace" ||
			AP[1].Item == "Power Anklet" || AP[1].Item == "Power Band" ||
			AP[1].Item == "Power Belt" || AP[1].Item == "Power Brace" ||
			AP[1].Item == "Power Lens" || AP[1].Item == "Power Weight")
			&& AP[1].Ability != "KL")
			IMS = .5;

		$('#speed1').val(Math.floor(AP[1].Speed_Modded * parseFloat(AP[1].SS) * speedvar * par * IMS));
	}

	var speedvar = 1;
	var par = 1;
	var IMS = 1;

	if(AP[2] != null && AP[2] != emptyPoke()) {
		if(AP[2].Status == "PAR" && AP[2].Ability != "QF")
			par = 0.5;

		//Ability Mods
		else if(AP[2].Ability == "CL" && ($('#weather').val() == "SUN" || $('#weather').val() == "HSUN") && AP[1].Ability != "CN" && AP[1].Ability != "AI")
			speedvar = 2;
		else if(AP[2].Ability == "SWS" && ($('#weather').val() == "RAIN" || $('#weather').val() == "HRAIN") && AP[1].Ability != "CN" && AP[1].Ability != "AI")
			speedvar = 2;
		else if(AP[2].Ability == "SRH" && $('#weather').val() == "SAND" && AP[1].Ability != "CN" && AP[1].Ability != "AI")
			speedvar = 2;
		else if(AP[2].Ability == "SLR" && $('#weather').val() == "HAIL" && AP[1].Ability != "CN" && AP[1].Ability != "AI")
			speedvar = 2;
		else if(AP[2].Ability == "QF" && AP[2].Status != "NO")
			speedvar = 1.5;

		//Item Mods
		if (AP[2].Item == "Choice Scarf" && AP[2].Ability != "KL")
			IMS = 1.5;
		if ((AP[2].Item == "Iron Ball" || AP[2].Item == "Macho Brace" ||
			AP[2].Item == "Power Anklet" || AP[2].Item == "Power Band" ||
			AP[2].Item == "Power Belt" || AP[2].Item == "Power Brace" ||
			AP[2].Item == "Power Lens" || AP[2].Item == "Power Weight")
			&& AP[2].Ability != "KL")
			IMS = .5;

		$('#speed2').val(Math.floor(AP[2].Speed_Modded * parseFloat(AP[2].SS) * speedvar * par * IMS));
	}
}

function statMod(sender)
{
	var p = sender.id[sender.id.length-1];
	var stat = sender.id.substring(0, sender.id.length-1);

	switch(stat) {
		case "AS":
			$('#attack'+p).val(Math.floor(AP[p].Attack_Modded * parseFloat(AP[p].AS)));
			break;
		case "DS":
			$('#defence'+p).val(Math.floor(AP[p].Defence_Modded * parseFloat(AP[p].DS)));
			break;
		case "SAS":
			$('#SA'+p).val(Math.floor(AP[p].SpAttack_Modded * parseFloat(AP[p].SAS)));
			break;
		case "SDS":
			$('#SD'+p).val(Math.floor(AP[p].SpDefence_Modded * parseFloat(AP[p].SDS)));
			break;
		default:
			return;
	};
}

function DP_on_change(sender)
{
	var p = sender.id[sender.id.length-1];

	newDP = Math.floor($('#DP'+p).val());
	if(parseInt(newDP) > parseInt(AP[p].HP))
		newDP = AP[p].HP;

	AP[p].DP = newDP;
	$('#DP'+p).val(AP[p].DP);
	$('#percent'+p).val(parseFloat(.01 * Math.floor(AP[p].DP / AP[p].HP * 10000)).toFixed(2) + "%");
}

function Percent_on_change(sender)
{
	var p = sender.id[sender.id.length-1];

	newPercent = parseFloat($('#percent'+p).val());

	if(newPercent > 100)
		newPercent = 100;

	AP[p].DP = Math.round((parseFloat(newPercent) * .01) * parseInt(AP[p].HP));
	$('#DP'+p).val(AP[p].DP);
	$('#percent'+p).val(parseFloat(.01 * Math.floor(AP[p].DP / AP[p].HP * 10000)).toFixed(2) + "%");
}

function Conf_me(sender)
{
	var p = sender.id[sender.id.length-1];

	var tempDamage = Math.floor(-Math.floor(Math.floor((Math.floor(42 * (AP[p].Attack_Modded * AP[p].AS) * 40 / (AP[p].Defence_Modded * AP[p].DS)) * 1 / 50) + 2) * (1 * 1 * (((236/255) * 100) / 100)) * 1.0 * 1.0 * 1));

	AP[p].DP = parseInt(AP[p].DP) + tempDamage;

	$('#damage'+p).val(tempDamage);
	$('#DP'+p).val(AP[p].DP);
	$('#percent'+p).val(parseFloat(.01 * Math.floor(AP[p].DP / AP[p].HP * 10000)).toFixed(2) + "%");
}

function six_it(sender)
{
	var p = sender.id[sender.id.length-1];
	var mod = sender.id.substring(0, sender.id.length-1);

	var amount = 0.0625;
	var tempDamage = 0;

	switch (mod) {
		case "nsix": tempDamage = Math.floor(AP[p].HP * amount); break;
		case "ntwelve": tempDamage = Math.floor(AP[p].HP * (amount*2)); break;
		case "psix": tempDamage = -Math.floor(AP[p].HP * amount); break;
		case "ptwelve": tempDamage = -Math.floor(AP[p].HP * (amount*2)); break;
		case "sub": tempDamage = Math.floor(AP[p].HP * (amount*4)); break;
		default: break;
	}

	$('#damage'+p).val(tempDamage);

	newDP = parseInt(AP[p].DP) - tempDamage;

	if(parseInt(newDP) > parseInt(AP[p].HP))
		newDP = AP[p].HP;

	AP[p].DP = newDP;
	$('#DP'+p).val(AP[p].DP);
	$('#percent'+p).val(parseFloat(.01 * Math.floor(AP[p].DP / AP[p].HP * 10000)).toFixed(2) + "%");
}

function Calculate_Attack(sender)
{
	var a = sender.id[sender.id.length-1];
	var d = (a == 1 ? 2: 1);

	Attacker = AP[a];
	Defender = AP[d];

	var BasePower = $('#BP'+a).val();
	var AttackType = $('#AT'+a).val();
	var OriginalType = AttackType;
	var AttackClass = $('#AC'+a).val();
	var Crit = $('#CH'+a).val();
	var weather = $('#weather').val();

	var STAB = 1.0;
	var CritMod = 1.0;
	var tempDamage = 0;
	var tempDP = 0;
	var Compatibility = 1.0;

	if(Attacker.Ability == "NZ") // Normalize makes type normal
		AttackType = "NM";
	if(Attacker.Ability == "AE" && AttackType == "NM") // Aerialate makes Normal moves Flying
		AttackType = "FL";
	if(Attacker.Ability == "PX" && AttackType == "NM") //Pixilate makes Normal moves Fairy
		AttackType = "FA";
	if(Attacker.Ability == "RF" && AttackType == "NM") //Refrigerate makes Normal moves Ice
		AttackType = "I";
	if(Attacker.Ability == "GV" && AttackType == "NM") //Galvanize makes Normal moves Electric
		AttackType = "E";

	Compatibility = TypeList[AttackType][Defender.TypeA] * TypeList[AttackType][Defender.TypeB];
	if(Attacker.Ability == "SCR" && (AttackType == "FI" || AttackType == "NM")) {
		if(Defender.TypeA == "GH") { Compatibility = TypeList[AttackType][Defender.TypeB]; }
		if(Defender.TypeB == "GH") { Compatibility = TypeList[AttackType][Defender.TypeA]; }
	}
	if(weather == "AIR" && Attacker.Ability != "AI" && Attacker.Ability != "CN" && Defender.Ability != "AI" && Defender.Ability != "CN") {
		if(Defender.TypeA == "FL" && TypeList[AttackType][Defender.TypeA] == 2.0) { Compatibility = TypeList[AttackType][Defender.TypeB]; }
		if(Defender.TypeB == "FL" && TypeList[AttackType][Defender.TypeB] == 2.0) { Compatibility = TypeList[AttackType][Defender.TypeA]; }
	}

	var IT = 1;
	var UA = 1;
	var FA = 1;

	//Item Mods
	if(Attacker.Item == "Muscle Band" && Attacker.Ability != "KL" && (AttackClass == "N" || AttackClass == "Z")) IT = 1.1;
	if(Attacker.Item == "Wise Glasses" && Attacker.Ability != "KL" && (AttackClass == "Y" || AttackClass == "X")) IT = 1.1;
	if(Attacker.Item == "SilverPowder" && Attacker.Ability != "KL" && AttackType == "B") IT = 1.2;
	if(Attacker.Item == "Insect Plate" && Attacker.Ability != "KL" && AttackType == "B") IT = 1.2;
	if(Attacker.Item == "BlackGlasses" && Attacker.Ability != "KL" && AttackType == "DK") IT = 1.2;
	if(Attacker.Item == "Dread Plate" && Attacker.Ability != "KL" && AttackType == "DK") IT = 1.2;
	if(Attacker.Item == "Dragon Fang" && Attacker.Ability != "KL" && AttackType == "DR") IT = 1.2;
	if(Attacker.Item == "Draco Plate" && Attacker.Ability != "KL" && AttackType == "DR") IT = 1.2;
	if(Attacker.Item == "Magnet" && Attacker.Ability != "KL" && AttackType == "E") IT = 1.2;
	if(Attacker.Item == "Zap Plate" && Attacker.Ability != "KL" && AttackType == "E") IT = 1.2;
	if(Attacker.Item == "Black Belt" && Attacker.Ability != "KL" && AttackType == "FI") IT = 1.2;
	if(Attacker.Item == "Fist Plate" && Attacker.Ability != "KL" && AttackType == "FI") IT = 1.2;
	if(Attacker.Item == "Charcoal" && Attacker.Ability != "KL" && AttackType == "FR") IT = 1.2;
	if(Attacker.Item == "Flame Plate" && Attacker.Ability != "KL" && AttackType == "FR") IT = 1.2;
	if(Attacker.Item == "Sharp Beak" && Attacker.Ability != "KL" && AttackType == "FL") IT = 1.2;
	if(Attacker.Item == "Sky Plate" && Attacker.Ability != "KL" && AttackType == "FL") IT = 1.2;
	if(Attacker.Item == "Spell Tag" && Attacker.Ability != "KL" && AttackType == "GH") IT = 1.2;
	if(Attacker.Item == "Spooky Plate" && Attacker.Ability != "KL" && AttackType == "GH") IT = 1.2;
	if(Attacker.Item == "Miracle Seed" && Attacker.Ability != "KL" && AttackType == "GR") IT = 1.2;
	if(Attacker.Item == "Rose Incense" && Attacker.Ability != "KL" && AttackType == "GR") IT = 1.2;
	if(Attacker.Item == "Meadow Plate" && Attacker.Ability != "KL" && AttackType == "GR") IT = 1.2;
	if(Attacker.Item == "Soft Sand" && Attacker.Ability != "KL" && AttackType == "GD") IT = 1.2;
	if(Attacker.Item == "Earth Plate" && Attacker.Ability != "KL" && AttackType == "GD") IT = 1.2;
	if(Attacker.Item == "NeverMeltIce" && Attacker.Ability != "KL" && AttackType == "I") IT = 1.2;
	if(Attacker.Item == "Icicle Plate" && Attacker.Ability != "KL" && AttackType == "I") IT = 1.2;
	if(Attacker.Item == "Silk Scarf" && Attacker.Ability != "KL" && AttackType == "NM") IT = 1.2;
	if(Attacker.Item == "Poison Barb" && Attacker.Ability != "KL" && AttackType == "PO") IT = 1.2;
	if(Attacker.Item == "Toxic Plate" && Attacker.Ability != "KL" && AttackType == "PO") IT = 1.2;
	if(Attacker.Item == "Odd Incense" && Attacker.Ability != "KL" && AttackType == "PS") IT = 1.2;
	if(Attacker.Item == "TwistedSpoon" && Attacker.Ability != "KL" && AttackType == "PS") IT = 1.2;
	if(Attacker.Item == "Mind Plate" && Attacker.Ability != "KL" && AttackType == "PS") IT = 1.2;
	if(Attacker.Item == "Hard Stone" && Attacker.Ability != "KL" && AttackType == "R") IT = 1.2;
	if(Attacker.Item == "Rock Incense" && Attacker.Ability != "KL" && AttackType == "R") IT = 1.2;
	if(Attacker.Item == "Stone Plate" && Attacker.Ability != "KL" && AttackType == "R") IT = 1.2;
	if(Attacker.Item == "Metal Coat" && Attacker.Ability != "KL" && AttackType == "S") IT = 1.2;
	if(Attacker.Item == "Iron Plate" && Attacker.Ability != "KL" && AttackType == "S") IT = 1.2;
	if(Attacker.Item == "Mystic Water" && Attacker.Ability != "KL" && AttackType == "W") IT = 1.2;
	if(Attacker.Item == "Sea Incense" && Attacker.Ability != "KL" && AttackType == "W") IT = 1.2;
	if(Attacker.Item == "Wave Incense" && Attacker.Ability != "KL" && AttackType == "W") IT = 1.2;
	if(Attacker.Item == "Splash Plate" && Attacker.Ability != "KL" && AttackType == "W") IT = 1.2;
	if(Attacker.Item == "Pixie Plate" && Attacker.Ability != "KL" && AttackType == "FA") IT = 1.2;

	if(Attacker.Item == "Bug Gem" && Attacker.Ability != "KL" && AttackType == "B" && Compatibility != 0)
	{
		IT = 1.3;
		alert("The gem was used.");
		$('#hitem'+a)[0].selectize.setValue("(none)");
	}
	if(Attacker.Item == "Dark Gem" && Attacker.Ability != "KL" && AttackType == "DK" && Compatibility != 0)
	{
		IT = 1.3;
		alert("The gem was used.");
		$('#hitem'+a)[0].selectize.setValue("(none)");
	}
	if(Attacker.Item == "Dragon Gem" && Attacker.Ability != "KL" && AttackType == "DR" && Compatibility != 0)
	{
		IT = 1.3;
		alert("The gem was used.");
		$('#hitem'+a)[0].selectize.setValue("(none)");
	}
	if(Attacker.Item == "Electric Gem" && Attacker.Ability != "KL" && AttackType == "E" && Compatibility != 0)
	{
		IT = 1.3;
		alert("The gem was used.");
		$('#hitem'+a)[0].selectize.setValue("(none)");
	}
	if(Attacker.Item == "Fighting Gem" && Attacker.Ability != "KL" && AttackType == "FI" && Compatibility != 0)
	{
		IT = 1.3;
		alert("The gem was used.");
		$('#hitem'+a)[0].selectize.setValue("(none)");
	}
	if(Attacker.Item == "Fire Gem" && Attacker.Ability != "KL" && AttackType == "FR" && Compatibility != 0)
	{
		IT = 1.3;
		alert("The gem was used.");
		$('#hitem'+a)[0].selectize.setValue("(none)");
	}
	if(Attacker.Item == "Flying Gem" && Attacker.Ability != "KL" && AttackType == "FL" && Compatibility != 0)
	{
		IT = 1.3;
		alert("The gem was used.");
		$('#hitem'+a)[0].selectize.setValue("(none)");
	}
	if(Attacker.Item == "Ghost Gem" && Attacker.Ability != "KL" && AttackType == "GH" && Compatibility != 0)
	{
		IT = 1.3;
		alert("The gem was used.");
		$('#hitem'+a)[0].selectize.setValue("(none)");
	}
	if(Attacker.Item == "Grass Gem" && Attacker.Ability != "KL" && AttackType == "GR" && Compatibility != 0)
	{
		IT = 1.3;
		alert("The gem was used.");
		$('#hitem'+a)[0].selectize.setValue("(none)");
	}
	if(Attacker.Item == "Ground Gem" && Attacker.Ability != "KL" && AttackType == "GD" && Compatibility != 0)
	{
		IT = 1.3;
		alert("The gem was used.");
		$('#hitem'+a)[0].selectize.setValue("(none)");
	}
	if(Attacker.Item == "Ice Gem" && Attacker.Ability != "KL" && AttackType == "I" && Compatibility != 0)
	{
		IT = 1.3;
		alert("The gem was used.");
		$('#hitem'+a)[0].selectize.setValue("(none)");
	}
	if(Attacker.Item == "Normal Gem" && Attacker.Ability != "KL" && AttackType == "NM" && Compatibility != 0)
	{
		IT = 1.3;
		alert("The gem was used.");
		$('#hitem'+a)[0].selectize.setValue("(none)");
	}
	if(Attacker.Item == "Poison Gem" && Attacker.Ability != "KL" && AttackType == "PO" && Compatibility != 0)
	{
		IT = 1.3;
		alert("The gem was used.");
		$('#hitem'+a)[0].selectize.setValue("(none)");
	}
	if(Attacker.Item == "Psychic Gem" && Attacker.Ability != "KL" && AttackType == "PS" && Compatibility != 0)
	{
		IT = 1.3;
		alert("The gem was used.");
		$('#hitem'+a)[0].selectize.setValue("(none)");
	}
	if(Attacker.Item == "Rock Gem" && Attacker.Ability != "KL" && AttackType == "R" && Compatibility != 0)
	{
		IT = 1.3;
		alert("The gem was used.");
		$('#hitem'+a)[0].selectize.setValue("(none)");
	}
	if(Attacker.Item == "Steel Gem" && Attacker.Ability != "KL" && AttackType == "S" && Compatibility != 0)
	{
		IT = 1.3;
		alert("The gem was used.");
		$('#hitem'+a)[0].selectize.setValue("(none)");
	}
	if(Attacker.Item == "Bug Gem" && Attacker.Ability != "KL" && AttackType == "W" && Compatibility != 0)
	{
		IT = 1.3;
		alert("The gem was used.");
		$('#hitem'+a)[0].selectize.setValue("(none)");
	}

	//Ability Mods
	var thirty = Attacker.HP * (1/3);

	if(Attacker.Ability == "RI" && Attacker.Gender == Defender.Gender) UA = 1.25;
	if(Attacker.Ability == "RI" && Attacker.Gender != Defender.Gender) UA = .75;
	if(Attacker.Ability == "RI" && (Attacker.Gender == "X" || Defender.Gender == "X")) UA = 1;
	if(Attacker.Ability == "BL" && AttackType == "FR" && $('#DP'+a).val() < thirty) UA = 1.5;
	if(Attacker.Ability == "OG" && AttackType == "GR" && $('#DP'+a).val() < thirty) UA = 1.5;
	if(Attacker.Ability == "TO" && AttackType == "W" && $('#DP'+a).val() < thirty) UA = 1.5;
	if(Attacker.Ability == "SWA" && AttackType == "B" && $('#DP'+a).val() < thirty) UA = 1.5;
	if(Attacker.Ability == "TE" && BasePower <= 60 ) UA = 1.5;
	if(Attacker.Ability == "SF" && weather == "SAND" && (AttackType == "GD" || AttackType == "R" || AttackType == "S")) UA = 1.3;
	if(Attacker.Ability == "WB" && AttackType == "W") UA = 2.0;
	if(Attacker.Ability == "STW" && AttackType == "S") UA = 1.5;
	if(Attacker.Ability == "DM" && AttackType == "DR") UA = 1.5;
	if(Attacker.Ability == "TS" && AttackType == "E") UA = 1.5;
	//Dark Aura and Fairy Aura
	if(Attacker.Ability == "DK" && AttackType == "DK" && Defender.Ability != "AU") UA = 1.33333;
	if(Attacker.Ability == "FA" && AttackType == "FA" && Defender.Ability != "AU") UA = 1.33333;
	//Aerialte, Pixilate and Refrigerate - Type has been changed, so check OriginalType (OT)
	if(Attacker.Ability == "NZ" && AttackType == "NM" && OriginalType != "NM") UA = 1.2;
	if(Attacker.Ability == "AE" && AttackType == "FL" && OriginalType == "NM") UA = 1.2;
	if(Attacker.Ability == "PX" && AttackType == "FA" && OriginalType == "NM") UA = 1.2;
	if(Attacker.Ability == "RF" && AttackType == "I" && OriginalType == "NM") UA = 1.2;
	if(Attacker.Ability == "GV" && AttackType == "E" && OriginalType == "NM") UA = 1.2;

	if(Defender.Ability == "TH" && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU" && (AttackType == "FR" || AttackType == "I" )) FA = 0.5;
	if(Defender.Ability == "HE" && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU" && AttackType == "FR") FA = 0.5;
	if(Defender.Ability == "DS" && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU" && AttackType == "FR") FA = 1.25;
	if(Attacker.Ability == "DK" && AttackType == "DK" && Defender.Ability == "AU") UA = 0.66667;
	if(Attacker.Ability == "FA" && AttackType == "FA" && Defender.Ability == "AU") UA = 0.66667;

	//Calculate the Modified BasePower
	BasePower = Math.floor(BasePower * IT * UA * FA);

	//Stat Mods
	var PAM = 1;
	var SAM = 1;
	var PIM = 1;
	var SIM = 1;
	var PDAM = 1;
	var SDAM = 1;
	var PDIM = 1;
	var SDIM = 1;
	var SDWM = 1;

	// Abilities that change the Attack stat
	if(Attacker.Ability == "HP" || Attacker.Ability == "PU")
		PAM = 2;
	if(Attacker.Ability == "GU" && Attacker.Status != "NO")
		PAM = 1.5;
	if(Attacker.Ability == "TB" && (Attacker.Status == "PSN"))
		PAM = 1.5;
	if(Attacker.Ability == "FG" && (weather == "SUN" || weather == "HSUN") && Defender.Ability != "CN" && Defender.Ability != "AI")
		PAM = 1.5;
	if(Attacker.Ability == "HU" || Attacker.Ability == "GT")
		PAM = 1.5;
	if(Attacker.Ability == "FFO" && (AttackClass == "N" || AttackClass == "X") && AttackType == "FR")
		PAM = 1.5;
	if(Attacker.Ability == "DE" && $('#DP'+a).val() < (Attacker.HP / 2))
		PAM = 0.5 ;

	// Abilities that change the Special Attack stat
	if(Attacker.Ability == "SP" && (weather == "SUN" || weather == "HSUN") && Defender.Ability != "CN" && Defender.Ability != "AI")
		SAM = 1.5;
	if(Attacker.Ability == "FT" && (Attacker.Status == "BRN" ))
		SAM = 1.5;
	if(Attacker.Ability == "FFO" && (AttackClass == "Y" || AttackClass == "Z") && AttackType == "FR")
		SAM = 1.5;
	if(Attacker.Ability == "DE" && $('#DP'+a).val() < (Attacker.HP / 2))
		SAM = 0.5;


	// Items that change the Attack stat
	if(Attacker.Item == "Choice Band" && Attacker.Ability != "KL")
		PIM = 1.5;
	if(Attacker.Item == "Light Ball" && Attacker.Ability != "KL" && Attacker.Name == "Pikachu")
		PIM = 2;
	if(Attacker.Item == "Thick Club" && Attacker.Ability != "KL" && (Attacker.Name == "Cubone" || Attacker.Name == "Marowak" || Attacker.Name == "Marowak-Alolan"))
		PIM = 2;

	// Items that change the Special Attack stat
	if(Attacker.Item == "Choice Specs" && Attacker.Ability != "KL")
		SIM = 1.5;
	if(Attacker.Item == "Light Ball" && Attacker.Ability != "KL" && Attacker.Name == "Pikachu")
		SIM = 2;
	if(Attacker.Item == "Deepseatooth" && Attacker.Ability != "KL" && Attacker.Name == "Clamperl")
		SIM = 2;

	// Items that change the Defence stat
	if(Defender.Ability == "MS" && Defender.Status != "NO")
		PDAM = 1.5;

	// Items that change the Special Defence stat
	if(weather == "SAND" && (Attacker.Ability !=  "CN" || Defender.Ability != "CN") && (Attacker.Ability !=  "AI" || Defender.Ability != "AI") && (Defender.TypeA == "R" || Defender.TypeB == "R"))
		SDWM = 1.5;

	if(Defender.Ability == "FG" && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU" && (weather == "SUN" || weather == "HSUN") && Attacker.Ability != "CN" && Attacker.Ability != "AI")
		SDAM = 1.5;

	if(Defender.Item == "Deepseascale" && Defender.Ability != "KL" && Defender.Name == "Clamperl")
		SDIM = 2;
	if(Defender.Item == "Assault Vest" && Defender.Ability != "KL")
		SDIM = 1.5;

	//Eviolite modifiers
	if(Defender.Item == "Eviolite" && Defender.Ability != "KL")
		PDIM = 1.5;
	if(Defender.Item == "Eviolite" && Defender.Ability != "KL")
		SDIM = 1.5;

	//Stats calculation
	Attacker.Attack_Calced = Math.floor(Attacker.Attack_Modded * Attacker.AS * PAM * PIM);
	if ((Crit == "Y" && Attacker.AS < 1) || (Defender.Ability == "UB" && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU"))
		Attacker.Attack_Calced = Math.floor(Attacker.Attack_Modded * PAM * PIM);
	Attacker.SpAttack_Calced = Math.floor(Attacker.SpAttack_Modded * Attacker.SAS * SAM * SIM);
	if ((Crit == "Y" && Attacker.SAS < 1) || (Defender.Ability == "UB" && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU"))
		Attacker.SpAttack_Calced = Math.floor(Attacker.SpAttack_Modded * SAM * SIM);

	Defender.Defence_Calced = Math.floor(Defender.Defence_Modded * Defender.DS * PDAM * PDIM);
	if ((Crit == "Y" && Defender.DS > 1) || (Attacker.Ability == "UB"))
		Defender.Defence_Calced = Math.floor(Defender.Defence_Modded * PDAM * PDIM);

	Defender.SpDefence_Calced = Math.floor(Defender.SpDefence_Modded * Defender.SDS * SDAM * SDIM * SDWM);
	if ((Crit == "Y" && Defender.SDS > 1) || (Attacker.Ability == "UB"))
		Defender.SpDefence_Calced = Math.floor(Defender.SpDefence_Modded * SDAM * SDIM * SDWM);

	// The First Modifier to the Damage Formula
	var Modone = 1 ;
	var BRN = 1 ;
	var RL = 1 ;
	var SR = 1 ;
	var MS = 1 ;

	if(Attacker.Status == "BRN" && (AttackClass == "N" || AttackClass == "Z") && Attacker.Ability != "GU")
		BRN = .5;
	if(Defender.Effect == "Reflect" &&
		(AttackClass == "N" || AttackClass == "Z") && Crit != "Y" && Attacker.Ability != "II")
			RL = 0.5;
	if(Defender.Effect == "Light Screen" &&
		(AttackClass == "Y" || AttackClass == "X") && Crit != "Y" && Attacker.Ability != "II")
			RL = 0.5;
	if((weather == "SUN" || weather == "HSUN") &&
		(Attacker.Ability !=  "CN" || Defender.Ability != "CN") &&
		(Attacker.Ability !=  "AI" || Defender.Ability != "AI") &&
		AttackType == "FR")
			SR = 1.5;
	if((weather == "SUN" || weather == "HSUN") &&
		(Attacker.Ability !=  "CN" || Defender.Ability != "CN") &&
		(Attacker.Ability !=  "AI" || Defender.Ability != "AI") &&
		AttackType == "W")
			SR = 0.5;
	if((weather == "RAIN" || weather == "HRAIN") &&
		(Attacker.Ability !=  "CN" || Defender.Ability != "CN") &&
		(Attacker.Ability !=  "AI" || Defender.Ability != "AI") &&
		AttackType == "FR")
			SR = 0.5;
	if((weather == "RAIN" || weather == "HRAIN") &&
		(Attacker.Ability !=  "CN" || Defender.Ability != "CN") &&
		(Attacker.Ability !=  "AI" || Defender.Ability != "AI") &&
		AttackType == "W")
			SR = 1.5;
	if (Defender.Ability == "MT"  && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU" && (Defender.DP == Defender.HP))
		MS = 0.5;
	if (Defender.Ability == "SSH" && (Defender.DP == Defender.HP))
		MS = 0.5;

	//Modone calculation
	Modone = BRN * RL * SR * MS;

	// The Second Modifier to the Damage Formula
	var Modtwo = 1;
	var LO = 1;
	var MF = 1;

	if(Attacker.Item == "Life Orb" && Attacker.Ability != "KL")
		LO = 1.3;
	if(Attacker.Effect == "Me First")
	{
		MF = 1.5;
		$('#effect'+a)[0].selectize.setValue("NO");
	}

	// Modtwo calculation
	Modtwo = LO * MF ;

	// The Third Modifier to the Damage Formula
	var Modthree = 1;
	var SRF = 1;
	var EB = 1;
	var TRB = 1;
	var TL = 1;
	var CH = 1;

	if((Defender.Ability == "SR" || Defender.Ability == "FI") && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU" && Compatibility > 1)
		SRF = .75;
	if(Defender.Ability == "PA" && Compatibility > 1)
		SRF = .75;

	if(Attacker.Item == "Expert Belt" && Compatibility > 1)
		EB = 1.2;

	if(Attacker.Ability != "UV")
	{
		// TRB BUG
		if(Defender.Item == "Tanga Berry" && Defender.Ability != "KL" && AttackType == "B" && Compatibility > 1)
		{
			TRB = .5; alert("The berry was used.");
			$('#hitem'+d)[0].selectize.setValue("(none)");
		}

		// TRB DARK
		if(Defender.Item == "Colbur Berry" && Defender.Ability != "KL" && AttackType == "DK" && Compatibility > 1)
		{
			TRB = .5; alert("The berry was used.");
			$('#hitem'+d)[0].selectize.setValue("(none)");
		}

		// TRB DRAGON
		if(Defender.Item == "Haban Berry" && Defender.Ability != "KL" && AttackType == "DR" && Compatibility > 1)
		{
			TRB = .5; alert("The berry was used.");
			$('#hitem'+d)[0].selectize.setValue("(none)");
		}

		// TRB ELECTRIC
		if(Defender.Item == "Wacan Berry" && Defender.Ability != "KL" && AttackType == "E" && Compatibility > 1)
		{
			TRB = .5; alert("The berry was used.");
			$('#hitem'+d)[0].selectize.setValue("(none)");
		}

		// TRB FAIRY
		if(Defender.Item == "Roseli Berry" && Defender.Ability != "KL" && AttackType == "FA" && Compatibility > 1)
		{
			TRB = .5; alert("The berry was used.");
			$('#hitem'+d)[0].selectize.setValue("(none)");
		}

		// TRB FIGHTING
		if(Defender.Item == "Chople Berry" && Defender.Ability != "KL" && AttackType == "FI" && Compatibility > 1)
		{
			TRB = .5; alert("The berry was used.");
			$('#hitem'+d)[0].selectize.setValue("(none)");
		}

		// TRB FIRE
		if(Defender.Item == "Occa Berry" && Defender.Ability != "KL" && AttackType == "FR" && Compatibility > 1)
		{
			TRB = .5; alert("The berry was used.");
			$('#hitem'+d)[0].selectize.setValue("(none)");
		}

		// TRB FLYING
		if(Defender.Item == "Coba Berry" && Defender.Ability != "KL" && AttackType == "FL" && Compatibility > 1)
		{
			TRB = .5; alert("The berry was used.");
			$('#hitem'+d)[0].selectize.setValue("(none)");
		}

		// TRB GHOST
		if(Defender.Item == "Kasib Berry" && Defender.Ability != "KL" && AttackType == "GH" && Compatibility > 1)
		{
			TRB = .5; alert("The berry was used.");
			$('#hitem'+d)[0].selectize.setValue("(none)");
		}

		// TRB GRASS
		if(Defender.Item == "Rindo Berry" && Defender.Ability != "KL" && AttackType == "GR" && Compatibility > 1)
		{
			TRB = .5; alert("The berry was used.");
			$('#hitem'+d)[0].selectize.setValue("(none)");
		}

		// TRB GROUND
		if(Defender.Item == "Shuca Berry" && Defender.Ability != "KL" && AttackType == "GD" && Compatibility > 1)
		{
			TRB = .5; alert("The berry was used.");
			$('#hitem'+d)[0].selectize.setValue("(none)");
		}

		// TRB ICE
		if(Defender.Item == "Yache Berry" && Defender.Ability != "KL" && AttackType == "I" && Compatibility > 1)
		{
			TRB = .5; alert("The berry was used.");
			$('#hitem'+d)[0].selectize.setValue("(none)");
		}

		// TRB NORMAL
		if(Defender.Item == "Chilan Berry " && Defender.Ability != "KL" && AttackType == "NM" && Compatibility > 1)
		{
			TRB = .5; alert("The berry was used.");
			$('#hitem'+d)[0].selectize.setValue("(none)");
		}

		// TRB POISON
		if(Defender.Item == "Kebia Berry" && Defender.Ability != "KL" && AttackType == "PO" && Compatibility > 1)
		{
			TRB = .5; alert("The berry was used.");
			$('#hitem'+d)[0].selectize.setValue("(none)");
		}

		// TRB PSYCHIC
		if(Defender.Item == "Payapa Berry" && Defender.Ability != "KL" && AttackType == "PS" && Compatibility > 1)
		{
			TRB = .5; alert("The berry was used.");
			$('#hitem'+d)[0].selectize.setValue("(none)");
		}

		// TRB ROCK
		if(Defender.Item == "Charti Berry" && Defender.Ability != "KL" && AttackType == "R" && Compatibility > 1)
		{
			TRB = .5; alert("The berry was used.");
			$('#hitem'+d)[0].selectize.setValue("(none)");
		}

		// TRB STEEL
		if(Defender.Item == "Babiri Berry" && Defender.Ability != "KL" && AttackType == "S" && Compatibility > 1)
		{
			TRB = .5; alert("The berry was used.");
			$('#hitem'+d)[0].selectize.setValue("(none)");
		}

		// TRB WATER
		if(Defender.Item == "Passho Berry" && Defender.Ability != "KL" && AttackType == "W" && Compatibility > 1)
		{
			TRB = .5; alert("The berry was used.");
			$('#hitem'+d)[0].selectize.setValue("(none)");
		}
	}

	// Critical Hit calc.
	if(Crit == "Y")
		CH = 1.5;
	if(Attacker.Ability == "SN" && Crit == "Y")
		CH = 2.25;
	if(Attacker.Ability == "ME" && Defender.Status == "PSN")
		CH = 1.5;

	if(Attacker.Ability == "TL" && Compatibility < 1)
		TL = 2;

	//Modthree Calculation
	Modthree = SRF * EB * TL * TRB * CH;

	//STAB
	if(AttackType == Attacker.TypeA || AttackType == Attacker.TypeB)
	{
		STAB = 1.5 ;
		if(Attacker.Ability == "AD")
			STAB = 2;
	}

	//COMPLETE DAMAGE FORMULA
	if(AttackClass == "Y")
	{
		tempDamage = -Math.floor(Math.floor(Math.floor(Math.floor((Math.floor(Math.floor((Math.floor((Math.floor((Math.floor
		(42 * BasePower * Attacker.SpAttack_Calced / 50)) / Defender.SpDefence_Calced)) * Modone) + 2) * Modtwo) * 92.5) / 100)) * STAB) * Compatibility) * Modthree);
	}
	else if(AttackClass == "N")
	{
		tempDamage = -Math.floor(Math.floor(Math.floor(Math.floor((Math.floor(Math.floor((Math.floor((Math.floor((Math.floor
		(42 * BasePower * Attacker.Attack_Calced / 50)) / Defender.Defence_Calced)) * Modone) + 2) * Modtwo) * 92.5) / 100)) * STAB) * Compatibility) * Modthree);
	}
	else if(AttackClass == "X")
	{
		tempDamage = -Math.floor(Math.floor(Math.floor(Math.floor((Math.floor(Math.floor((Math.floor((Math.floor((Math.floor
		(42 * BasePower * Attacker.SpAttack_Calced / 50)) / Defender.Defence_Calced)) * Modone) + 2) * Modtwo) * 92.5) / 100)) * STAB) * Compatibility) * Modthree);
	}
	else if(AttackClass == "Z")
	{
		tempDamage = -Math.floor(Math.floor(Math.floor(Math.floor((Math.floor(Math.floor((Math.floor((Math.floor((Math.floor
		(42 * BasePower * Attacker.Attack_Calced / 50)) / Defender.SpDefence_Calced)) * Modone) + 2) * Modtwo) * 92.5) / 100)) * STAB) * Compatibility) * Modthree);
	}

	//Fur Coat
	if(Defender.Ability == "FU" && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU" && AttackClass == "N")
		tempDamage = Math.floor(tempDamage / 2);

	//Dry Skin
	if(Defender.Ability == "DS" && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU" && AttackType == "W")
		tempDamage = Math.floor(Defender.HP / 4);

	//Volt Absorb
	if(Defender.Ability == "VA" && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU" && AttackType == "E")
	{
		if (Defender.TypeA == "GD" || Defender.TypeB == "GD")
			tempDamage = 0;
		else
			tempDamage = Math.floor(Defender.HP / 4);
	}

	//Water Absorb
	if(Defender.Ability == "WA" && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU" && AttackType == "W")
		tempDamage = Math.floor(Defender.HP / 4);

	//Water Bubble, reduced damage from Fire
	if(Defender.Ability == "WB" && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU" && AttackType == "FR")
		tempDamage = Math.floor(tempDamage / 2);

	//Harsh Sunlight, water moves fail
	if(weather == "HSUN" && AttackType == "W")
		tempDamage = 0;

	//Heavy Rain, fire moves fail
	if(weather == "HRAIN" && AttackType == "FR")
		tempDamage = 0;

	//Flash Fire on, no damage when hit by fire.
	if(Defender.Ability == "FFO" && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU" && AttackType == "FR")
		tempDamage = 0;

	//Sap Sipper, no damage when hit by grass.
	if(Defender.Ability == "SPS" && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU" && AttackType == "GR")
		tempDamage = 0;

	//Storm Drain, no damage when hit by water.
	if(Defender.Ability == "STD" && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU" && AttackType == "W")
		tempDamage = 0;

	// Lightningrod, no damage when hit by electric.
	if(Defender.Ability == "LI" && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU" && AttackType == "E")
		tempDamage = 0;

	//Levitate, no damage when hit by Ground.
	if(Defender.Ability == "LE" && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU" && AttackType == "GD")
		tempDamage = 0;

	//WonderGuard, no damage when hit by anything than Super Effective
	if(Defender.Ability == "WG" && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU" && Compatibility < 2)
		tempDamage = 0;

	//Stamina - boost defence
	//if(Defender.Ability == "STM" && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU") {}

	//Water Compaction - boost defence twice if hit by Water
	//if(Defender.Ability == "WC" && Attacker.Ability != "MB" && Attacker.Ability != "TV" && Attacker.Ability != "TU" && AttackType == "W") {}


	$('#damage'+d).val(tempDamage);

	newDP = parseInt(Defender.DP) + tempDamage;
	Defender.DP = newDP;
	$('#DP'+d).val(Defender.DP);
	$('#percent'+d).val(parseFloat(.01 * Math.floor(Defender.DP / Defender.HP * 10000)).toFixed(2) + "%");
}

function displayStorage() {
	$('#storageTab').animate({'width': 400}, 400);
	$('#storageTab').animate({'height': 400}, 500);
	$('#storageTab').css('cursor','auto');
}

function hideStorage() {
	$('#storageTab').animate({'height': 30}, 500);
	$('#storageTab').animate({'width': 150}, 400);
	$('#storageTab').css('cursor','pointer');
}
