<?php
$configRoot=dirname(__FILE__);
$config=file_exists($configRoot.'/main.php') ? require($configRoot.'/main.php') : array();

// This is the configuration for yiic console application.
// Any writable CConsoleApplication properties can be configured here.
return CMap::mergeArray ($config, array(
	'name'=>'Console Application',
));
