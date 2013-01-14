// Use ECMAScript 5 Strict Mode
"use strict";

var require = {
    paths: {
        jquery               : 'libs/jquery/jquery-1.7.1.min',
        jqueryUICore         : 'libs/jquery-ui/jquery.ui.core',
        jqueryUIWidget       : 'libs/jquery-ui/jquery.ui.widget',
        jqueryUIMouse        : 'libs/jquery-ui/jquery.ui.mouse',
        jqueryUIPosition     : 'libs/jquery-ui/jquery.ui.position',
        jqueryUIAutocomplete : 'libs/jquery-ui/jquery.ui.autocomplete',
        jqueryUIDatepicker   : 'libs/jquery-ui/jquery.ui.datepicker',
        underscore           : 'libs/underscore/underscore',
        underscoreString     : 'libs/underscore/underscore.string',
        backbone             : 'libs/backbone/backbone',
        backboneRelational   : 'libs/backbone/backbone-relational',
        modelbinding         : 'libs/backbone/backbone.modelbinding',
        visualsearch         : 'libs/app/visualsearch',
        marionette           : 'libs/backbone/backbone.marionette',
        text                 : 'libs/require/text',
        domReady             : 'libs/require/domReady',
        json                 : 'libs/utils/json2',
        bootstrapAlert       : 'libs/bootstrap/bootstrap-alert',
        bootstrapButton      : 'libs/bootstrap/bootstrap-button',
        bootstrapDropdown    : 'libs/bootstrap/bootstrap-dropdown',
        bootstrapModal       : 'libs/bootstrap/bootstrap-modal',
        bootstrapTab         : 'libs/bootstrap/bootstrap-tab',
        bootstrapTypeahead   : 'libs/bootstrap/bootstrap-typeahead',
        // bootstrapWysihtml5   : 'libs/bootstrap/bootstrap-wysihtml5',
        datejs: 'libs/utils/date'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        visualsearch: {
            deps: ['backbone', 'jqueryUIAutocomplete']
        },
        marionette: {
            deps: ['backbone']
        }
    }
}
