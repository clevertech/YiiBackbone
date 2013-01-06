<?php
/**
 * This is the model class for table "user".
 */
class User extends ActiveRecord
{
	public $newPassword;

	public function tableName()
	{
		return 'user';
	}

	public function rules()
	{
		return array(
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

	function scopes()
	{
		return array(
			'noPassword' => array(
				'select' => 'id, fname, lname, username, email, role, create_date',
			)
		);
	}
}
