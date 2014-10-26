<?php

namespace framework;

require_once __DIR__ . '/../globals.php';

__autoload('framework\IRequestHandler');
__autoload('framework\Handler');
__autoload('framework\RestRequest');
__autoload('HTMLTemplate');


abstract class Handler implements IRequestHandler {

   private $request;
   private $view;

   public function __construct(RestRequest $request, \HTMLTemplate $view) {
      $this->request = $request;
      $this->view = $view;
   }

   public static function getHandler(RestRequest $request) {
      $part0 = $request->getPart(0);

      \Logger::log('Request: '.$part0);

      $handler = self::resolveHandler($part0);
      \Logger::log('Handler: '.$handler);

      if(is_readable(__DIR__ . '/..' . '/handlers/' . $handler . '.php')) {
         $handler = 'handlers\\' . $handler;
         __autoload($handler);
         $template = static::resolveView($request);

         $view = new \HTMLTemplate($part0, "template.php", array('content' => $template));
         $handler = new $handler($request, $view);

         return $handler;
      }

      return null;
   }

   public function getRequest() {
      return $this->request;
   }

   public function getView() {
      return $this->view;
   }

   public function setView($view) {
      $this->view = $view;
   }

   public function process() {
      $this->getView()->render();
   }

   private static function resolveHandler($request) {
      $request = ucfirst(strtolower($request));
      $request = preg_replace("/s$/", '', $request);

      return $request . 'Handler';
   }

   protected static function resolveView(RestRequest $request) {
      $request = $request->getPart(0);
      $request = strtolower($request);
      $result = __DIR__ . '/../views/' . $request;

      if(!preg_match("/\.php$/", $result)) {
         $result .= '.php';
      }

      return $result;
   }
}