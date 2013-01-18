<?php
class PostController extends Controller
{
	public function accessRules()
	{
		return array_merge(
			array(array('allow',
				'actions' => array('read', 'list', 'comments'),
				'users' => array('?')
			)),
			parent::accessRules()
		);
	}

	public function actionRead($id)
	{
		if (null === ($model = Post::model()->findByPk($id)))
			throw new CHttpException(404);
		$this->sendResponse(200, CJSON::encode($model));
	}

	public function actionList()
	{
		$models = Post::model()->findAll();
		$this->sendResponse(200, CJSON::encode($models));
	}

	public function actionCreate()
	{
		$model = new Post();
		$model->setAttributes($this->getJsonInput());
		if (!$model->validate()) {
			$this->sendResponse(400, CHtml::errorSummary($model));
		} else if (!$model->save(false)) {
			throw new CException('Cannot create a record');
		}
		$model->refresh();
		$this->sendResponse(200, CJSON::encode($model));
	}

	public function actionUpdate($id)
	{
		if (null === ($model = Post::model()->findByPk($id)))
			throw new CHttpException(404);
		$model->setAttributes($this->getJsonInput());
		if (!$model->validate()) {
			$this->sendResponse(400, CHtml::errorSummary($model));
		} else if (!$model->save(false)) {
			throw new CException('Cannot update a record');
		}
		$model->refresh();
		$this->sendResponse(200, CJSON::encode($model));
	}

	public function actionDelete($id)
	{
		if (null === ($model = Post::model()->findByPk($id)))
			throw new CHttpException(404);
		if (!$model->delete())
			throw new CException('Cannot delete post');
	}

	public function actionComments($id)
	{
		if (null === ($model = Post::model()->findByPk($id)))
			throw new CHttpException(404);
		$this->sendResponse(200, CJSON::encode($model->comments));
	}
}
