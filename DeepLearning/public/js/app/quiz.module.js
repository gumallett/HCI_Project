var quiz = angular.module('hci.quiz', ['ngSanitize','ui.router','ui.bootstrap','hci.services']);

quiz.config(function($stateProvider) {
    $stateProvider.state('topicQuizzes', {
        url: "/topics/:topic/quiz",
        templateUrl: 'js/app/partials/quiz/quizzes.html',
        resolve: {
            foundTopic: function($stateParams, $state, TopicResource) {
                var topic = TopicResource.getTopic($stateParams['topic']);

                if(angular.isUndefined(topic)) {
                    throw 'topic not found: '+$stateParams['topic'];
                }

                return topic;
            },
            foundQuizzes: function($stateParams, $state, TopicResource) {
                return TopicResource.getQuizzes($stateParams['topic']);
            }
        },
        controller: 'TopicCtrl'
    });

    $stateProvider.state('topicQuiz', {
        url: "/topics/:topic/quizzes/:quiz",
        templateUrl: 'js/app/partials/quiz/quiz.html',
        resolve: {
            foundQuiz: function($stateParams, $state, TopicResource) {
                return TopicResource.getQuiz($stateParams['topic'], $stateParams['quiz']);
            }
        },
        controller: 'QuizCtrl'
    });

    $stateProvider.state('topicQuiz.topicQuizEditing', {
        url: "/edit",
        template: '<div hci-quiz quiz="quiz"></div>'
    });

    $stateProvider.state('addTopicQuiz', {
        url: "/topics/:topic/quiz/new",
        templateUrl: 'js/app/partials/quiz/addquiz.html'
    });
});

quiz.controller('QuizCtrl', function($scope, $state, $stateParams, $log, TopicResource, foundQuiz) {
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

quiz.directive('hciQuiz', function(TopicResource, $state, $stateParams) {
    return {
        templateUrl: 'js/app/partials/directive/quiz.html',
        scope: {
            'quiz': '=?'
        },
        controller: function($scope) {
            var self = this;

            this.newAnswer = function() {
                return {
                    correct: false,
                    text: ""
                };
            };

            this.newQuestion = function() {
                return {
                    title: 'Enter a question title',
                    answers: [self.newAnswer()]
                };
            };

            this.addQuestion = function(question) {
                $scope.quiz.questions.push(angular.copy(question));
            };

            $scope.newItem = function() {
                self.addQuestion(self.newQuestion());
            };

            $scope.finish = function() {
                TopicResource.saveQuiz($stateParams['topic'], $scope.quiz);
                $state.go('topicQuiz', {topic: $stateParams['topic'], quiz: $scope.quiz.name, quizEditing: false}, {reload: true});
            };

            if(angular.isUndefined($scope.quiz)) {
                $scope.quiz = {
                    title: 'Untitled Quiz',
                    description: '',
                    questions: [self.newQuestion()]
                };
            }
        }
    }
});

quiz.directive('hciEditQuizItem', function() {
    return {
        templateUrl: 'js/app/partials/directive/editQuizItem.html',
        require: '^hciQuiz',
        scope: {
            question: '=',
            edit: '&'
        },
        link: function($scope, $elem, $attrs, controller) {
            $scope.addAnswer = function() {
                $scope.question.answers.push(controller.newAnswer());
            };

            $scope.removeAnswer = function(idx) {
                $scope.question.answers.splice(idx, 1);
            };

            $scope.done = function() {
                $scope.isEditing = false;
            };

            $scope.setEditing = function(editing) {
                $scope.isEditing = editing;
            };

            $scope.isEditing = $scope.edit();
        }
    }
});