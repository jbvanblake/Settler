define(["backbone",
    "../collections/hexCollection",
    "../collections/resourceCollection"
], function(Backbone, HexCollection, ResourceCollection){

    var Player = Backbone.Model.extend({
        defaults:{
            name: "default",
            resources:new ResourceCollection(),
            stolenResources: new ResourceCollection(),
            hexes: new HexCollection()
        },
        events:{

        },
        initialize: function(){
            this.set("name", "default");
            this.set("hexes", new HexCollection());
        }
    });

    return Player;

 });