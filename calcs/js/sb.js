var PokemonList = [];

function baseHP(value) {
	return parseInt((value-110-(252/4)-31)/2);
}

function baseStat(value) {
	return parseInt((value-5-(252/4)-31)/2);
}

function levelHP(level, base) {
	HP = 2*base;
	HP += 31;
	HP += (252/4);
	HP *= level;
	HP /= 100;
	HP += level;
	HP += 10;

	return Math.floor(HP);
}

function levelStat(level, base) {
	stat = 2*base;
	stat += 31;
	stat += (252/4);
	stat *= level;
	stat /= 100;
	stat += 5;
	
	return Math.floor(stat);
}
function PopulateLists() {
	//Pokemon	
	$.ajax({
		async: false, type: 'GET', url: 'resources/Pokemon.csv', success: function (data) {
			
			PokemonList = $.csv.toObjects(data);
			
			PokemonList.forEach(function(item, index) {
				item["HP"] = baseHP(parseInt(item["HP"]));
				item["Attack"] = baseStat(parseInt(item["Attack"]));
				item["Defence"] = baseStat(parseInt(item["Defence"]));
				item["SpAttack"] = baseStat(parseInt(item["SpAttack"]));
				item["SpDefence"] = baseStat(parseInt(item["SpDefence"]));
				item["Speed"] = baseStat(parseInt(item["Speed"]));
				
				PokemonList[index] = item;
			});
			for(var i = 0; i < PokemonList.length; i++)
			{
				var oe = "<option value='"+i+"'>"+PokemonList[i].Name+"</option>";
				$('#pokemon1, #pokemon2').append(oe);
			}
		}
	});
	
	//Stat mods
	$.ajax({
		async: false, type: 'GET', url: 'resources/Statmods.csv', success: function (data) {
	
			var list = $.csv.toArrays(data);
			
			for(i = 0; i < list.length; i++) {				
				var oe = "<option value='"+list[i][0]+"'>"+list[i][1]+"</option>";
				$('#AS1, #DS1, #SAS1, #SDS1, #SS1, #AS2, #DS2, #SAS2, #SDS2, #SS2').append(oe);
			}	
		}
	});
	$('#AS1, #DS1, #SAS1, #SDS1, #SS1, #AS2, #DS2, #SAS2, #SDS2, #SS2').val(1);
	
	ConfigureSelectize();
}

function ConfigureSelectize() {
	$('select').selectize({ 
		selectOnTab: true,
		onChange: function() { document.activeElement.blur(); }
	});
}

function calcStatsByLevel(sender) {
	var p = sender.id[sender.id.length-1];
	var field = sender.id.substring(0, sender.id.length-1);
	var pval = $('#pokemon'+p).val();
	
	if(pval == -1) return; 

	thisPoke = JSON.parse(JSON.stringify(PokemonList[pval]));

	if(field == 'pokemon') {
		$('#Level'+p).val(1);
		$('#HP'+p).val(levelHP(1, thisPoke.HP));
		$('#CurrentHP'+p).val(levelHP(1, thisPoke.HP));
		statMod(document.getElementById('AS'+p));
		statMod(document.getElementById('DS'+p));
		statMod(document.getElementById('SAS'+p));
		statMod(document.getElementById('SDS'+p));
		statMod(document.getElementById('SS'+p));
	}
	else {
		level = parseInt($('#Level'+p).val());
		oldMax = $('#HP'+p).val();
		$('#HP'+p).val(levelHP(level, thisPoke.HP));
		$('#CurrentHP'+p).val(parseInt($('#CurrentHP'+p).val())+parseInt(($('#HP'+p).val()-oldMax)));
		statMod(document.getElementById('AS'+p));
		statMod(document.getElementById('DS'+p));
		statMod(document.getElementById('SAS'+p));
		statMod(document.getElementById('SDS'+p));
		statMod(document.getElementById('SS'+p));
	}
}

function statMod(sender)
{
	var p = sender.id[sender.id.length-1];
	var stat = sender.id.substring(0, sender.id.length-1);
	var pval = $('#pokemon'+p).val();

	thisPoke = JSON.parse(JSON.stringify(PokemonList[pval]));
	level = parseInt($('#Level'+p).val());
	
	switch(stat) {
		case "AS":
			$('#attack'+p).val(Math.floor(levelStat(level, thisPoke.Attack) * parseFloat($(sender).val())));
			break;
		case "DS":
			$('#defence'+p).val(Math.floor(levelStat(level, thisPoke.Defence) * parseFloat($(sender).val())));
			break;
		case "SAS":
			$('#SA'+p).val(Math.floor(levelStat(level, thisPoke.SpAttack) * parseFloat($(sender).val())));
			break;
		case "SDS":
			$('#SD'+p).val(Math.floor(levelStat(level, thisPoke.SpDefence) * parseFloat($(sender).val())));
			break;
		case "SS":
			$('#speed'+p).val(Math.floor(levelStat(level, thisPoke.SpDefence) * parseFloat($(sender).val())));
			break;
		default:
			return;
	};
}