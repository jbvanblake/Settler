define(['jquery',
    'QUnit',
    '../../scripts/views/hexesView',
    '../../scripts/models/hex'
],
    function($,QUnit,HexesView,Hex){

        function run(){
            QUnit.test("Hexes View Test", function() {
                var hexesView = new HexesView({model:new Hex()});



            });
        }


     return{run:run};
    });

