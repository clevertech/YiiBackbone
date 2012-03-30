<?php

class m120328_180201_fix_content_column_types extends CDbMigration
{
	public function up()
	{
		$this->execute('ALTER TABLE post MODIFY content TEXT');
		$this->execute('ALTER TABLE comment MODIFY content TEXT');
	}

	public function down()
	{
		echo "m120328_180201_fix_content_column_types does not support migration down.\n";
		return false;
	}
}
