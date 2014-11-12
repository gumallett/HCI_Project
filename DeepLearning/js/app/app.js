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
        url: "/topics",
        templateUrl: 'js/app/partials/topics.html'
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

app.directive('hciSearch', function() {
    return {
        templateUrl: 'js/app/partials/search.html'
    }
});