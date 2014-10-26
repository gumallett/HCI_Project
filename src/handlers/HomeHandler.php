<?php

namespace handlers;

use \HTMLTemplate;

require_once __DIR__.'/../globals.php';

__autoload('handlers\Handler');
__autoload('handlers\RestRequest');
__autoload('HTMLTemplate');

class HomeHandler extends AbstractCrudHandler {

   public function index($id = null) {
      $this->getView()->setTitle("HCI Deep Learning");
   }

   public function create() {
      // TODO: Implement create() method.
   }

   public function update($id) {
      // TODO: Implement update() method.
   }

   public function delete($id) {
      // TODO: Implement delete() method.
   }
}
