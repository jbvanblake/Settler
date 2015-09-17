    define(["jquery",
    "../models/hex",
    "../models/player",
    "../collections/playerCollection",
    "../views/playerView",
    "../views/rollView",
    "../views/robberView",
    'text!../templates/player.html',
    'text!../templates/resourceSelectTemplate.html',
    'text!../templates/playerDashboardTemplate.html',
    'text'
], function($, Hex, Player, PlayerCollection, PlayerView, RollView, RobberView,  playerTemplate, selectTemplate, playerDashboardTemplate, Text){

        var GameView = Backbone.View.extend({
            initialize: function(){
                this.playersReady=[];
                this.playerViews=[];
                this.render();
            },
            render: function(){
                var template =
                    "<div id ='numPlayers'>" +
                    "<label>Select of Players</label>" +
                    "<select class='playerSelector'>" +
                    "<option val = 3>3</option>" +
                    "<option val = 4>4</option>" +
                    "</select>" +
                    "<button id = 'numPlayersOk'>OK</button>" +
                    "</div>" +
                    "<div id = 'PlayerBox'></div>"+
                    "<div id = 'robberContainer'></div>"+
                    "<div id = 'rollBox'></div>";
                this.$el.append( template );
            },
            events: {
                "click #numPlayersOk": "namePlayersStep"
            },
            namePlayersStep: function(e){
                e.stopPropagation();
                this.model.attributes.numPlayers = parseInt($(this.el).find("#numPlayers option:selected").val());
                this.model.attributes.players = new PlayerCollection();
                for(var i = 0;i<this.model.attributes.numPlayers;i++){
                    var p = new Player(),
                        playerContainer = $("<div></div>");

                    var pv = new PlayerView({el:playerContainer, model:p});
                    this.playerViews.push(pv);

                    this.listenTo(pv,"playerReady",this.handlePlayerReady);
                    $("#playerSection").append(pv.el);
                    this.model.attributes.players.add(p);
                    pv.render();
                }
                $(this.el).find("#numPlayers").hide();

            },
            handlePlayerReady: function(player){
                if(this.playersReady.indexOf(player)<0){
                    this.playersReady.push(player);
                }
                if(this.playersReady.length==this.model.attributes.numPlayers){
                    this.rollView = new RollView({el:this.$el.find("#rollBox")});
                    this.rollView.render();
                    this.listenTo(this.rollView, "numberRolled", this.handleRoll);

                    this.robberView = new RobberView({el:this.$el.find("#robberContainer")});
                    this.robberHex="Z";
                    this.robberView.render();
                    this.listenTo(this.robberView, "robberMoved", function(newHex){
                        this.robberHex=newHex;
                    });

                }
            },
            handleRoll: function(roll){
                for(var i=0;i<this.playerViews.length;i++){
                    this.playerViews[i].roll(roll,this.robberHex);
                }
          }
        });
        return GameView;
});
