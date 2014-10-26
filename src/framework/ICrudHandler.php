<?php

namespace framework;

require_once __DIR__ . '/../globals.php';
__autoload('framework\IRequestHandler');

interface ICrudHandler extends IRequestHandler {

   public function index($id = null);

   public function create();

   public function update($id);

   public function delete($id);
}
