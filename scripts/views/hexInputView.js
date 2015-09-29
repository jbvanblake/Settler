define(["../models/resource",
    "text!../templates/resourcePointInputTemplate.html",
    "text!../templates/hexInputError.html",
    'jquery-ui'
], function(Resource, resourcePointInputTemplate, errorHtmlTemplate){

    var RESOURCE_TYPES = ['LUMBER','ORE','WHEAT','WOOL','BRICK','COIN','CLOTH','PAPER'];
    var POSSIBLE_HEX_NUMBERS = [2,3,4,5,6,8,9,10,11,12];
    var POSSIBLE_HEX_IDS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R'];

    var HexInputView = Backbone.View.extend({
        render:function(){
            var inputTemplate = _.template(resourcePointInputTemplate)({"resourceTypes":RESOURCE_TYPES, "hexNumbers":POSSIBLE_HEX_NUMBERS, "hexIds":POSSIBLE_HEX_IDS});


            this.$el.find(".resource-tooltip").tooltip({
                tooltipClass: "info-tooltip"
            });

            this.$el.empty();
            this.$el.append(inputTemplate);
        },
        events:{
            "click .hexInputSubmit": "addHex",
            "keyup .allHexInput" : "keyPressEventHandler"
        },

        keyPressEventHandler : function(event){
            if(event.keyCode == 13){
                this.addHex();
            }
        },


        attemptToAddHexFromInput: function (allHexInput) {
            var tokens = allHexInput.split(','), res1,res2,num,id;

            if(tokens.length == 3){
                switch(tokens[0].toLowerCase()) {
                    case('lu'):
                        res1="LUMBER";
                        break;
                    case('or'):
                        res1="ORE";
                        break;
                    case('wh'):
                        res1="WHEAT";
                        break;
                    case('wo'):
                        res1="WOOL";
                        break;
                    case('br'):
                        res1="BRICK";
                        break;
                    case('co'):
                        res1="COIN";
                        break;
                    case('cl'):
                        res1="CLOTH";
                        break;
                    case('pa'):
                        res1="PAPER";
                        break;
                    default:
                        return "Invalid Resource Token."


                }

                if(POSSIBLE_HEX_NUMBERS.indexOf(parseInt(tokens[1]))<0){
                    return "Invalid Roll Number";
                }
                num = tokens[1];
                if(POSSIBLE_HEX_IDS.indexOf(tokens[2].toUpperCase())<0){
                    return "Invalid Hex Id";
                }
                id = tokens[2].toUpperCase();

                this.trigger("playerGetsAnotherHex",{res:res1,num:num,id:id});
                return [];

            }else if(tokens.length == 4){
                switch(tokens[0].toLowerCase()) {
                    case('lu'):
                        res1="LUMBER";
                        break;
                    case('or'):
                        res1="ORE";
                        break;
                    case('wh'):
                        res1="WHEAT";
                        break;
                    case('wo'):
                        res1="WOOL";
                        break;
                    case('br'):
                        res1="BRICK";
                        break;
                    case('co'):
                        res1="COIN";
                        break;
                    case('cl'):
                        res1="CLOTH";
                        break;
                    case('pa'):
                        res1="PAPER";
                        break;
                    default:
                        return "Invalid Resource Token."


                }
                switch(tokens[1].toLowerCase()) {
                    case('lu'):
                        res2="LUMBER";
                        break;
                    case('or'):
                        res2="ORE";
                        break;
                    case('wh'):
                        res2="WHEAT";
                        break;
                    case('wo'):
                        res2="WOOL";
                        break;
                    case('br'):
                        res2="BRICK";
                        break;
                    case('co'):
                        res2="COIN";
                        break;
                    case('cl'):
                        res2="CLOTH";
                        break;
                    case('pa'):
                        res2="PAPER";
                        break;
                    default:
                        return "Invalid Resource Token."


                }

                if(POSSIBLE_HEX_NUMBERS.indexOf(parseInt(tokens[2]))<0){
                    return "Invalid Roll Number";
                }
                num = tokens[2];
                if(POSSIBLE_HEX_IDS.indexOf(tokens[3].toUpperCase())<0){
                    return "Invalid Hex Id";
                }
                id = tokens[3].toUpperCase();

                this.trigger("playerGetsAnotherHex",{res:res1,num:num,id:id});
                this.trigger("playerGetsAnotherHex",{res:res2,num:num,id:id});
                return [];
            }else{
                return "Wrong number of tokens."
            }

        },
        addHex: function(){
            var allHexInput = this.$el.find(".allHexInput").val();
            if(allHexInput.length>0){
                var errors = this.attemptToAddHexFromInput(allHexInput);
                if(errors.length != 0){
                    var errorHtml = _.template(errorHtmlTemplate)({"errors":errors});

                    this.$el.find(".errorContainer").html(errorHtml);
                    this.$el.find(".errorContainer").show();
                }
                else{
                    this.$el.find(".errorContainer").hide();
                }
            }
//            else{
//                var res1 = this.$el.find(".hexInputResource1").val();
//                var res2 = this.$el.find(".hexInputResource2").val();
//                var num = this.$el.find(".hexInputRoll").val();
//                var id = this.$el.find(".hexInputId").val();
//
//                if(res1 !="NONE"){
//                    this.trigger("playerGetsAnotherHex",{res:res1,num:num,id:id});
//                }
//                if(res2 !="NONE"){
//                    this.trigger("playerGetsAnotherHex",{res:res2,num:num,id:id});
//                }
//            }
        }

    });
    return HexInputView;
});