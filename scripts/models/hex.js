define(["backbone"
], function(Backbone){
    var RESOURCE_TYPES = ['LUMBER','ORE','WHEAT','WOOL','BRICK','COIN','CLOTH','PAPER'];
    var POSSIBLE_HEX_NUMBERS = [2,3,4,5,6,8,9,10,11,12];
    var POSSIBLE_HEX_IDS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R'];

    var Hex = Backbone.Model.extend({
        number:0,
        resource:"LUMBER",
        id:'A'
    });


  return Hex;


});