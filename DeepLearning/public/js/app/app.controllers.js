var app = angular.module('hci');

app.controller('TopicsCtrl', function($scope, $stateParams, foundTopics) {
    $scope.foundTopics = foundTopics;
    $scope.q = $stateParams.q;
});

app.controller('TopicCtrl', function($scope, $rootScope, $stateParams, TopicResource, foundTopic) {
    $rootScope.topic = foundTopic;
    $rootScope.editMode = false;
    $rootScope.flashcardspage = foundTopic.flashcardspage;
    $rootScope.quizpage = foundTopic.quizpage;
});

app.controller('QuizCtrl', function($scope, $stateParams, TopicResource) {

});