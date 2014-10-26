<?php

function __autoload($class) {
   file_put_contents("php://stderr", 'Loading class: '.$class."\n");
   require_once $class . '.php';
}

define('DB_NAME', 'hci');
define('DB_USER', 'root');
define('DB_PASSWORD', '');