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

	/**
	 * Overriding default, so it works correct with arrays of AR models when you
	 * use JSON::encode($models) for example (by default it won't use toJSON).
	 * Might be fixed by overriding JSON::encode method to use static instead of self,
	 * but it'll be difficult to maintain. Waiting for Yii2.
	 * @return CMapIterator
	 */
	function getIterator()
	{
		$attributes = $this->toJSON();
		return new CMapIterator($attributes);
	}

	function toJSON()
	{
		$attributes = $this->getAttributes();
		return $attributes;
	}
}
