var app = angular.module('hci');

app.controller('TopicsCtrl', function($scope, $stateParams, foundTopics) {
    $scope.foundTopics = foundTopics;
    $scope.q = $stateParams.q;
});

app.controller('TopicCtrl', function($scope, $stateParams, foundTopic) {
    $scope.topic = foundTopic;
});