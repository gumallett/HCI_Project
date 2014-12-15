var quiz = angular.module('hci.quiz', ['ngSanitize','ui.router','ui.bootstrap','hci.services']);

quiz.config(function($stateProvider) {
    $stateProvider.state('topicQuizzes', {
        url: "/topics/:topic/quiz",
        templateUrl: 'js/app/partials/quiz/quizzes.html',
        resolve: {
            foundQuizzes: function($stateParams, $state, QuizResource) {
                return QuizResource.getQuizzes($stateParams['topic']);
            }
        },
        controller: 'QuizzesCtrl'
    });

    $stateProvider.state('topicQuiz', {
        url: "/topics/:topic/quizzes/:quiz",
        templateUrl: 'js/app/partials/quiz/quiz.html',
        resolve: {
            foundQuiz: function($stateParams, $state, QuizResource) {
                return QuizResource.getQuiz($stateParams['topic'], $stateParams['quiz']);
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

quiz.controller('QuizzesCtrl', function($scope, $state, $stateParams, foundQuizzes) {
    $scope.$state = $state;
    $scope.quizzes = foundQuizzes;
    $scope.topicName = $stateParams['topic'];
});

quiz.controller('QuizCtrl', function($scope, $state, $stateParams, foundQuiz) {
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

    $scope.isCorrect = function($index) {
        return $scope.submittedAnswers[$index] == $scope.correctAnswers()[$index] || $scope.correctAnswers()[$index] === 'none';
    };

    $scope.getNumCorrect = function() {
        var count = 0;

        angular.forEach($scope.submittedAnswers, function(val, idx) {
            if($scope.isCorrect(idx)) {
                count++;
            }
        });

        return count;
    }
});

quiz.directive('hciQuiz', function(QuizResource, $state, $stateParams) {
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
                QuizResource.saveQuiz($stateParams['topic'], $scope.quiz);
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