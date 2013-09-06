<?php

class SiteController extends Controller
{

	// Define access control
	public function accessRules()
	{
		return array_merge(
			array(array('allow', 'users' => array('?'))),
			// Include parent access rules
			parent::accessRules()
		);
	}

	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	public function actionIndex()
	{
		// renders the view file 'protected/views/site/index.php'
		// using the default layout 'protected/views/layouts/main.php'
		$this->render('index');
	}

	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
		if ($error = Yii::app()->errorHandler->error) {
			if (Yii::app()->request->isAjaxRequest)
				echo $error['message'];
			else
				$this->render('error', $error);
		}
	}

	public function actionLogin()
	{
		$model = new LoginForm;
		$model->attributes = $_POST;
		if ($model->validate()) {
			if (!$model->login())
				throw new CException('Cannot login user');
			$this->sendResponse(200, JSON::encode(Yii::app()->user));
		} else {
			$this->sendResponse(400, CHtml::errorSummary($model, false));
		}
	}


	public function actionLogout()
	{
		Yii::app()->user->logout();
	}

	public function actionForgotpass()
	{
		$data = CJSON::decode(file_get_contents('php://input'));

		$user = User::model()->findByAttributes(array('username' => $data['username']));

		if (!$user)
			$this->sendResponse(404, CJSON::encode('User not found.'));

		Yii::app()->mailer->IsSMTP();

		if ('private' == Yii::app()->params['env']) {
			Yii::app()->mailer->Host = 'smtp.gmail.com';
			Yii::app()->mailer->SMTPAuth = true; // turn on SMTP authentication
			Yii::app()->mailer->SMTPSecure = "tls";
			Yii::app()->mailer->Username = Yii::app()->params['smtp.username'];
			Yii::app()->mailer->Password = Yii::app()->params['smtp.password'];
			Yii::app()->mailer->From = 'test@yiibackbone.loc';
			Yii::app()->mailer->FromName = 'YiiBackbone';
		} else {
			Yii::app()->mailer->Host = 'localhost';
			Yii::app()->mailer->From = 'test@yiibackbone.noloc';
			Yii::app()->mailer->FromName = 'YiiBackbone';
		}

		Yii::app()->mailer->AddAddress($user->email);
		Yii::app()->mailer->Subject = "Password Reset Confirmation";

		// Generate password token
		$pwResetToken = RandHash::get();
		$user->pw_reset_token = $pwResetToken;
		if (!$user->save()) {
			$errors = array();
			foreach ($user->getErrors() as $e) $errors = array_merge($errors, $e);
			throw new CException(implode("\n", $errors));
		}

		// Create the reset link
		$pwResetLink = Yii::app()->request->hostInfo . "/#preset/" . urlencode(rawurlencode($pwResetToken));

		$body = "
Dear $user->fname $user->lname,

You are receiving this e-mail because you have requested to reset your password.

To complete the password reset process, please follow this link:
$pwResetLink

Regards,
Admin
";
		Yii::app()->mailer->Body = $body;
		if ($return = Yii::app()->mailer->Send())
			$this->sendResponse(200, CJSON::encode($return));
		else
			$this->sendResponse(417, CJSON::encode($return));
	}

	public function actionPassreset()
	{
		$data = CJSON::decode(file_get_contents('php://input'));

		$pwResetToken = rawurldecode(urldecode($data['pw_reset_token']));
		$user = User::model()->findByAttributes(array('pw_reset_token' => $pwResetToken));

		if (!$user)
			$this->sendResponse(404);

		$user->pw_reset_token = null;
		$user->newPassword = $data['password'];
		if ($user->newPassword)
			$user->password = $user->newPassword;
		if (!$user->save()) {
			$errors = array();
			foreach ($user->getErrors() as $e) $errors = array_merge($errors, $e);
			throw new CException(implode("\n", $errors));
		}

		$this->sendResponse(200);
	}

	public function actionTests()
	{
		$this->render('tests');
	}
}
