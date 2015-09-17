define(['jquery',
    'QUnit',
    '../../scripts/views/playerView',
    '../../scripts/models/player'
],
    function($,QUnit,PlayerView,Player){

        function run(){

            var testContainer = $("<div></div>"), game, playerView;
            function setup(){
                testContainer.html($("<div class ='testContainer'><div id='playerSection'></div></div>"));

                $("body").append(testContainer);
                playerView = new PlayerView({el: testContainer,model:new Player()});

            }

            function tearDown(){

                playerView.undelegateEvents();
                playerView.stopListening();
                playerView.remove();
                testContainer.html("");
            }
            QUnit.test("Players View Test", function() {
                var hexesView = new PlayerView({model:new Player()});

                QUnit.ok(true);

            });
            QUnit.test("Players View Test", function() {
                var hexesView = new PlayerView({model:new Player()});

                QUnit.ok(true);

            });
            QUnit.asyncTest("Create Player View", function() {
                setup();
                testContainer.find(".nameSelectOk").click();

                QUnit.ok(testContainer.find(".playerDashboard").length>0);
                QUnit.ok(testContainer.find(".setupContainer").length>0);
                QUnit.ok(testContainer.find(".hexCatalog").length>0);
                QUnit.ok(testContainer.find(".resourceInsertionContainer").length>0);

                tearDown();
                QUnit.start();
            });

            QUnit.asyncTest("Give Starting Resources", function() {
                setup();
                testContainer.find(".nameSelectOk").click();
                testContainer.find(".startingResourcesContainer select").val("WOOL");

                testContainer.find(".resourceSetupOk").click();

                QUnit.equal(playerView.model.attributes.resources.size(), 3)
                tearDown();
                QUnit.start();
            });

            QUnit.asyncTest("Give Resource Point and Roll", function() {
                setup();
                testContainer.find(".nameSelectOk").click();

                testContainer.find(".resourceSetupOk").click();
                testContainer.find(".allHexInput").val("Lu,or,2,A");
                testContainer.find(".hexInputSubmit").click();


                QUnit.equal(playerView.model.attributes.hexes.size(), 2)

                QUnit.equal(playerView.model.attributes.resources.size(), 0)
                playerView.roll(2,"W");

                QUnit.equal(playerView.model.attributes.resources.size(), 2);

                playerView.roll(2,"A");

                QUnit.equal(playerView.model.attributes.resources.size(), 2);
                playerView.roll(2,"W");

                QUnit.equal(playerView.model.attributes.resources.size(), 4);

                tearDown();
                QUnit.start();
            });
        }


        return{run:run};
    });

