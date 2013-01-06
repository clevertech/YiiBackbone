<?php

class ActiveRecord extends CActiveRecord
{
	public static function model($className = null)
	{
		return parent::model($className ? : get_called_class());
	}

	protected function beforeSave()
	{
		if ($this->getIsNewRecord()) {
			if (isset($this->getMetaData()->columns['create_date']) && !$this->create_date)
				$this->create_date = new CDbExpression('NOW()');
			if (isset($this->getMetaData()->columns['user_id']) && !$this->user_id)
				$this->user_id = Yii::app()->user->id;
		}
		return parent::beforeSave();
	}
}
