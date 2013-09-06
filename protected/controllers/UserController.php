<?php
class UserController extends Controller
{
	public function accessRules()
	{
		return array(
			array(
				'allow',
				'users' => array('@'),
				'expression' => function() {
					return 'admin' === Yii::app()->user->model->role;
				}
			),
			array(
				'allow',
				'users' => array('@'),
				'actions' => array('list', 'read')
			),
			array('deny', 'users' => array('*')),
		);
	}
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
		$model = new User();
		$model->setAttributes($this->getJsonInput());
		if (!$model->validate()) {
			$this->sendResponse(400, CHtml::errorSummary($model));
		} elseif (!$model->save(false)) {
			throw new CException('Cannot create a record');
		}
		$model->refresh();
		$this->sendResponse(200, JSON::encode($model));
	}

	public function actionUpdate($id)
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
