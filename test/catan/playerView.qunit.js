define(['jquery',
    'QUnit',
    '../../scripts/views/playerView',
    '../../scripts/models/player'
],
    function($,QUnit,PlayerView,Player){

        function run(){
            QUnit.test("Players View Test", function() {
                var hexesView = new PlayerView({model:new Player()});

                QUnit.ok(true);

            });
            QUnit.test("Players View Test", function() {
                var hexesView = new PlayerView({model:new Player()});

                QUnit.ok(true);

            });
        }


        return{run:run};
    });

