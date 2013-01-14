// Define jQuery as AMD module
define.amd.jQuery = true;

require([
    'jasmine',
    'jasmine.html',
    'jasmine.jquery'
], function (jasmine) {

    jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
    jasmine.getEnv().execute();
});

