define(["backbone",
    "../models/resource"
],
    function(Backbone, Resource){


    var ResourceCollection = Backbone.Collection.extend({
        model: Resource
    });

    return ResourceCollection;
});
