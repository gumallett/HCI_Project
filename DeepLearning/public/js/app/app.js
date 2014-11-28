var app = angular.module('hci', ['ngSanitize','ui.router','textAngular']);

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
        }
    }
});

app.directive('hciSearch', function($state) {
    return {
        templateUrl: 'js/app/partials/search.html',
        link: function(scope) {
            scope.state = $state;
            scope.search = function() {
                $state.go('topics',{q:scope.q});
            }
        }
    }
});