define(["backbone",
    "../models/hex"
], function(Backbone, Hex){
    var HexCollection = Backbone.Collection.extend({
        model: Hex

    });
    return HexCollection;
});