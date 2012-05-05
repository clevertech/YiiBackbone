<?php
/**
 * Controller is the customized base controller class.
 * All controller classes for this application should extend from this base class.
 */
class Controller extends CController
{
	/**
	 * @var string the default layout for the controller view. Defaults to '//layouts/column1',
	 * meaning using a single column layout. See 'protected/views/layouts/column1.php'.
	 */
	public $layout='//layouts/main';

	/**
	 * @var array context menu items. This property will be assigned to {@link CMenu::items}.
	 */
	public $menu=array();
	/**
	 * @var array the breadcrumbs of the current page. The value of this property will
	 * be assigned to {@link CBreadcrumbs::links}. Please refer to {@link CBreadcrumbs::links}
	 * for more details on how to specify this property.
	 */
	public $breadcrumbs=array();

	/**
	 * Send raw HTTP response
	 * @param int $status HTTP status code
	 * @param string $body The body of the HTTP response
	 * @param string $contentType Header content-type
	 * @return HTTP response 
	 */
	protected function sendResponse($status = 200, $body = '', $contentType = 'application/json')
	{
		// Set the status
		$statusHeader = 'HTTP/1.1 ' . $status . ' ' . $this->getStatusCodeMessage($status);
		header($statusHeader);
		// Set the content type
		header('Content-type: ' . $contentType);
	 
		echo $body;
		Yii::app()->end();
	}
	
	/**
	 * Return the http status message based on integer status code
	 * @param int $status HTTP status code
	 * @return string status message
	 */
	protected function getStatusCodeMessage($status)
	{
	    $codes = array(
			100 => 'Continue',
			101 => 'Switching Protocols',
			200 => 'OK',
			201 => 'Created',
			202 => 'Accepted',
			203 => 'Non-Authoritative Information',
			204 => 'No Content',
			205 => 'Reset Content',
			206 => 'Partial Content',
			300 => 'Multiple Choices',
			301 => 'Moved Permanently',
			302 => 'Found',
			303 => 'See Other',
			304 => 'Not Modified',
			305 => 'Use Proxy',
			306 => '(Unused)',
			307 => 'Temporary Redirect',
			400 => 'Bad Request',
			401 => 'Unauthorized',
			402 => 'Payment Required',
			403 => 'Forbidden',
			404 => 'Not Found',
			405 => 'Method Not Allowed',
			406 => 'Not Acceptable',
			407 => 'Proxy Authentication Required',
			408 => 'Request Timeout',
			409 => 'Conflict',
			410 => 'Gone',
			411 => 'Length Required',
			412 => 'Precondition Failed',
			413 => 'Request Entity Too Large',
			414 => 'Request-URI Too Long',
			415 => 'Unsupported Media Type',
			416 => 'Requested Range Not Satisfiable',
			417 => 'Expectation Failed',
			500 => 'Internal Server Error',
			501 => 'Not Implemented',
			502 => 'Bad Gateway',
			503 => 'Service Unavailable',
			504 => 'Gateway Timeout',
			505 => 'HTTP Version Not Supported',

	    );
	    return (isset($codes[$status])) ? $codes[$status] : '';
	}

	protected function checkAuth()
	{
		$cookie = Yii::app()->request->cookies['_yiibackbone'];

		if (!$cookie) 
			return false;

		list($username,$token) = explode(',',$cookie->value);

		// current time - 2 hours (two hours in the past) 
		$timeCheck = date('Y-m-d H:i:s', time()-(60*60*2));
		if (Yii::app()->db->createCommand()
			->select('id')
			->from('cookie')
			->where("username=:u AND token=:t AND create_date > :c", array(':u'=>$username,':t'=>$token,':c'=>$timeCheck))
			->queryRow())
			return true;
		else
			return false;
	}
}
