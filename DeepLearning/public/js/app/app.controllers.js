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

app.controller('FlashcardCtrl', function($scope, foundFlashcards) {
    $scope.flashcards = foundFlashcards;
});

app.controller('FlashcardsCtrl', function($scope, $stateParams, flashcards) {
    $scope.flashcards = flashcards;
    $scope.topicName = $stateParams['topic'];
});

app.controller('QuizCtrl', function($scope, $state, $stateParams, $log, TopicResource, foundQuiz) {
    $scope.quiz = foundQuiz;
    $scope.submittedAnswers = [];
    $scope.correctAnswers = function() {
        var correctAnswerList = [];

        foundQuiz.questions.forEach(function(question, idx) {

            for(var i = 0; i < question.answers.length; i++) {
                if(question.answers[i].correct) {
                    correctAnswerList[idx] = i;
                }
                else if(angular.isUndefined(correctAnswerList[idx]) && i == question.answers.length-1) {
                    correctAnswerList[idx] = 'none';
                }
            }
        });

        return correctAnswerList;
    };
    $scope.quizEditing = $state.is('topicQuiz.topicQuizEditing');

    $scope.edit = function() {
        $scope.quizEditing = true;
        $state.go('.topicQuizEditing', {topic: $stateParams['topic'], quiz: $stateParams['quiz']});
    };

    $scope.submit = function() {
        $scope.submitted = true;
    };

    $scope.reset = function() {
        $scope.submitted = false;
        $scope.submittedAnswers = [];
    };
});
