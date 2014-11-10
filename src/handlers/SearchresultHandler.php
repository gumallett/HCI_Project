<?php

namespace handlers;

use framework\impl\AbstractCrudHandler;
use framework\util\Logger;
use model\Page;

class SearchresultHandler extends AbstractCrudHandler {

   /**
    * Mapped to a http GET /{handler}. E.g: GET /home will be mapped to HomeHandler.php::index()
    * @param null $id
    * @return mixed
    */
    public function index($id = null) {
        $params = $this->getRequest()->getParameters();

        Logger::log($params);
        $this->getView()->setTitle('Search Results');
        $this->setViewData('terms', $params['searchTerms']);
        $this->setViewData('results', $this->lookupResults($params['searchTerms']));
    }

    private function lookupResults($terms) {
        $results = array();

        $result = new Page();
        $result->setName('Robotics 101');
        $results[] = $result;

        $result = new Page();
        $result->setName('CS 101');
        $results[] = $result;

        $result = new Page();
        $result->setName('Database Design and Implementation');
        $results[] = $result;

        return $results;
    }
}
 