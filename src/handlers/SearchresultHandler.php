<?php

namespace handlers;

use framework\AbstractCrudHandler;

class SearchresultHandler extends AbstractCrudHandler {

   /**
    * Mapped to a http GET /{handler}. E.g: GET /home will be mapped to HomeHandler.php::index()
    * @param null $id
    * @return mixed
    */
   public function index($id = null) {
      $params = $this->getRequest()->getParameters();

      \Logger::log($params);
      $this->getView()->terms = $params['searchTerms'];
   }

   /**
    * Mapped to a http POST /{handler}. E.g: POST /home will be mapped to HomeHandler.php::create()
    * @return mixed If a string, a redirect will be automatically issued to /{string}. Use this to redirect after a post. Otherwise return null.
    */
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
 