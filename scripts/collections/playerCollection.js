define(["backbone",
    "../models/player"
],
    function(Backbone, Player){

    var Players = Backbone.Collection.extend({
        model: Player
    });

    return Players;
});
