<?php 
/**
 * This is the model class for table "user".
 */
class User extends CActiveRecord
{
	public $newPassword;

    public static function model($className=__CLASS__)
    {
        return parent::model($className);
    }
 
    public function tableName()
    {
        return 'user';
    }

	public function rules()
	{
		return array(
			array('create_date', 'default', 'value' => new CDbExpression('NOW()'), 'setOnEmpty' => false, 'on' => 'insert')
		);
	}

	protected function afterValidate()
    {
		if ($this->isNewRecord || $this->newPassword)
			$this->password = $this->encrypt($this->password);

		return parent::afterValidate();
    }
 
	public function encrypt($value)
    {
		$enc = new bCrypt();
		return $enc->hash($value);
	}
}
