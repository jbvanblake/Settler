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
        },
        "jqplot.core": {deps: ["jquery"]},
        "jqplot": {deps: ["jqplot.core"]}
    },
    paths: {
        jquery: 'scripts/lib/jquery.min',
        "jqplot.core": "scripts/lib/jquery.jqplot.min",
        "jqplot": "scripts/lib/jqplotWithPlugins",
        underscore: 'scripts/lib/underscore.min',
        backbone: 'scripts/lib/backbone.min',
        vis: 'scripts/lib/vis.min',
        text: 'scripts/lib/text',
        QUnit: 'http://code.jquery.com/qunit/qunit-1.11.0.js'
    }
});

require(['main'], function(Main){
    Main.initialize();

});