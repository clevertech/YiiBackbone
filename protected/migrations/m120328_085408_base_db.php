<?php

class m120328_085408_base_db extends CDbMigration
{
	public function up()
	{
		$this->createTable('user', array (
			'id'             => 'pk',
			'fname'          => 'string',
			'lname'          => 'string',
			'username'       => 'string',
			'password'       => 'string',
			'pw_reset_token' => 'string',
			'email'          => 'string',
			'role'           => 'string',
			'is_deleted'     => 'int',
			'create_date'    => 'datetime',
		), 'ENGINE=InnoDB');

		$this->createTable('cookie', array (
			'id'          => 'pk',
			'username'    => 'string',
			'token'       => 'string',
			'create_date' => 'datetime',
		), 'ENGINE=InnoDB');

		$this->createTable('post', array (
			'id'             => 'pk',
			'title'          => 'string',
			'content'        => 'string',
			'user_id'        => 'int',
			'is_deleted'     => 'int',
			'create_date'    => 'datetime',
		), 'ENGINE=InnoDB');

		$this->createTable('comment', array (
			'id'             => 'pk',
			'post_id'        => 'int',
			'content'        => 'string',
			'user_id'        => 'int',
			'is_deleted'     => 'int',
			'create_date'    => 'datetime',
		), 'ENGINE=InnoDB');

		$enc = new bCrypt();
		$password = $enc->hash('1q2w3e');

		$this->insert('user', array(
			'fname'          => 'Super',
			'lname'          => 'User',
			'username'       => 'super',
			'password'       => $password,
			'pw_reset_token' => '',
			'email'          => 'super@yiibackbone.loc',
			'role'           => 'admin',
			'is_deleted'     => 0,
			'create_date'    => new CDbExpression('NOW()'),
		));
		$userId = Yii::app()->db->getLastInsertId();
			
		$this->insert('post', array(
			'title'          => 'Lorem Ipsum',
			'content'        => 'Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas faucibus mollis interdum.',
			'user_id'        => $userId,
			'is_deleted'     => 0,
			'create_date'    => new CDbExpression('NOW()'),
		));
		$postId = Yii::app()->db->getLastInsertId();

		$this->insert('comment', array(
			'content'        => 'Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas faucibus mollis interdum.',
			'post_id'        => $postId,
			'user_id'        => $userId,
			'is_deleted'     => 0,
			'create_date'    => new CDbExpression('NOW()'),
		));
	}

	public function down()
	{
		$this->dropTable('user');
		$this->dropTable('cookie');
		$this->dropTable('post');
		$this->dropTable('comment');
	}
}
