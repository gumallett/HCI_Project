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
            foundTopics: function($stateParams, $log, TopicResource) {
                $log.log($stateParams);
                return TopicResource.getTopics($stateParams['q']);
            }
        },
        controller: 'TopicsCtrl'
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