<?php
class PostController extends Controller
{

	public function accessRules()
	{
		return array_merge(
			array(array('allow',
				'actions' => array('read', 'list'),
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

		$data = CJSON::decode(file_get_contents('php://input'));

		$model = new Post();
		if (isset($data['title']))
			$model->title = $data['title'];
		if (isset($data['content']))
			$model->content = $data['content'];
		if (isset($data['user_id']))
			$model->user_id = $data['user_id'];

		if (!$model->save()) {
			$errors = array();
			foreach ($model->getErrors() as $e) $errors = array_merge($errors, $e);
			$this->sendResponse(500, implode("<br />", $errors));
		}
		$model->refresh();
		$this->sendResponse(200, CJSON::encode($model));
	}

	public function actionUpdate($id)
	{
		if (null === ($model = Post::model()->findByPk($id)))
			throw new CHttpException(404);

		$data = CJSON::decode(file_get_contents('php://input'));

		$model->title = $data['title'];
		$model->content = $data['content'];
		$model->user_id = $data['user_id'];

		if (!$model->save()) {
			$errors = array();
			foreach ($model->getErrors() as $e) $errors = array_merge($errors, $e);
			$this->sendResponse(500, implode("<br />", $errors));
		}
		$model->refresh();
		$this->sendResponse(200, CJSON::encode($model));
	}

	public function actionDelete($id)
	{
		if (null === ($model = Post::model()->findByPk($id)))
			throw new CHttpException(404);

		if (!$model->delete())
			throw new CException();
		$this->sendResponse(200);
	}
}
