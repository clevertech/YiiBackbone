<?php
class CommentController extends Controller
{

	public function accessRules()
	{
		return array_merge(
			array(array('allow',
				'actions'=>array('read', 'list'),
				'users'=>array('?')
			)),
			parent::accessRules()
		);
	}

	public function actionRead($id)
	{
		if (null === ($model = Comment::model()->findByPk($id)))
			throw new CHttpException(404);
		$this->sendResponse(200, CJSON::encode($model));
	}

	public function actionList()
	{
		$models = Comment::model()->findAll();

		$this->sendResponse(200, CJSON::encode($models));
	}

	public function actionCreate()
	{
		$data = CJSON::decode(file_get_contents('php://input'));

		$model = new Comment();
		if (isset($data['content']))
			$model->content = $data['content'];
		if (isset($data['post_id']))
			$model->post_id = $data['post_id'];
		if (isset($data['user_id']))
			$model->post_id = $data['user_id'];

		if (!$model->save()) {
			$errors = array();
			foreach ($model->getErrors() as $e) $errors = array_merge($errors, $e);
			throw new CException(implode("\n", $errors));
		}

		$this->sendResponse(200);
	}

	public function actionUpdate($id)
	{
		if (null === ($model = Comment::model()->findByPk($id)))
			throw new CHttpException(404);

		$data = CJSON::decode(file_get_contents('php://input'));

		$model->content = $data['content'];
		$model->post_id = $data['post_id'];
		$model->user_id = $data['user_id'];

		if (!$model->save()) {
			$errors = array();
			foreach ($model->getErrors() as $e) $errors = array_merge($errors, $e);
			throw new CException(implode("\n", $errors));
		}

		$this->sendResponse(200);
	}

	public function actionDelete($id)
	{
		if (null === ($model = Comment::model()->findByPk($id)))
			throw new CHttpException(404);

		if (!$model->delete())
			throw new CException();
		$this->sendResponse(200);
	}
}
