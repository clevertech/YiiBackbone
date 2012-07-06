<?php
// Set paths
$root=realpath(dirname(__FILE__).'/../..');
$configRoot=dirname(__FILE__);
// Load params
$params=require($configRoot.'/params.php');
// Load local config
$configLocal=file_exists($configRoot.'/main-local.php') ? require($configRoot.'/main-local.php') : array();
// define a path alias
Yii::setPathOfAlias('root', $root);

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return CMap::mergeArray (array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'YiiBackbone',
	'params'=>$params,

	// preloading 'log' component
	'preload'=>array('log'),

	// autoloading model and component classes
	'import'=>array(
		'application.models.*',
		'application.components.*',
		'application.helpers.*',
	),

	'modules'=>array(),

	// application components
	'components'=>array(
		'user'=>array(
			'class' => 'WebUser',
			// enable cookie-based authentication
			'allowAutoLogin'=>true,
		),
		'urlManager'=>array(
			'urlFormat'=>'path',
			'rules'=>array(
				// REST patterns
				array('site/login'      , 'pattern'=>'api/site/login'       , 'verb'=>'POST'),
				array('site/logout'     , 'pattern'=>'api/site/logout'      , 'verb'=>'POST'),
				array('site/forgotpass' , 'pattern'=>'api/site/forgotpass'  , 'verb'=>'POST'),
				array('site/passreset'  , 'pattern'=>'api/site/passreset'   , 'verb'=>'POST'),

				array('user/list'       , 'pattern'=>'api/user'             , 'verb'=>'GET'),
				array('user/create'     , 'pattern'=>'api/user'             , 'verb'=>'POST'),
				array('post/read'       , 'pattern'=>'api/user/<id:\d+>'    , 'verb'=>'GET'),
				array('user/update'     , 'pattern'=>'api/user/<id:\d+>'    , 'verb'=>'PUT'),
				array('user/delete'     , 'pattern'=>'api/user/<id:\d+>'    , 'verb'=>'DELETE'),

				array('post/list'       , 'pattern'=>'api/post'             , 'verb'=>'GET'),
				array('post/create'     , 'pattern'=>'api/post'             , 'verb'=>'POST'),
				array('post/read'       , 'pattern'=>'api/post/<id:\d+>'    , 'verb'=>'GET'),
				array('post/update'     , 'pattern'=>'api/post/<id:\d+>'    , 'verb'=>'PUT'),
				array('post/delete'     , 'pattern'=>'api/post/<id:\d+>'    , 'verb'=>'DELETE'),

				array('comment/list'    , 'pattern'=>'api/comment'          , 'verb'=>'GET'),
				array('comment/create'  , 'pattern'=>'api/comment'          , 'verb'=>'POST'),
				array('comment/read'    , 'pattern'=>'api/comment/<id:\d+>' , 'verb'=>'GET'),
				array('comment/update'  , 'pattern'=>'api/comment/<id:\d+>' , 'verb'=>'PUT'),
				array('comment/delete'  , 'pattern'=>'api/comment/<id:\d+>' , 'verb'=>'DELETE'),

				// Other controllers
				'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
			),
		),
		// MySQL database connection settings
		'db'=>array(
			'connectionString'   => "mysql:host={$params['db.host']};dbname={$params['db.name']}",
			'username'           => $params['db.username'],
			'password'           => $params['db.password'],
			'charset'            => 'utf8',
			'enableParamLogging' => YII_DEBUG,
			'emulatePrepare'     => true,
        ),
		'mailer' => array(
		  'class' => 'application.extensions.mailer.EMailer',
		),
		'errorHandler'=>array(
			// use 'site/error' action to display errors
            'errorAction'=>'site/error',
        ),
		'log'=>array(
			'class'=>'CLogRouter',
			'routes'=>array(
				array(
					'class'=>'CFileLogRoute',
					'levels'=>'error, warning',
				),
			),
		),
	),
), $configLocal);
