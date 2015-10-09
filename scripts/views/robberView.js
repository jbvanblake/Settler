define(["backbone"],function (Backbone) {
    var RobberView = Backbone.View.extend({
        initialize:function(){
            this.hexId = "DESERT";
        },
        render:function(){
            var template = "<div>" +
                "<input class='robberInput' type='text' placeholder='Current: "+this.hexId+"'><input type='button' id='robberSubmit' value='Move'></button>";

            this.$el.html($(template));
        },
        events:{
            "click #robberSubmit": "handleRobberSubmit",
            "keyup .robberInput": "keyPressEventHandler"
        },

        keyPressEventHandler : function(event){
            if(event.keyCode == 13){
                this.handleRobberSubmit(event);
            }
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