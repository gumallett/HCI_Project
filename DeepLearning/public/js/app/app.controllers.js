var app = angular.module('hci');

app.controller('TopicsCtrl', function($scope, $stateParams, foundTopics) {
    $scope.foundTopics = foundTopics;
    $scope.q = $stateParams.q;
});

app.controller('TopicCtrl', function($scope, $rootScope, $stateParams, foundTopic) {
    $scope.topic = foundTopic;
    $scope.editMode = false;
    $rootScope.flashcardspage = foundTopic.flashcardspage;
    $rootScope.quizpage = foundTopic.quizpage;

    $scope.edit = function() {
        $scope.editMode = !$scope.editMode;
    }
});