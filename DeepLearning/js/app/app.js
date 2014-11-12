var app = angular.module('hci', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
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
});

app.run(function($rootScope, $log) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        $log.warn(error);
    });
});

app.directive('hciNav', function($state) {
    return {
        templateUrl: 'js/app/partials/nav.html',
        link: function(scope) {
            scope.state = $state;
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