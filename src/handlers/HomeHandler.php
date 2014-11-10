<?php

namespace handlers;

use framework\impl\AbstractCrudHandler;

class HomeHandler extends AbstractCrudHandler {

   public function index($id = null) {
       $this->getView()->setTitle("HCI Deep Learning");
       $this->setViewData('navClass', 'home');
   }
}
