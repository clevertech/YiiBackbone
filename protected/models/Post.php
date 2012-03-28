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
			array('create_date', 'default', 'value' => new CDbExpression('NOW()'), 'setOnEmpty' => false, 'on' => 'insert')
		);
	}
}
