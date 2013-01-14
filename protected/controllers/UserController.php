<?php
class UserController extends Controller
{

	public function actionRead($id)
	{
		$model = User::model()->findByPk($id);
		if (null === $model)
			throw new CHttpException(404);
		$this->sendResponse(200, JSON::encode($model));
	}

	public function actionList()
	{
		$models = User::model()->findAll();
		$this->sendResponse(200, JSON::encode($models));
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
		$model->refresh();
		$this->sendResponse(200, JSON::encode($model));
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
		$model->refresh();
		$this->sendResponse(200, JSON::encode($model));
	}

	public function actionDelete($id)
	{
		if (null === ($model = User::model()->findByPk($id)))
			throw new CHttpException(404);
		if ($model->id === Yii::app()->user->id) {
			throw new CException('You cannot delete yourself');
		}
		if (!$model->delete())
			throw new CException();
	}
}
