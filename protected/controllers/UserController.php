<?php
class UserController extends Controller 
{
	public function actionRead($id)
	{
		$model = User::model()->findByPk($id);

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
		if (!$this->checkAuth())
			$this->sendResponse(401);

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
			throw new CException(implode("\n", $errors));
		}

		$this->sendResponse(200);
	}

	public function actionUpdate($id)
	{
		if (!$this->checkAuth())
			$this->sendResponse(401);

		$data = CJSON::decode(file_get_contents('php://input'));

		$model = User::model()->findByPk($id);
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
			throw new CException(implode("\n", $errors));
		}

		$this->sendResponse(200);
	}

	public function actionDelete($id)
	{
		if (!$this->checkAuth())
			$this->sendResponse(401);

		$data = CJSON::decode(file_get_contents('php://input'));

		$model = User::model()->findByPk($id);

		if (!$model->delete()) {
			$errors = array();
			foreach ($model->getErrors() as $e) $errors = array_merge($errors, $e);
			throw new CException(implode("\n", $errors));
		} 

		$this->sendResponse(200);
	}
}
