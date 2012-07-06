<?php
class UserController extends Controller
{

	public function actionRead($id)
	{
		if (null === ($model = User::model()->findByPk($id)))
			throw new CHttpException(404);
		$this->sendResponse(200, CJSON::encode($model));
	}

	public function actionList()
	{
		$models = User::model()->findAll(array(
			'select'=>'id, fname, lname, username, email, role',
		));
		$this->sendResponse(200, CJSON::encode($models));
	}

	public function actionCreate()
	{

		$data = CJSON::decode(file_get_contents('php://input'));

		$model = new User();
		$model->fname = $data['fname'];
		$model->lname = $data['lname'];
		$model->email = $data['email'];
		$model->username = $data['username'];
		$model->password = $data['password'];
		$model->role = $data['role'];

		if (!$model->save()) {
			$errors = array();
			foreach ($model->getErrors() as $e) $errors = array_merge($errors, $e);
			$this->sendResponse(500, implode("<br />", $errors));
		}

		$this->sendResponse(200);
	}

	public function actionUpdate($id)
	{
		if (null === ($model = User::model()->findByPk($id)))
			throw new CHttpException(404);
		$data = CJSON::decode(file_get_contents('php://input'));

		$model->fname = $data['fname'];
		$model->lname = $data['lname'];
		$model->email = $data['email'];
		$model->username = $data['username'];
		$model->role = $data['role'];
		$model->newPassword = $data['password'];
		if ($model->newPassword)
			$model->password = $model->newPassword;

		if (!$model->save()) {
			$errors = array();
			foreach ($model->getErrors() as $e) $errors = array_merge($errors, $e);
			$this->sendResponse(500, implode("<br />", $errors));
		}

		$this->sendResponse(200);
	}

	public function actionDelete($id)
	{
		if (null === ($model = User::model()->findByPk($id)))
			throw new CHttpException(404);

		if (!$model->delete())
			throw new CException();
		$this->sendResponse(200);
	}
}
