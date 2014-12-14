angular.module('hci.services', [])

.factory('TopicResource', function($http) {

    return {
        getTopics: function(query) {
            return $http.get('/topics').then(function(topicsJson) {
                if(!query || query == '') {
                    return topicsJson.data;
                }

                var regex = new RegExp('(\b|^)' + query + '($|\b)', 'i');
                var arr = [];

                angular.forEach(topicsJson.data, function(elem) {
                    var keywords = elem.keywords;
                    // search whole words only
                    for(var i=0; i<keywords.length; i++) {
                        if(regex.test(keywords[i])) {
                            arr.push(elem);
                            break;
                        }
                    }
                });

                return arr;
            });
        },
        getQuizzes: function(topic) {
            return $http.get('/topics/'+topic+"/quizzes").then(function(topicJson) {
                return topicJson.data;
            });
        },
        getQuiz: function(topic, quiz) {
            return $http.get('/topics/'+topic+"/quizzes"+"/"+quiz+".json").then(function(quizJson) {
                return quizJson.data;
            });
        },
        getFlashcards: function(topic, flashcardName) {
            if(!flashcardName) {
                return $http.get('/topics/'+topic+"/flashcards").then(function(fcJson) {
                    return fcJson.data;
                });
            }

            return $http.get('/topics/'+topic+"/flashcards"+"/"+flashcardName+".json").then(function(fcJson) {
                return fcJson.data.flashcards;
            });
        },
        getTopic: function(topic) {
            return $http.get('/topics/'+topic).then(function(topicJson) {
                return topicJson.data;
            });
        },
        save: function(topicName, topic) {
            return $http.post('/topics/'+topicName, topic);
        },
        saveQuiz: function(topicName, quiz) {
            var quizName;

            if(quiz.name) {
                quizName = quiz.name;
            }
            else {
                var safeTitle = quiz.title.replace(/[: ]/g,'_');
                quizName = encodeURI(safeTitle);
                quiz.name = quizName;
            }

            return $http.put('/topics/' + topicName + '/quizzes/'+quizName, quiz);
        }
    }
});