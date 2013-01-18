<?php
class UserController extends Controller
{
	function actionRead($id)
	{
		$model = User::model()->findByPk($id);
		if (null === $model)
			throw new CHttpException(404);
		$this->sendResponse(200, JSON::encode($model));
	}

	function actionList()
	{
		$models = User::model()->findAll();
		$this->sendResponse(200, JSON::encode($models));
	}

	function actionCreate()
	{
		$model = new User();
		$model->setAttributes($this->getJsonInput());
		if (!$model->validate()) {
			$this->sendResponse(400, CHtml::errorSummary($model));
		} else if (!$model->save(false)) {
			throw new CException('Cannot create a record');
		}
		$model->refresh();
		$this->sendResponse(200, JSON::encode($model));
	}

	function actionUpdate($id)
	{
		if (null === ($model = User::model()->findByPk($id)))
			throw new CHttpException(404);
		$model->setAttributes($this->getJsonInput());
		if (!$model->validate()) {
			$this->sendResponse(400, CHtml::errorSummary($model));
		} else if (!$model->save(false)) {
			throw new CException('Cannot create a record');
		}
		$model->refresh();
		$this->sendResponse(200, JSON::encode($model));
	}

	function actionDelete($id)
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
