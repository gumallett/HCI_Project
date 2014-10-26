<?php

use framework\impl\Handler;
use framework\util\RestRequest;
use framework\util\Http;

require_once __DIR__.'/globals.php';
require_once __DIR__ . '/framework/autoload.php';

session_start();
$request = RestRequest::get();

/*if(!isset($_SESSION['user']) && !preg_match('/(^\/register|^\/users|^\/login)/', $request->getRequest())) {
   Http::sendRedirect('login');
}
else {*/
   if($request->getRequest() == '/' || $request->getRequest() == '') {
      Http::sendRedirect('home');
      return;
   }

   $handler = Handler::getHandler($request);

   if($handler) {
      $handler->process($request);
   }
   else {
      Http::send404();
   }
//}