var app = angular.module('hci', ['ngSanitize','ui.router','textAngular','ui.bootstrap','hci.services','hci.quiz','hci.flashcard']);

app.config(function($stateProvider, $urlRouterProvider, $provide) {
    $urlRouterProvider.otherwise("/");

    /*$stateProvider.state('home', {
        url: "/",
        templateUrl: 'js/app/partials/home.html'
    });*/

    $stateProvider.state('about', {
        url: "/about",
        templateUrl: 'js/app/partials/about.html'
    });

    $stateProvider.state('help', {
        url: "/help",
        templateUrl: 'js/app/partials/help.html'
    });

    $stateProvider.state('topics', {
        url: "/?q",
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
            },
            foundQuizzes: function() {
                return [];
            }
        },
        controller: 'TopicCtrl'
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

app.controller('TopicsCtrl', function($scope, $stateParams, foundTopics) {
    $scope.foundTopics = foundTopics;
    $scope.q = $stateParams.q;
});

app.controller('TopicCtrl', function($scope, $rootScope, $state, $stateParams, TopicResource, foundTopic, foundQuizzes) {
    $rootScope.topic = foundTopic;
    $rootScope.editMode = false;
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
                if(scope.q && scope.q.indexOf('flashcard') != -1) {
                    $state.go('topicFlashcards', {topic: 'robotics'});
                }
                else if(scope.q && scope.q.indexOf('quiz') != -1) {
                    $state.go('topicQuizzes', {topic: 'robotics'});
                }
                else {
                    $state.go('topics',{q:scope.q});
                }
            }
        }
    }
});

