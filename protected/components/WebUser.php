<?php

class WebUser extends CWebUser
{
	public $allowAutoLogin = true;
	public $loginRequiredAjaxResponse = 'Login Required!';
	protected static $model;

	public function toJSON()
	{
		return array(
			'username' => $this->name,
			'id' => $this->id,
		);
	}

	public function getModel()
	{
		if(!static::$model) {
			static::$model = User::model()->findByPk($this->id);
		}
		return static::$model;
	}
}
