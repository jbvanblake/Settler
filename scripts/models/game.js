define(["backbone",
    "../collections/playerCollection"
], function(Backbone, PlayerCollection){

    var Game = Backbone.Model.extend({
        defaults:{
            players: new PlayerCollection(),
            numPlayers: 0
        }
    });

    return Game;

});