YiiBackbone
===========

- Status: Work in progress.
- Integration environment: http://yiibackbone.int.clevertech.biz/
- Login: admin/pass1234

Introduction
============

YiiBackbone is a sample blog web application build using Backbone.js and Yii.
The source of this project can be used to kick-start other Backbone.js projects
or serve as reference point on using Backbone.js.

Requirements
============

- Apache 2 Web Server
- MySQL 5.1+ with InnoDB support.
- PHP 5.3+ configured with the following extensions:
  - PDO
  - PDO MySQL driver
  - GD2
  - Mcrypt
  - CUrl
  - Imap
- Node.js (http://nodejs.org/)
- NPM (http://npmjs.org/)

Installation
============

You can get the source files from:

    $ git clone git@github.com:clevertech/YiiBackbone.git

After you clone the repo, create a params-local.php file inside
*/protected/config* with something like the following:

    return array(
      'db.username'   => 'user',
      'db.password'   => 'pass',
      'db.name'       => 'db', //create the DB
      'db.host'       => 'localhost',
      'smtp.username' => 'email', //optional
      'smtp.password' => 'pass',  //optional
      'env'           => 'private',
    );

Make directories _protected/runtime_ and _protected/assets_ writable by the webserver.

run the migrations:

    $ cd YiiBackbone/protected
    $ ./yiic migrate

Technology Stack
================

Here are all current components of YiiBackbone and links to relevant resources.

Name :                    Path :                                           Docs URL
-------------------------------------------------------------------------------------------------------
- Yii                  : 'protected/lib/yii-1.1.9                        : http://www.yiiframework.com/
- require.js           : 'app/js/libs/require/require.js                 : http://requirejs.org/
- jquery               : 'app/js/libs/jquery/jquery-1.7.1.min',          : http://jquery.com/
- jqueryUICore         : 'app/js/libs/jquery-ui/jquery.ui.core',         : http://jqueryui.com/
- jqueryUIWidget       : 'app/js/libs/jquery-ui/jquery.ui.widget',       : http://jqueryui.com/
- jqueryUIMouse        : 'app/js/libs/jquery-ui/jquery.ui.mouse',        : http://jqueryui.com/
- jqueryUIPosition     : 'app/js/libs/jquery-ui/jquery.ui.position',     : http://jqueryui.com/demos/position/
- jqueryUIAutocomplete : 'app/js/libs/jquery-ui/jquery.ui.autocomplete', : http://jqueryui.com/demos/autocomplete/
- jqueryUIDatepicker   : 'app/js/libs/jquery-ui/jquery.ui.datepicker',   : http://jqueryui.com/demos/datepicker/
- cookie               : 'app/js/libs/jquery/jquery.cookie',             : https://github.com/carhartl/jquery-cookie
- underscore           : 'app/js/libs/underscore/underscore',            : http://documentcloud.github.com/underscore/
- underscoreString     : 'app/js/libs/underscore/underscore.string',     : http://epeli.github.com/underscore.string/
- backbone             : 'app/js/libs/backbone/backbone',                : http://documentcloud.github.com/backbone/
- backboneRelational   : 'app/js/libs/backbone/backbone-relational',     : https://github.com/PaulUithol/Backbone-relational
- modelbinding         : 'app/js/libs/backbone/backbone.modelbinding',   : https://github.com/derickbailey/backbone.modelbinding
- visualsearch         : 'app/js/libs/app/visualsearch',                 : http://documentcloud.github.com/visualsearch/
- text                 : 'app/js/libs/require/text',                     : http://requirejs.org/docs/api.html#text
- domReady             : 'app/js/libs/require/domReady',                 : http://requirejs.org/docs/api.html#pageload
- json                 : 'app/js/libs/utils/json2',                      : https://github.com/douglascrockford/JSON-js
- bootstrapAlert       : 'app/js/libs/bootstrap/bootstrap-alert',        : http://twitter.github.com/bootstrap/javascript.html#alerts
- bootstrapButton      : 'app/js/libs/bootstrap/bootstrap-button',       : http://twitter.github.com/bootstrap/javascript.html#buttons
- bootstrapDropdown    : 'app/js/libs/bootstrap/bootstrap-dropdown',     : http://twitter.github.com/bootstrap/javascript.html#dropdowns
- bootstrapModal       : 'app/js/libs/bootstrap/bootstrap-modal',        : http://twitter.github.com/bootstrap/javascript.html#modals
- bootstrapTab         : 'app/js/libs/bootstrap/bootstrap-tab',          : http://twitter.github.com/bootstrap/javascript.html#tabs
- bootstrapTypeahead   : 'app/js/libs/bootstrap/bootstrap-typeahead',    : http://twitter.github.com/bootstrap/javascript.html#typeahead

Please note that all JS libs are converted to AMD format so that they can be
loaded asynchronously. If a lib is not defined as AMD module it will not load
properly. For further information on AMD please see http://requirejs.org/docs/whyamd.html

For converting existing libraries into AMD libraries please see
https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries

Testing
=======

For BDD on YiiBackbone we are using:

- Cucumber.js : https://github.com/cucumber/cucumber-js
- Jasmine     : http://pivotal.github.com/jasmine/

You need to install /app/package.json using NPM to enable Cucumber.js. Follow
the instructions on Cucumber.js's docs site above.

Code Style Guide
================

Indent
------

For JavaScript, CSS, HTML files use only spaces, and indent 2 spaces at a time.
For PHP files use only tabs and indent 1 tab at a time.

Backbone Resources
==================

I recommend going through the following resources for some advanced concepts on
using Backbone.js.

http://lostechies.com/derickbailey/category/backbone/

Gotchas
=======

One problem that you may encounter while working with Require.js is circular
dependencies. Please see http://requirejs.org/docs/api.html#circular

Known Bugs
==========

Architecture
============

YiiBackbone's architecture is divided into two obvious parts. The server and
the client.

The server-side is handled by Yii. Yii is used to provide the DB manipulations
with the migrations, emailing, ActiveRecord, RESTful resources, password
encryption, secure cookie over SSL creation, console commands and few other
things. All server side files can be found under "/protected".

The actual app is build entirely with JS on the client-side. All files can be
found under "/app".

The application consists of the following parts ("/app/js")

- models
- collections
- views
- templates
- helpers
- libs
- app.js
- router.js
- main.js

Authors
=======
Ivan Shaovchev, @ivanshaovchev

Thanks
======
[CleverTech](http://www.clevertech.biz) for supporting this OpenSource project.

License
=======

The MIT License

Copyright (c) 2012 CleverTech

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
