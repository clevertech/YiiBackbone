<?php

class JSON extends CJSON
{
	public static function encode($var) {
		if ('object' === gettype($var) && method_exists($var, 'toJSON')) {
			$var = $var->toJSON();
		}
		return parent::encode($var);
	}

	protected static function nameValue($name, $value)
	{
		return static::encode(strval($name)) . ':' . static::encode($value);
	}
}
