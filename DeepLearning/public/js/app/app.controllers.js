var app = angular.module('hci');

app.controller('TopicsCtrl', function($scope, $stateParams, foundTopics) {
    $scope.foundTopics = foundTopics;
    $scope.q = $stateParams.q;
});

app.controller('TopicCtrl', function($scope, $rootScope, $state, $stateParams, TopicResource, foundTopic, foundQuizzes) {
    $rootScope.topic = foundTopic;
    $rootScope.editMode = false;
    $rootScope.flashcardspage = foundTopic.flashcardspage;
    $rootScope.quizpage = foundTopic.quizpage;

    $scope.$state = $state;
    $scope.quizzes = foundQuizzes;
    $scope.topicName = $stateParams['topic'];
});

app.controller('QuizCtrl', function($scope, $state, $stateParams, TopicResource, foundQuiz) {
    $scope.quiz = foundQuiz;
    $scope.quizEditing = $state.is('topicQuiz.topicQuizEditing');

    $scope.edit = function() {
        $scope.quizEditing = true;
        $state.go('.topicQuizEditing', {topic: $stateParams['topic'], quiz: $stateParams['quiz']});
    }
});
