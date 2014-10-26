<?php

function framework_load($class) {
   $prefix = 'framework\\';
   file_put_contents("php://stderr", 'Loading framework class: '.$class."\n");
   require_once $prefix . $class . '.php';
}

framework_load('util\Logger');
framework_load('util\Http');
framework_load('util\RestRequest');
framework_load('util\HTMLTemplate');

framework_load('IRequestHandler');
framework_load('ICrudHandler');
framework_load('impl\Handler');
framework_load('impl\AbstractCrudHandler');