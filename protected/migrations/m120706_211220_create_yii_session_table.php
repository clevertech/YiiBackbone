<?php

class m120706_211220_create_yii_session_table extends CDbMigration
{
	public function up()
	{
		$this->execute('
			CREATE TABLE yii_session
			(
				id CHAR(32) PRIMARY KEY,
				expire INTEGER,
				data TEXT
			)
		');
	}

	public function down()
	{
		$this->dropTable('yii_session');

	}
}
