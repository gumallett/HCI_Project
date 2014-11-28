var app = angular.module('hci');

app.controller('TopicsCtrl', function($scope, $stateParams, foundTopics) {
    $scope.foundTopics = foundTopics;
    $scope.q = $stateParams.q;
});

app.controller('TopicCtrl', function($scope, $rootScope, $stateParams, TopicResource, foundTopic) {
    $scope.topic = foundTopic;
    $scope.editMode = false;
    $rootScope.flashcardspage = foundTopic.flashcardspage;
    $rootScope.quizpage = foundTopic.quizpage;

    $scope.edit = function() {
        $scope.editMode = true;
    };

    $scope.save = function() {
        TopicResource.save($stateParams['topic'], $scope.topic);
        $scope.editMode = false;
    };
});