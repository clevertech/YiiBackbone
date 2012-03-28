// Use ECMAScript 5 Strict Mode
"use strict";

// Define jQuery as AMD module
define.amd.jQuery = true;

// Require.js allows us to configure mappings to paths
// as demonstrated below:
// TODO: Load minified version of the libs or use Require.js's JS compiler (R)
require.config({
  paths: {
    jquery               : 'libs/jquery/jquery-1.7.1.min',
    jqueryUICore         : 'libs/jquery-ui/jquery.ui.core',
    jqueryUIWidget       : 'libs/jquery-ui/jquery.ui.widget',
    jqueryUIMouse        : 'libs/jquery-ui/jquery.ui.mouse',
    jqueryUIPosition     : 'libs/jquery-ui/jquery.ui.position',
    jqueryUIAutocomplete : 'libs/jquery-ui/jquery.ui.autocomplete',
    jqueryUIDatepicker   : 'libs/jquery-ui/jquery.ui.datepicker',
    cookie               : 'libs/jquery/jquery.cookie',
    underscore           : 'libs/underscore/underscore',
    underscoreString     : 'libs/underscore/underscore.string',
    backbone             : 'libs/backbone/backbone',
    backboneRelational   : 'libs/backbone/backbone-relational',
    modelbinding         : 'libs/backbone/backbone.modelbinding',
    visualsearch         : 'libs/app/visualsearch',
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
  }
});

require(['app'], function(App){
  var app = App;
});
