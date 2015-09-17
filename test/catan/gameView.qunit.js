define(['jquery',
    'QUnit',
    '../../scripts/views/gameView',
    '../../scripts/models/game'
],
    function($,QUnit,GameView,Game){

        function run(){

            var testContainer = $("<div></div>"), game, gameView;


            function setup(){

                testContainer.html($("<div class ='testContainer'><div id='playerSection'></div></div>"));

                $("body").append(testContainer);
                game = new Game(0);
                gameView = new GameView({model:game,el:testContainer});

            }
            function tearDown(){
                gameView.remove();
                gameView.undelegateEvents();
                testContainer.html("");
            }



            QUnit.asyncTest("Game View Start Test", function() {
                setup();
                QUnit.equal(testContainer.find(".playerSelector").length,1);
                QUnit.equal(testContainer.find(".playerSelector option").length,2);
                testContainer.find("#numPlayersOk").click();

                QUnit.equal(game.numPlayers,3);
                QUnit.equal(game.players.size(),3);

                QUnit.equal(testContainer.find(".playerSelector:visible").length,0);

                tearDown();
                QUnit.start();
            });

            QUnit.asyncTest("Game View Players Test", function() {
                setup();
                testContainer.find("#numPlayersOk").click();
                QUnit.equal(testContainer.find(".nameSelectOk").length,3);
                testContainer.find(".nameSelectOk").click();


                QUnit.equal(testContainer.find("#robberContainer").length,1);
                QUnit.equal(testContainer.find("#rollBox").length,1);
                tearDown();
                QUnit.start();
            });
            QUnit.asyncTest("Game View Starting Resources Test", function() {
                setup();
                testContainer.find("#numPlayersOk").click();
                QUnit.equal(testContainer.find(".nameSelectOk").length,3);
                testContainer.find(".nameSelectOk").click();
                testContainer.find(".resourceSetupOk").click();


                tearDown();
                QUnit.start();
            });
        }


        return{run:run};
    });

