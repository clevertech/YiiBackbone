<?php
class CommentController extends Controller 
{
	public function actionRead($id)
	{
		if (!$this->checkAuth())
			$this->sendResponse(401);

		$model = Comment::model()->findByPk($id);

		$this->sendResponse(200, CJSON::encode($model));
	}

	public function actionList()
	{
		if (!$this->checkAuth())
			$this->sendResponse(401);

		// You can use that for returning a set of models 
		// if (isset($ids)) {
			// $ids = explode(';', $ids);
			// $models = Comment::model()->findAllByPk($ids);
		// } else

		$models = Comment::model()->findAll();

		$this->sendResponse(200, CJSON::encode($models));
	}

	public function actionCreate() 
	{
		if (!$this->checkAuth())
			$this->sendResponse(401);

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
		if (!$this->checkAuth())
			$this->sendResponse(401);

		$data = CJSON::decode(file_get_contents('php://input'));

		$model = Comment::model()->findByPk($id);
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
		if (!$this->checkAuth())
			$this->sendResponse(401);

		$model = Comment::model()->findByPk($id);

		if (!$model->delete()) {
			$errors = array();
			foreach ($model->getErrors() as $e) $errors = array_merge($errors, $e);
			throw new CException(implode("\n", $errors));
		} 
		
		$this->sendResponse(200);
	}
}
