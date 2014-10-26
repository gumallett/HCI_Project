<?php

namespace framework;

require_once __DIR__ . '/../globals.php';

__autoload('framework\IRequestHandler');
__autoload('framework\Handler');
__autoload('framework\RestRequest');
__autoload('framework\HTMLTemplate');

abstract class Handler implements IRequestHandler {

   private $request;
   private $view;

   private static $handler_cache = array();

   private function __construct(RestRequest $request, HTMLTemplate $view) {
      $this->request = $request;
      $this->view = $view;
   }

   /**
    * Static factory method for retrieving a new handler.
    * Gets a handler from the http request. E.g: /home will be processed by 'HomeHandler' if it exists. Otherwise, null
    * is returned.
    * @param RestRequest $request
    * @return null|string
    */
   public static function getHandler(RestRequest $request) {
      $part0 = $request->getPart(0);
      \Logger::log('Request: '.$part0);

      $handlerName = self::resolveHandler($part0);
      \Logger::log('Handler: '.$handlerName);

      if(isset(static::$handler_cache[$handlerName])) {
         return static::$handler_cache[$handlerName];
      }

      if(is_readable(__DIR__ . '/../handlers/' . $handlerName . '.php')) {
         $handler = 'handlers\\' . $handlerName;
         __autoload($handler);
         $template = static::resolveView($request);

         $view = new HTMLTemplate($part0, "template.php", array('content' => $template));
         $handler = new $handler($request, $view);
         static::$handler_cache[$handlerName] = $handler;

         return $handler;
      }

      return null;
   }

   /**
    * @return RestRequest
    */
   public function getRequest() {
      return $this->request;
   }

   /**
    * Gets the view (HTMLTemplate) used by this handler. Defaults to views/{handler}.php where {handler} is the part
    * before Handler in the php class name. E.g: home.php for 'HomeHandler'.
    * @return HTMLTemplate
    */
   public function getView() {
      return $this->view;
   }

   /**
    * Sets the view (HTMLTemplate) used by this handler. Defaults to views/{handler}.php where {handler} is the part
    * before Handler in the php class name. E.g: home.php for 'HomeHandler'.
    */
   public function setView($view) {
      $this->view = $view;
   }

   /**
    * Render the view.
    */
   public function process() {
      $this->getView()->render();
   }

   private static function resolveHandler($request) {
      $request = ucfirst(strtolower($request));
      $request = preg_replace("/s$/", '', $request);

      return $request . 'Handler';
   }

   /**
    * Attempt to automatically determine the view file to render based on the request. E.g. /home will be mapped to
    * /views/home.php. /users will be mapped to /views/users.php.
    * @param RestRequest $request
    * @return string
    */
   protected static function resolveView(RestRequest $request) {
      $request = $request->getPart(0);
      $request = strtolower($request);
      $result = __DIR__ . '/../views/' . $request;
      \Logger::log("View file: " . $result);

      if(!preg_match("/\.php$/", $result)) {
         $result .= '.php';
      }

      return $result;
   }
}