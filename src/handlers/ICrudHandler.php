<?php

namespace handlers;

__autoload('handlers\IRequestHandler');

interface ICrudHandler extends IRequestHandler {

   public function index($id = null);

   public function create();

   public function update($id);

   public function delete($id);
}
