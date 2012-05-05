<?php
class PostController extends Controller 
{
	public function actionRead($id)
	{
		// if (!$this->checkAuth())
			// $this->sendResponse(401);

		$model = Post::model()->findByPk($id);

		$this->sendResponse(200, CJSON::encode($model));
	}

	public function actionList()
	{
		// if (!$this->checkAuth())
			// $this->sendResponse(401);

		$models = Post::model()->findAll();

		$this->sendResponse(200, CJSON::encode($models));
	}

	public function actionCreate() 
	{
		if (!$this->checkAuth())
			$this->sendResponse(401);

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
		
		$this->sendResponse(200);
	}

	public function actionUpdate($id)
	{
		if (!$this->checkAuth()) {
			$this->sendResponse(401);
		}

		$data = CJSON::decode(file_get_contents('php://input'));

		$model = Post::model()->findByPk($id);
		$model->title   = $data['title'];
		$model->content = $data['content'];
		$model->user_id = $data['user_id'];

		if (!$model->save()) {
			$errors = array();
			foreach ($model->getErrors() as $e) $errors = array_merge($errors, $e);
			$this->sendResponse(500, implode("<br />", $errors));
		} 
		
		$this->sendResponse(200);
	}

	public function actionDelete($id)
	{
		if (!$this->checkAuth()) {
			$this->sendResponse(401);
		}

		$model = Post::model()->findByPk($id);

		if (!$model->delete() && count($model->getErrors())) {
			$errors = array();
			foreach ($model->getErrors() as $e) {
				$errors = array_merge($errors, $e);
			}
			$this->sendResponse(500, implode("<br />", $errors));
		} 
		
		$this->sendResponse(200);
	}
}
