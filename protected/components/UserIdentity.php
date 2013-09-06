<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class UserIdentity extends CUserIdentity
{
	const ERROR_USER_IS_DELETED = 3;

	private $_id;
	private $_user;

	/*
	 * Authenticates a user.
	 * @return boolean whether authentication succeeds.
	 */
	public function authenticate()
	{
		$user = $this->_user = User::model()->findByAttributes(array(
			'username' => $this->username
		));
		if ($user === null) {
			$this->errorCode = self::ERROR_USERNAME_INVALID;
		} elseif (!bCrypt::verify($this->password, $user->password)) {
			$this->errorCode = self::ERROR_PASSWORD_INVALID;
		} elseif ($user->is_deleted) {
			$this->errorCode = self::ERROR_USER_IS_DELETED;
		} else {
			$this->_id = $user->id;
			$this->errorCode = self::ERROR_NONE;
		}
		return !$this->errorCode;
	}

	public function getId()
	{
		return $this->_id;
	}

	public function getUser()
	{
		return $this->_user;
	}
}
