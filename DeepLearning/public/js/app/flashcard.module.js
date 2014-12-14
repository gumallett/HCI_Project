var flashcard = angular.module('hci.flashcard', ['ngSanitize','ui.router','ui.bootstrap','hci.services']);

flashcard.config(function($stateProvider) {
    $stateProvider.state('topicFlashcards', {
        url: "/topics/:topic/flashcards",
        templateUrl: 'js/app/partials/flashcard/flashcardpage.html',
        resolve: {
            flashcards: function($stateParams, $state, FlashcardResource) {
                return FlashcardResource.getFlashcards($stateParams['topic'], 'flashcards');
            }
        },
        controller: 'FlashcardsCtrl'
    });

    $stateProvider.state('newFlashcards', {
        url: "/topics/:topic/flashcards/:flashcard/new",
        templateUrl: 'js/app/partials/flashcard/newflashcards.html',
        controller: 'NewFlashcardCtrl'
    });
});

flashcard.controller('FlashcardsCtrl', function($scope, $stateParams, FlashcardResource, flashcards) {
    $scope.flashcards = flashcards;
    $scope.topicName = $stateParams['topic'];
    $scope.editPage = false;

    $scope.edit = function(edit) {
        $scope.editPage = edit;
    };

    $scope.$on('flashcardSave', function(event) {
        FlashcardResource.saveFlashcards($stateParams['topic'], $scope.flashcards);
    });

    $scope.$on('flashcardCancel', function(event, flashcard) {
        $scope.flashcards.flashcards.splice(flashcard, 1);
    });

    $scope.addNew = function() {
        $scope.flashcards.flashcards.splice(0, 0, {

        });
    }
});

flashcard.controller('NewFlashcardCtrl', function($scope, $stateParams) {

});

flashcard.directive('hciFlashcards', function($stateParams, FlashcardResource) {

});

flashcard.directive('hciFlashCard', function($stateParams, FlashcardResource) {
    return {
        templateUrl: 'js/app/partials/directive/flashcard.html',
        scope: {
            flashcard: '=hciFlashCard',
            editing: '&hciFlashCardEdit',
            idx: '@hciFlashCardIdx',
            editPage: '&editPage'
        },
        link: function($scope, $elem, $attrs, controller) {
            $scope.editing = $scope.editing();

            $scope.$watch(function(){return $scope.editPage();}, function(newval) {
                $scope.editMode = newval;
            });

            $scope.edit = function() {
                $scope.editing = true;
            };

            $scope.save = function(idx) {
                $scope.editing = false;

                if($scope.flashcard.front && $scope.flashcard.back) {
                    $scope.$emit('flashcardSave');
                }
                else {
                    $scope.$emit('flashcardCancel', idx);
                }
            }
        }
    }
});