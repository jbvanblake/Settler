define(["jquery",
    "underscore",
    "backbone",

    "scripts/collections/playerCollection",
    "scripts/models/game",
    "scripts/models/player",
    "scripts/views/playerView",
    "scripts/views/robberView",
    "scripts/views/gameView",
    "scripts/views/rollView",
    "jqplot"
],
    function (jQuery, _, Backbone, Players, Game, Player, PlayerView, RobberView, GameView, RollView, $jqplot) {
        var startView;
        var $ = jQuery;
        var initialize = function(){
            startView = new GameView({model:new Game(), el:$("#gameBox")});
        }
        return {initialize:initialize};

});