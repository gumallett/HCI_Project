<?php

use framework\Handler;
use framework\RestRequest;
use framework\Http;

require_once __DIR__.'/globals.php';
__autoload('framework\AbstractCrudHandler');
__autoload('framework\RestRequest');
__autoload('framework\HTMLTemplate');
__autoload('framework\Http');

session_start();
$request = RestRequest::get();

/*if(!isset($_SESSION['user']) && !preg_match('/(^\/register|^\/users|^\/login)/', $request->getRequest())) {
   Http::sendRedirect('login');
}
else {*/
   if($request->getRequest() == '/') {
      Http::sendRedirect('home');
   }

   $handler = Handler::getHandler($request);

   if($handler) {
      $handler->process($request);
   }
   else {
      Http::send404();
   }
//}