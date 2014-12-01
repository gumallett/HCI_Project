var app = angular.module('hci', ['ngSanitize','ui.router','textAngular','ui.bootstrap']);

app.config(function($stateProvider, $urlRouterProvider, $provide) {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state('home', {
        url: "/",
        templateUrl: 'js/app/partials/home.html'
    });

    $stateProvider.state('about', {
        url: "/about",
        templateUrl: 'js/app/partials/about.html'
    });

    $stateProvider.state('topics', {
        url: "/topics?q",
        templateUrl: 'js/app/partials/topics.html',
        resolve: {
            foundTopics: function($stateParams, TopicResource) {
                return TopicResource.getTopics($stateParams['q']);
            }
        },
        controller: 'TopicsCtrl'
    });

    $stateProvider.state('topic', {
        url: "/topics/:topic",
        templateUrl: 'js/app/partials/topic.html',
        resolve: {
            foundTopic: function($stateParams, $state, TopicResource) {
                var topic = TopicResource.getTopic($stateParams['topic']);

                if(angular.isUndefined(topic)) {
                    throw 'topic not found: '+$stateParams['topic'];
                }

                return topic;
            }
        },
        controller: 'TopicCtrl'
    });

    $stateProvider.state('topicFlashcards', {
        url: "/topics/:topic/flashcards",
        templateUrl: 'js/app/partials/flashcards.html',
        resolve: {
            foundTopic: function($stateParams, $state, TopicResource) {
                var topic = TopicResource.getTopic($stateParams['topic']);

                if(angular.isUndefined(topic)) {
                    throw 'topic not found: '+$stateParams['topic'];
                }

                return topic;
            }
        },
        controller: 'TopicCtrl'
    });

    $stateProvider.state('topicQuiz', {
        url: "/topics/:topic/quiz",
        templateUrl: 'js/app/partials/quiz.html',
        resolve: {
            foundTopic: function($stateParams, $state, TopicResource) {
                var topic = TopicResource.getTopic($stateParams['topic']);

                if(angular.isUndefined(topic)) {
                    throw 'topic not found: '+$stateParams['topic'];
                }

                return topic;
            }
        },
        controller: 'TopicCtrl'
    });

    $stateProvider.state('addTopicQuiz', {
        url: "/topics/:topic/quiz/new",
        templateUrl: 'js/app/partials/addquiz.html',
        controller: 'QuizCtrl'
    });

    // text editor config
    $provide.decorator('taOptions', ['$delegate', function(taOptions) {
        taOptions.toolbar = [
            ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'pre', 'quote'],
            ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear']
        ];

        return taOptions;
    }]);
});

app.run(function($rootScope, $log) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        $log.warn(error);
    });
});

app.directive('hciNav', function($state, $stateParams) {
    return {
        templateUrl: 'js/app/partials/nav.html',
        link: function(scope) {
            scope.state = $state;
            scope.stateParams = $stateParams;

            scope.topicHome = function() {
                $state.go('topic', {'topic' : $stateParams['topic']});
            }
        }
    }
});

app.directive('hciEditToggle', function(TopicResource, $stateParams, $rootScope) {
    return {
        templateUrl: 'js/app/partials/directive/editToggle.html',
        link: function(scope) {
            $rootScope.editMode = false;

            scope.edit = function() {
                $rootScope.editMode = true;
            };

            scope.save = function() {
                TopicResource.save($stateParams['topic'], $rootScope.topic);
                $rootScope.editMode = false;
            };
        }
    }
});

app.directive('hciSearch', function($state) {
    return {
        templateUrl: 'js/app/partials/search.html',
        link: function(scope, $elem, $attrs) {
            scope.state = $state;
            scope.inputSize = $attrs['inputSize'];
            var input = angular.element($elem.find("input"));

            if(angular.isUndefined(scope.inputSize)) {
                scope.inputSize = 40;
            }

            input.attr('size', scope.inputSize);

            scope.search = function() {
                $state.go('topics',{q:scope.q});
            }
        }
    }
});

app.directive('hciQuiz', function($log) {
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

            if(angular.isUndefined($scope.quiz)) {
                $scope.quiz = {
                    title: 'Untitled Quiz',
                    questions: [self.newQuestion()]
                };
            }
        }
    }
});

app.directive('hciEditQuizItem', function($log) {
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