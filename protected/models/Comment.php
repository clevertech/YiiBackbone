<?php
/**
 * This is the model class for table "comment".
 */
class Comment extends ActiveRecord
{

	public function tableName()
	{
		return 'comment';
	}

	public function rules()
	{
		return array(
		);
	}
}
