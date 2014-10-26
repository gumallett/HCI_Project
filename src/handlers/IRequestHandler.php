<?php

namespace handlers;

require_once __DIR__.'/../globals.php';

interface IRequestHandler {

   public function process();

   public function getRequest();

   public function getView();

   public function setView($view);
}
