'use strict';
app.service('statsService', ['userService', '$http', '$rootScope', '$q', function(userService, $http, $rootScope, $q){

    var service = this;

    service.findByName = function(name) {
        if ($rootScope.debug == true) {
            var deferred = $q.defer()
            deferred.resolve({
                "status": 200,
                "data": service.dummy
            });
            return deferred.promise;
        }
        else {
            return $http.get($rootScope.serviceHost + "/stats/" + name).then(
                 function (response) {
                    return response.data;
                 }
            );
        }
    }

    service.findOwnedPokemonByDbid = function(dbid) {
        if ($rootScope.debug == true) {
            var deferred = $q.defer()
            deferred.resolve({
                "status": 200,
                "data": service.dummyPokemon
            });
            return deferred.promise;
        }
        else {
            return $http.get($rootScope.serviceHost + "/stats/pokemon/" + dbid).then(
                 function (response) {
                    return response.data;
                 }
            );
        }
    }

    service.dummyPokemon = {
        "dbid": 11,
        "dexno": 25,
        "name": "Pikachu-Belle",
        "nickname": "Pooka",
        "displayName": "Pikachu",
        "formName": "Belle Cosplay",
        "gender": "M",
        "type1": "Electric",
        "type2": "Ice",
        "exp": 5,
        "obtained": "Capture",
        "obtainedLink": "http://localhost/pokemon/pikachu",
        "hiddenPowerType": "Fire",
        "hiddenPowerLink": "http://localhost/pokemon/pikachu",
        "nature": "Mild",
        "abilities": [
            "Infiltrator", "Keen Eye"
        ],
        "attacks": [
            {
                "name": "Charge Beam",
                "method": "Level-Up"
            },
            {
                "name": "Thunder Shock",
                "method": "LEVEL-UP"
            },
            {
                "name": "Work Up",
                "method": "TM"
            },
            {
                "name": "Yawn",
                "method": "BREEDING"
            }
        ],
        "ribbons": [
            {
                "rank": "Normal",
                "attribute": "Cool",
                "quantity": 2,
                "links": [
                    "http://localhost/pokemon/pikachu"
                ]
            },
            {
                "rank": "Super",
                "attribute": "Cool",
                "quantity": 1,
                "links": [
                    "http://localhost/pokemon/pikachu"
                ]
            },
            {
                "rank": "Normal",
                "attribute": "Beauty",
                "quantity": 1,
                "links": [
                    "http://localhost/pokemon/pikachu"
                ]
            }
        ],
        "wishlist": {
            "attacks": [
                {
                    "name": "Flash",
                    "method": "HM"
                },
                {
                    "name": "Gravity",
                    "method": "MOVE TUTOR"
                }
            ],
            "abilities": [
                "Competitive"
            ]
        },
        "uft": false
    };

    service.dummy = {
        "name": "Elrond",
        "money": 10000,
        "wins": 10,
        "losses": 10,
        "draws": 1,
        "items": [
            {
                "name": "HM03 Surf",
                "quantity": 1,
                "type": "HM"
              },
              {
                "name": "HM07 Waterfall",
                "quantity": 1,
                "type": "HM"
              },
              {
                "name": "Air Balloon",
                "quantity": 1,
                "type": "Held"
              },
              {
                "name": "Expert Belt",
                "quantity": 1,
                "type": "Held"
              },
              {
                "name": "Iron Ball",
                "quantity": 1,
                "type": "Held"
              },
              {
                "name": "Leftovers",
                "quantity": 3,
                "type": "Held"
              },
              {
                "name": "Life Orb",
                "quantity": 1,
                "type": "Held"
              },
              {
                "name": "Light Clay",
                "quantity": 1,
                "type": "Held"
              },
              {
                "name": "Rocky Helmet",
                "quantity": 1,
                "type": "Held"
              },
              {
                "name": "Toxic Orb",
                "quantity": 1,
                "type": "Held"
              },
              {
                "name": "Weakness Policy",
                "quantity": 1,
                "type": "Held"
              },
              {
                "name": "Heracronite",
                "quantity": 1,
                "type": "Mega"
              },
              {
                "name": "Mawilite",
                "quantity": 1,
                "type": "Mega"
              },
              {
                "name": "Medichamite",
                "quantity": 1,
                "type": "Mega"
              },
              {
                "name": "Lum Berry",
                "quantity": 1,
                "type": "Berry"
              },
              {
                "name": "Mega Ring",
                "quantity": 1,
                "type": "Other"
              },
              {
                "name": "Cable Link",
                "quantity": 1,
                "type": "Other"
              },
              {
                "name": "Iron Plate",
                "quantity": 1,
                "type": "Held"
              },
              {
                "name": "TM Sludge Bomb",
                "quantity": 1,
                "type": "TM"
              },
              {
                "name": "Normalium Z",
                "quantity": 1,
                "type": "ZCrystal"
              }
        ],
        "pokemon" : [
            {
                "dbid": 1,
                "dexno": 678,
                "name": "Meowstic-F",
                "nickname": "M'lady",
                "displayName": "Meowstic",
                "gender": "F",
                "type1": "Psychic",
                "type2": "NONE"
            },
            {
                "dbid": 11,
                "dexno": 25,
                "name": "Pikachu-Belle",
                "nickname": "Pooka",
                "displayName": "Pikachu",
                "gender": "M",
                "type1": "Electric",
                "type2": "Ice"
            },

            {
                "dbid": 12,
                "dexno": 219,
                "name": "Magcargo",
                "nickname": "Shelly",
                "displayName": "Magcargo",
                "gender": "F",
                "type1": "Fire",
                "type2": "Rock"
            },

            {
                "dbid": 13,
                "dexno": 32,
                "name": "Nidoran-M",
                "nickname": "",
                "displayName": "Nidoran",
                "gender": "M",
                "type1": "Poison",
                "type2": "NONE",
            }
        ]
    }

}]);