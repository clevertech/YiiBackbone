<?php

/**
 * LoginForm class.
 * LoginForm is the data structure for keeping
 * user login form data. It is used by the 'login' action of 'SiteController'.
 */
class LoginForm extends CFormModel
{
	public $username;
	public $password;
	public $rememberMe;

	private $_identity;

	/**
	 * Declares the validation rules.
	 * The rules state that username and password are required,
	 * and password needs to be authenticated.
	 */
	public function rules()
	{
		return array(
			// username and password are required
			array('username, password', 'required'),
			// rememberMe needs to be a boolean
			array('rememberMe', 'boolean'),
			// password needs to be authenticated
			array('password', 'authenticate'),
		);
	}

	/**
	 * Declares attribute labels.
	 */
	public function attributeLabels()
	{
		return array(
			'rememberMe' => 'Remember me',
		);
	}

	/**
	 * Authenticates the password.
	 * This is the 'authenticate' validator as declared in rules().
	 */
	public function authenticate($attribute, $params)
	{
		if (!$this->hasErrors()) {
			// Create instance, authenticate
			$this->_identity = new UserIdentity($this->username, $this->password);
			$this->_identity->authenticate();

			// Determine if username/screen name error
			if ($this->_identity->errorCode == UserIdentity::ERROR_USERNAME_INVALID)
				$this->addError('username', 'Incorrect username');

			// Determine if password error
			else if ($this->_identity->errorCode == UserIdentity::ERROR_PASSWORD_INVALID)
				$this->addError('password', 'Incorrect password');
			else if ($this->_identity->errorCode == UserIdentity::ERROR_USER_IS_DELETED)
				$this->addError('password', 'This user is deleted');
		}
	}

	/**
	 * Logs in the user using the given username and password in the model.
	 * @return boolean whether login is successful
	 */
	public function login()
	{
		if ($this->_identity === null) {
			$this->_identity = new UserIdentity($this->username, $this->password);
			$this->_identity->authenticate();
		}
		if ($this->_identity->errorCode === UserIdentity::ERROR_NONE) {
			$duration = $this->rememberMe ? 3600 * 24 * 30 : 0; // 30 days / 0 days
			if ($duration > 0) {
				Yii::app()->user->allowAutoLogin = true;
			}
			Yii::app()->user->login($this->_identity, $duration);
			return true;
		} else
			return false;
	}
}
