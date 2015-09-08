define(["backbone"],function (Backbone) {
    var Resource = Backbone.Model.extend({
        defaults:{
            type:"defaultType"
        },
        initialize: function(type){
            this.type = type ? type : "LUMBER";
        }
    });

    return Resource;

});