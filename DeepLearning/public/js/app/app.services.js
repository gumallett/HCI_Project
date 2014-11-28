var app = angular.module('hci');

app.factory('TopicResource', function($http) {

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
        getTopic: function(topic) {
            return $http.get('/topics/'+topic).then(function(topicJson) {
                return topicJson.data;
            });
        },
        save: function(topicName, topic) {
            return $http.post('/topics/'+topicName, topic);
        }
    }
});