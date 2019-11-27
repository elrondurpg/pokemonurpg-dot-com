'use strict';
app.service('statsService', ['userService', '$http', '$rootScope', '$q', function(userService, $http, $rootScope, $q){

    var service = this;

    service.findByName = function(name) {
        if ($rootScope.debug == true) {
            var deferred = $q.defer()
            deferred.resolve(service.findByNameDebug());
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

    service.findByNameDebug = function() {
        var response = {
            "status": 200,
            "data": service.dummy
        };
        return response;
    }

    service.dummy = {
        "name": "Elrond",
        "money": 10000,
        "wins": 10,
        "losses": 10,
        "draws": 1,
        "pokemon" : [
            {
                "dbid": 1,
                "dexno": 678,
                "name": "Meowstic-F",
                "nickname": "M'lady",
                "displayName": "Meowstic",
                "formName": "Female Meowstic",
                "gender": "F",
                "type1": "Psychic",
                "type2": "NONE",
                "exp": 50,
                "obtained": "Starter",
                "obtainedLink": "http://localhost/pokemon/meowstic-f",
                "hiddenPowerType": "Fire",
                "hiddenPowerLink": "http://localhost/pokemon/meowstic-f",
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
                        "name": "Work Up",
                        "method": "TM"
                    },
                    {
                        "name": "Yawn",
                        "method": "BREEDING"
                    }
                ],
                "ribbons": [],
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
            },

            {
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
            },

            {
                "dbid": 12,
                "dexno": 219,
                "name": "Magcargo",
                "nickname": "Shelly",
                "displayName": "Magcargo",
                "gender": "F",
                "type1": "Fire",
                "type2": "Rock",
                "exp": 50,
                "obtained": "Capture",
                "obtainedLink": "http://localhost/pokemon/magcargo",
                "hiddenPowerType": "Grass",
                "hiddenPowerLink": "http://localhost/pokemon/magcargo",
                "nature": "Bashful",
                "abilities": [
                    "Infiltrator", "Keen Eye"
                ],
                "attacks": [
                    {
                        "name": "Charge Beam",
                        "method": "Level-Up"
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
                "ribbons": [],
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
                "uft": true
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
                "exp": 50,
                "obtained": "Capture",
                "obtainedLink": "http://localhost/pokemon/nidoran-m",
                "hiddenPowerType": "Fire",
                "hiddenPowerLink": "http://localhost/pokemon/nidoran-m",
                "nature": "Mild",
                "abilities": [
                    "Infiltrator", "Keen Eye"
                ],
                "attacks": [
                    {
                        "name": "Charge Beam",
                        "method": "LEVEL-UP"
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
                        "name": "Normal Cool",
                        "quantity": 1,
                        "links": [
                            "http://localhost/pokemon/nidoran-m"
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
                "uft": true
            }
        ]
    }

}]);