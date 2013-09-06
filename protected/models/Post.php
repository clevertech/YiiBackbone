<?php
/**
 * This is the model class for table "post".
 */
class Post extends ActiveRecord
{
	public function tableName()
	{
		return 'post';
	}

	public function rules()
	{
		return array(
			array('title, content', 'required'),
			array('title', 'length', 'min' => 3, 'max' => 100),
		);
	}

	public function relations()
	{
		return array(
			'comments' => array(self::HAS_MANY, 'Comment', 'post_id'),
		);
	}
}
