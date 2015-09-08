require.config({
    shim:{
        jquery: {
            exports: "$"
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: 'scripts/lib/jquery.min',
        underscore: 'scripts/lib/underscore.min',
        backbone: 'scripts/lib/backbone.min',
        text: 'scripts/lib/text',
        QUnit: 'test/lib/qunit'
    }
});

require(
    ['QUnit',
        'test/catan/gameView.qunit',
        'test/catan/hexesView.qunit',
        'test/catan/playerView.qunit'],
    function(QUnit, gameViewTest, hexesViewTest, playerViewTest) {
        // run the tests.
        gameViewTest.run();
        playerViewTest.run();
        hexesViewTest.run();
        // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);