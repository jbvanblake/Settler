define(["underscore",
    "jquery",
    "backbone"], function( _, $, Backbone){

    var ResourcesView = Backbone.View.extend({

        initialize:function(){
            this.collection.on("add", this.render,this);
        },
        render:function(){
            this.$el.empty();
            var self = this;
            var resourceArray=[];
            this.collection.each(function(resource){
                resourceArray.push(resource);
            });
            var resourceMap = _.countBy(resourceArray, function(res) {
                return res.get('type');
            });

            $.each(resourceMap, function(key,val){
                self.$el.append("<div class='"+key+"'>"+key+ ": "+val+"</div>");
            });
        }
    });
    return ResourcesView;
});