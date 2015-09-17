define(["../models/player",
    "../collections/hexCollection",
    "text!../templates/hexTemplate.html"
], function(Player, HexCollection, hexTemplate){

    var HexesView = Backbone.View.extend({

        render: function(){
            var self = this;
            var hexesHtml= $("<div><label>Hex Points</label><div class = 'hexes'></div></div>");
            var i=0;
            this.hexes.each(function(hex){
                hex.attributes.index=i;
                i++;
                hexesHtml.find(".hexes").append(_.template(hexTemplate)(hex.attributes));
            });
            this.$el.html(hexesHtml)

        },
        events:{
            "click .delete":"removeHexFromView"
        },
        removeHexFromView:function(hex){
            var index = hex.target.value;
            this.hexes.remove(this.hexes.at(0))
            this.trigger("removeHex",hex);
        },
        initialize:function(hexes, el){
            this.hexes = hexes!=null ? hexes : new HexCollection();
            this.$el = el;
            this.hexes.on("change", this.render);
        }
    });

    return HexesView;

});