define(["backbone"],function (Backbone) {
    var RobberView = Backbone.View.extend({
        initialize:function(){
            this.hexId = "DESERT";
        },
        render:function(){
            var template = "<div id='robberContainer'>" +
                "<input class='robberInput' type='text' placeholder='Current: "+this.hexId+"'><input type='button' id='robberSubmit' value='Move Robber'></button>";

            this.$el.html($(template));
        },
        events:{
            "click #robberSubmit": "handleRobberSubmit"
        },
        handleRobberSubmit: function(){
            var hexId = this.$el.find(".robberInput").val().toUpperCase();
            var validHexIds = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','DESERT']
            if(validHexIds.indexOf(hexId)>=0){
                this.hexId = hexId;
                this.trigger("robberMoved",hexId);
                this.render();

            }
        }
    });
    return RobberView;
});