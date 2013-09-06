YiiBackbone
===========

- Status: Work in progress.
- Integration environment: http://yiibackbone.int.clevertech.biz/
- Login: demo/1q2w3e

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

Installation
============

You can get the source files from:

    $ git clone git@github.com:clevertech/YiiBackbone.git

And load git submodules:

    $ cd YiiBackbone
    $ git submodule update --init

Make directories _protected/runtime_ and _assets_ writable by the webserver.

    $ chmod 0777 protected/runtime
    $ chmod 0777 assets/

Create a main-local.php file inside
*/protected/config* with something like the following
(uncomment the below lines if want to integrate the Gii code generation feature of Yii
for generating php models, controllers, CRUD, etc. in your development environment):

```
<?php
return array(
//	'modules' => array(
//		'gii' => array(
//			'class' => 'system.gii.GiiModule',
//			'password' => 'giiPassword',
//		),
//	),
	'components' => array(
		'db' => array(
			'connectionString' => "mysql:host=127.0.0.1;dbname=yii_backbone",
			'username' => 'root',
			'password' => '',
		),
//		'urlManager' => array(
//			'rules' => array(
//				// GII patterns
//				'gii' => 'gii',
//				'gii/<controller:\w+>' => 'gii/<controller>',
//				'gii/<controller:\w+>/<action:\w+>' => 'gii/<controller>/<action>',
//			)
//		)
	),
);
```

Run the migrations:

    $ cd protected
    $ php yiic.php migrate


Optional - if you chose to enable the Gii code generation tool, then you can use this url and password

    URL:      http://hostname/path-to-yiibackbone/gii (for example: http://localhost/YiiBackbone/gii)
    Password: giiPassword



Technology Stack
================

Here are some current components of YiiBackbone and links to relevant resources.

Name :                    Path :                                           Docs URL
-------------------------------------------------------------------------------------------------------
- Yii                  : 'protected/vendor/yii',                         : http://www.yiiframework.com/
- Backbone.JS          : 'app/js/libs/backbone/backbone',                : http://documentcloud.github.com/backbone/
- Underscore.JS        : 'app/js/libs/underscore/underscore',            : http://documentcloud.github.com/underscore/
- RequireJS            : 'app/js/libs/require/*'                         : http://requirejs.org/
- jQuery               : 'app/js/libs/jquery/jquery-1.7.1.min',          : http://jquery.com/
- jQuery UI            : 'app/js/libs/jquery-ui/jquery.ui.core',         : http://jqueryui.com/
- MarionetteJS         : 'app/js/libs/backbone/backbone.marionette',     : http://marionettejs.com/
- Backbone-relational  : 'app/js/libs/backbone/backbone-relational',     : https://github.com/PaulUithol/Backbone-relational
- modelbinding         : 'app/js/libs/backbone/backbone.modelbinding',   : https://github.com/derickbailey/backbone.modelbinding
- visualsearch         : 'app/js/libs/app/visualsearch',                 : http://documentcloud.github.com/visualsearch/
- json                 : 'app/js/libs/utils/json2',                      : https://github.com/douglascrockford/JSON-js
- bootstrap            : 'app/js/libs/bootstrap/*',                      : http://twitter.github.com/bootstrap/javascript.html

Please note that some JS libs are converted to AMD format so that they can be
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

For JavaScript, CSS, HTML files we use only spaces, and indent 2 spaces at a time.
And for PHP files we follow Yii style with 1 tab indentation.

Backbone Resources
==================

We recommend going through the following resources for some advanced concepts on
using Backbone.js.

- http://backbonetutorials.com/organizing-backbone-using-modules/
- http://lostechies.com/derickbailey/category/backbone/

Also take a look at Marionette.Application and Marionette.Region components
of great Backbone.Marionette framework:

- https://github.com/marionettejs/backbone.marionette

Gotchas
=======

One problem that you may encounter while working with RequireJS is circular
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
- [Ivan Shaovchev](https://github.com/ivanshaovchev)
- [Rinat Silnov](https://github.com/rinatio)

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
