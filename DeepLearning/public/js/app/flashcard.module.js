var flashcard = angular.module('hci.flashcard', ['ngSanitize','ui.router','ui.bootstrap','hci.services']);

flashcard.config(function($stateProvider) {
    $stateProvider.state('topicFlashcards', {
        url: "/topics/:topic/flashcards",
        templateUrl: 'js/app/partials/flashcard/flashcards.html',
        resolve: {
            flashcards: function($stateParams, TopicResource) {
                return TopicResource.getFlashcards($stateParams['topic']);
            }
        },
        controller: 'FlashcardsCtrl'
    });

    $stateProvider.state('topicFlashcard', {
        url: "/topics/:topic/flashcards/:flashcard",
        templateUrl: 'js/app/partials/flashcard/flashcardpage.html',
        resolve: {
            foundFlashcards: function($stateParams, $state, TopicResource) {
                return TopicResource.getFlashcards($stateParams['topic'], $stateParams['flashcard']);
            }
        },
        controller: 'FlashcardCtrl'
    });
});

flashcard.controller('FlashcardCtrl', function($scope, foundFlashcards) {
    $scope.flashcards = foundFlashcards;
});

flashcard.controller('FlashcardsCtrl', function($scope, $stateParams, flashcards) {
    $scope.flashcards = flashcards;
    $scope.topicName = $stateParams['topic'];
});

flashcard.directive('hciFlashCard', function() {
    return {
        templateUrl: 'js/app/partials/directive/flashcard.html',
        scope: {
            flashcard: '=hciFlashCard'
        },
        link: function($scope, $elem, $attrs, controller) {

        }
    }
});