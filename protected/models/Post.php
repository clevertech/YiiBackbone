<?php
/**
 * This is the model class for table "post".
 */
class Post extends CActiveRecord
{
    public static function model($className=__CLASS__)
    {
        return parent::model($className);
    }

    public function tableName()
    {
        return 'post';
    }

	public function rules()
	{
		return array(
			array('title, content', 'required'),
			array('title', 'length', 'min' => 3, 'max' => 100),
			array('create_date', 'default', 'value' => new CDbExpression('NOW()'), 'setOnEmpty' => false, 'on' => 'insert')
		);
	}

	function relations() {
		return array(
			'comments' => array(self::HAS_MANY, 'Comment', 'post_id'),
		);
	}
}
