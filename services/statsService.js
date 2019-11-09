'use strict';
app.service('statsService', ['userService', '$http', '$rootScope', function(userService, $http, $rootScope){

    var service = this;

    service.findByName = function(name) {
        if ($rootScope.debug == true) {
            return $http.get($rootScope.serviceHost + "/pokemon/" + name).then(
                function (response) {
                   return service.findByNameDebug();
                }
            );
        }
        else {
            return $http.get($rootScope.serviceHost + "/pokemon/" + name).then(
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
        "pokemon" : [
            {
                "dexno": 678,
                "name": "Meowstic-F",
                "nickname": "M'lady",
                "displayName": "Meowstic",
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
                "ribbons": [
                    {
                        "name": "Normal Cool",
                        "quantity": 1,
                        "links": [
                            "http://localhost/pokemon/meowstic-f"
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
                "dexno": 25,
                "name": "Pikachu",
                "nickname": "Pooka",
                "displayName": "Pikachu",
                "gender": "M",
                "type1": "Electric",
                "type2": "NONE",
                "exp": 5,
                "obtained": "Capture",
                "obtainedLink": "http://localhost/pokemon/pikachu",
                "hiddenPowerType": "Ice",
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
                "ribbons": [
                    {
                        "name": "Normal Cool",
                        "quantity": 1,
                        "links": [
                            "http://localhost/pokemon/magcargo"
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
            },

            {
                "dexno": 32,
                "name": "Nidoran-M",
                "nickname": "Stick",
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