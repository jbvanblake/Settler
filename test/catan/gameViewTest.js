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
        jquery: '../../scripts/lib/jquery.min',
        underscore: '../../scripts/lib/underscore.min',
        backbone: '../../scripts/lib/backbone.min',
        text: '../../scripts/lib/text',
        QUnit: '../lib/qunit'
    }
});

require(
    ['QUnit',
        'gameView.qunit.js'],
    function(QUnit, gameViewTest) {
        // run the tests.
        gameViewTest.run();
        // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);