<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
	<meta name="language" content="en" />

    <title><?php echo CHtml::encode($this->pageTitle); ?></title>

    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/app/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/app/css/bootstrap-wysihtml5.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/app/css/visualsearch.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/app/css/jquery-ui-1.8.18.custom.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/app/css/all.css" />
    <script data-main="app/js/main" src="<?php echo Yii::app()->request->baseUrl; ?>/app/js/libs/require/require.js"></script>

    <!-- HTML5 shim, for IE6-8 support of HTML elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

  </head>
  <body>

    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <div id="loader" class="loading"></div>
          <a id="logo" href="#">YiiBackbone</a>
          <a class="brand" href="#">Scherago</a>
          <div id="search"></div>
          <ul class="nav pull-right"></ul>
          <div class="login"></div>
        </div>
      </div>
    </div>

    <div class="head"></div>

    <div class="main container">
		<span class="demo-hint"><i>Search for: <b>Posts</b></i></span>
		<div id="search_query" style="">&nbsp;</div>
    </div> <!-- /.container -->

  </body>
</html>
