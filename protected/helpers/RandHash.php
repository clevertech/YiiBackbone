<?php 
/** 
 * A class for true random hash string generation. 
 */
class RandHash 
{
	/**
	 * @param string $prefix to be used with uniqid()
	 * @return string hash
	 */
	public static function get($prefix='abc') {
		$bytes = '';
 
		if (function_exists('openssl_random_pseudo_bytes') 
		&& (strtoupper(substr(PHP_OS, 0, 3)) !== 'WIN')) // OpenSSL slow on Win
			$bytes = openssl_random_pseudo_bytes(32);
 
		if ($bytes === '' && is_readable('/dev/urandom') 
		&& ($hRand = @fopen('/dev/urandom', 'rb')) !== FALSE) {
			$bytes = fread($hRand, 32);
			fclose($hRand);
		}
 
		if ($bytes === '') {
			$key = uniqid($prefix, true);
 
			// 12 rounds of HMAC must be reproduced / created verbatim, no known shortcuts.
			// Salsa20 returns more than enough bytes.
			for ($i = 0; $i < 12; $i++) {
				$bytes = hash_hmac('salsa20', microtime() . $bytes, $key, true);
				usleep(10);
			}
		}
		return base64_encode($bytes);
	}
}
