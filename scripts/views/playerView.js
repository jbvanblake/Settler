define([
    "jquery",
    "underscore",
    "../models/hex",
    "../models/resource",
    "../collections/resourceCollection",
    "../views/hexInputView",
    "../views/resourcesView",
    "../views/hexesView",
    'text!../templates/player.html',
    'text!../templates/resourceSelectTemplate.html',
    'text!../templates/playerDashboardTemplate.html',

    'text'
], function($, _, Hex, Resource, ResourceCollection, HexInputView, ResourcesView, HexesView, playerTemplate, selectTemplate, playerDashboardTemplate, Text){

    var PlayerView = Backbone.View.extend({

        initialize: function(){
            this.resources = new ResourceCollection();
            this.unique=1;
            var template = _.template(playerTemplate)({resourceSelectTemplate:selectTemplate});

            this.$el.html( template );
            this.setListeners();

            this.$el.find(".startingResourcesContainer").hide()
            return this;

        },
        setListeners:function(){
            this.hexInput = new HexInputView({el:this.$el.find(".hexInputSlot")});
            this.listenTo(this.hexInput,"playerGetsAnotherHex",this.handleAddHex);

        },
        handleAddHex:function(data){
            this.model.attributes.hexes.add(new Hex({number:data.num,resource:data.res,alphaId:data.id}));
            this.hexInput.render();
            this.hexCatalog.render();
        },
        handleRemoveHex:function(data){
            this.model.attributes.hexes.remove(data.id);
            this.hexInput.render();
            this.hexCatalog.render();
        },
        events:{
            "click .nameSelectOk": "saveName",
            "click .resourceSetupOk": "giveStartingResources",
            "keyup .nameSelect" : "keyPressEventHandler"
        },

        keyPressEventHandler : function(event){
            if(event.keyCode == 13){
                this.saveName();
            }
        },

        giveStartingResources: function(){
            var selects = this.$el.find(".startingResourcesContainer select");
            var resources=new ResourceCollection();
            var self = this;
            _.each(selects, function(select){
                var type = $(select).val();
                if(type != 'NONE'){
                    resources.add(new Resource({type:type}));
                    self.resourcesView.collection.add(new Resource({type:type}));
                }
            });
            this.model.attributes.resources = resources;
            this.$el.find(".startingResourcesContainer").hide();
        },
        finishSetup:function(){

            this.$el.find(".totalResourcesLabel").html("<label>Total Resources Collected</label>");
            this.model.attributes.resources = new ResourceCollection();
            this.resourcesView = new ResourcesView({el:this.$el.find(".totalResourcesContainer"),collection:this.model.attributes.resources});
            this.resourcesView.render();


            this.$el.find(".robbedLabel").html("<label>Total Resources Robbed</label>");
            this.model.attributes.robbedResources = new ResourceCollection();
            this.robbedResourcesView = new ResourcesView({el:this.$el.find(".robbedResourceContainer"),collection:this.model.attributes.robbedResources});
            this.robbedResourcesView.render();

            this.renderHexInput();

            this.$el.find(".playerName").show();

            this.trigger("playerReady", this.model);
        },
        renderHexInput: function(){
            this.hexCatalog = new HexesView(this.model.attributes.hexes,this.$el.find(".hexCatalog"));
            this.hexCatalog.render();

            this.listenTo(this.hexCatalog,"removeHex",this.handleRemoveHex);

            this.hexInput = new HexInputView({el:this.$el.find(".hexInputSlot")});
            this.listenTo(this.hexInput,"addHex",this.handleAddHex);
            this.hexInput.render();

        },
        saveName:function(){
            this.model.attributes.name = $(this.el).find(".nameSelect").val();
            this.$el.find(".nameSelectContainer").hide()
            this.setupResources();
            this.finishSetup();
            this.$el.find(".startingResourcesContainer").show()
        },
        setupResources:function(){

            var dashboardTemplate = _.template(playerDashboardTemplate)( {name:this.model.attributes.name});

            $(this.el).find(".playerOutputs").prepend(dashboardTemplate);
        },
        roll:function(roll,robberHex){
            var self=this;
            this.model.attributes.hexes.each(function(hex){
                if(hex.attributes.number == roll){
                    if(hex.get("alphaId")==robberHex){
                        self.model.attributes.robbedResources.add(new Resource({type:hex.get("resource")}));
                    }
                    else{
                        self.model.attributes.resources.add(new Resource({type:hex.get("resource")}));
                    }
                }
            });

        }

    });

    return PlayerView;
});