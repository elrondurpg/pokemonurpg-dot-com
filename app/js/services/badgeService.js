'use strict';
app.factory('badgeService', function(){
    var badges = {};
    
    badges["Boulder Badge"] = "http://cdn.bulbagarden.net/upload/thumb/d/dd/Boulder_Badge.png/50px-Boulder_Badge.png";
    badges["Cascade Badge"] = "http://cdn.bulbagarden.net/upload/thumb/9/9c/Cascade_Badge.png/50px-Cascade_Badge.png";
    badges["Soul Badge"] = "https://cdn.bulbagarden.net/upload/thumb/7/7d/Soul_Badge.png/50px-Soul_Badge.png";
    badges["Marsh Badge"] = "http://cdn.bulbagarden.net/upload/thumb/6/6b/Marsh_Badge.png/50px-Marsh_Badge.png";
    badges["Volcano Badge"] = "http://cdn.bulbagarden.net/upload/thumb/1/12/Volcano_Badge.png/50px-Volcano_Badge.png";
    badges["Earth Badge"] = "https://cdn.bulbagarden.net/upload/thumb/7/78/Earth_Badge.png/50px-Earth_Badge.png";
    badges["Hive Badge"] = "http://cdn.bulbagarden.net/upload/0/08/Hive_Badge.png";
    badges["Plain Badge"] = "http://cdn.bulbagarden.net/upload/a/a7/Plain_Badge.png";
    badges["Fog Badge"] = "http://cdn.bulbagarden.net/upload/4/48/Fog_Badge.png";
    badges["Mineral Badge"] = "https://cdn.bulbagarden.net/upload/thumb/7/7b/Mineral_Badge.png/50px-Mineral_Badge.png" ;
    badges["Glacier Badge"] = "https://cdn.bulbagarden.net/upload/thumb/e/e6/Glacier_Badge.png/50px-Glacier_Badge.png";
    badges["Rising Badge"] = "http://cdn.bulbagarden.net/upload/5/58/Rising_Badge.png";
    badges["Knuckle Badge"] = "http://vignette3.wikia.nocookie.net/pokemon/images/5/51/Knucklebadge.png/revision/latest?cb=20081229171108";
    badges["Heat Badge"] = "http://vignette1.wikia.nocookie.net/alexiscooper/images/c/c4/Heat_Badge.png/revision/latest?cb=20141124100419";
    badges["Balance Badge"] = "http://vignette2.wikia.nocookie.net/pokemon/images/a/af/Balance_badge.png/revision/latest/scale-to-width-down/42?cb=20140715173933";
    badges["Feather Badge"] = "https://cdn.staticneo.com/w/pokemon/thumb/3/3e/FeatherBadge.png/50px-FeatherBadge.png";
    badges["Rain Badge"] = "http://cdn.bulbagarden.net/upload/thumb/9/9b/Rain_Badge.png/50px-Rain_Badge.png";
    badges["Night Badge"] = "/img/Night-Badge.png";
    badges["Coal Badge"] = "http://cdn.bulbagarden.net/upload/thumb/0/0b/Coal_Badge.png/50px-Coal_Badge.png";
    badges["Forest Badge"] = "http://cdn.bulbagarden.net/upload/thumb/8/8c/Forest_Badge.png/50px-Forest_Badge.png";
    badges["Relic Badge"] = "http://cdn.bulbagarden.net/upload/thumb/2/28/Relic_Badge.png/50px-Relic_Badge.png";
    badges["Mine Badge"] = "http://cdn.bulbagarden.net/upload/thumb/f/fe/Mine_Badge.png/50px-Mine_Badge.png";
    badges["Beacon Badge"] = "http://cdn.bulbagarden.net/upload/thumb/0/0c/Beacon_Badge.png/50px-Beacon_Badge.png";
    badges["Pixie Badge"] = "https://cdn.discordapp.com/attachments/135864828240592896/197393715902414850/pixiebadge.png" ;
    badges["Insect Badge"] = "http://i.imgur.com/aWkYd.png";
    badges["Bolt Badge"] = "http://i.imgur.com/gW8rE.png";
    badges["Quake Badge"] = "http://i.imgur.com/aM5MI.png";
    badges["Jet Badge"] = "http://i.imgur.com/wFBMv.png";
    badges["Legend Badge"] = "http://i.imgur.com/p3LxU.png";
    badges["Toxic Badge"] = "http://cdn.bulbagarden.net/upload/thumb/3/3e/Toxic_Badge.png/50px-Toxic_Badge.png";
    badges["Shroud Badge"] = "http://i.imgur.com/qGLzaHr.png";
    badges["Rumble Badge"] = "http://i.imgur.com/fLzo0zq.png";
    badges["Plant Badge"] = "http://i.imgur.com/Fv1rWWJ.png";
    badges["Fairy Badge"] = "http://i.imgur.com/EFRlqXM.png";
    badges["Psychic Badge"] = "http://i.imgur.com/tD5GjO2.png";
    badges["Iceberg Badge"] = "http://i.imgur.com/JK4VcwV.png";
    badges["Coral Eye Badge"] = "http://cdn.bulbagarden.net/upload/thumb/8/82/Coral-Eye_Badge.png/50px-Coral-Eye_Badge.png";
    badges["Sea Ruby Badge"] = "http://cdn.bulbagarden.net/upload/thumb/e/e1/Sea_Ruby_Badge.png/50px-Sea_Ruby_Badge.png";
    badges["Spike Shell Badge"] = "http://cdn.bulbagarden.net/upload/thumb/7/77/Spike_Shell_Badge.png/40px-Spike_Shell_Badge.png";
    badges["Jade Star Badge"] = "http://cdn.bulbagarden.net/upload/thumb/6/61/Jade_Star_Badge.png/40px-Jade_Star_Badge.png";
    badges["Orange Island Trophy"] = "http://img.photobucket.com/albums/v472/lil_leprachaun33/badges/OrangeLeagueTrophy.gif";
    
    var badgeNames = [[ "Boulder Badge", "Cascade Badge", "Soul Badge", "Marsh Badge", "Volcano Badge", "Earth Badge" ],
                     [ "Hive Badge", "Plain Badge", "Fog Badge", "Mineral Badge", "Glacier Badge", "Rising Badge" ],
                     [ "Knuckle Badge", "Heat Badge", "Balance Badge", "Feather Badge", "Rain Badge", "Night Badge" ],
                     [ "Coal Badge", "Forest Badge", "Relic Badge", "Mine Badge", "Beacon Badge", "Pixie Badge" ],
                     [ "Insect Badge", "Bolt Badge", "Quake Badge", "Jet Badge", "Legend Badge", "Toxic Badge" ],
                     [ "Shroud Badge", "Rumble Badge", "Plant Badge", "Fairy Badge", "Psychic Badge", "Iceberg Badge" ],
                     [ "Coral Eye Badge", "Sea Ruby Badge", "Spike Shell Badge", "Jade Star Badge", "Orange Island Trophy" ]];
    
    return{

        get: function(badge) {
            return badges[badge];
        },

        getAll: function () {
            return badges;
        },
        
        getAllBadgeNames: function () {
            return badgeNames;
        }
    }
});