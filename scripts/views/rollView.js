define(["backbone"],function (Backbone) {
    var RollView = Backbone.View.extend({
        initialize:function(){
            this.rollHistory = [];
        },
        render:function(){
            var rollTemplate="<div id='rollInputs' >" +
                "<input id='rollInput' type='text' alt='Enter Number Rolled'>" +
                "<input id='rollDice' type=button value='Roll!'>" +
                "<div style='height:300px;width:400px;'><div id ='rollGraphContainer'></div></div>" +
                "</div>";

            this.$el.html($(rollTemplate));
        },
        events:{
            "click #rollDice": "handleRollFromView",

            "keyup #rollInput" : "keyPressEventHandler"
        },
        keyPressEventHandler : function(event){
            if(event.keyCode == 13){
                this.handleRollFromView(event);
            }
        },
        handleShowGraph:function(){
            var dataPoints = _.pairs(_.countBy(this.rollHistory,function(roll){return roll;}));
            if(this.plot1 !=undefined){
                this.plot1.destroy();
            }
            this.plot1 = $.jqplot ('rollGraphContainer', [dataPoints],{
                seriesDefaults:{
                    renderer:$.jqplot.BarRenderer,
                    rendererOptions: {fillToZero: true}
                },
                axesDefaults: {
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer
                },
                axes: {

                    xaxis: {
                        label: "Roll Number",
                        pad:3,
                        ticks:[[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[8,8],[9,9],[10,10],[11,11],[12,12]]
                    },
                    yaxis: {
                        label: "Number Of Rolls",
                        tickInterval:1
                    }
                }});


        },
        handleRollFromView: function( event ){
            var rollNum = parseInt(this.$el.find("#rollInput").val());
            this.$el.find("#rollInput").val("")
            if(rollNum > 1 && rollNum < 13){
                this.rollHistory.push(rollNum);
                this.$el.find("#rollInput").attr("placeholder",this.rollHistory.reverse().toString())
                this.trigger("numberRolled", rollNum);
            }
            this.handleShowGraph()
        }
    });
    return RollView;
});