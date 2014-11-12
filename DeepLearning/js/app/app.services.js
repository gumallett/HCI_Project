var app = angular.module('hci');

app.factory('TopicResource', function() {
    var topicsJson = [
        {
            heading: 'Robotics 101',
            description: 'Montclair State University',
            imgUrl: 'img/team/1.jpg',
            keywords: ['robotics', 'montclair'],
            name: 'robotics'
        },
        {
            heading: 'CS 101',
            description: 'MIT Robotic Notes',
            imgUrl: 'img/team/2.jpg',
            keywords: ['cs', 'computer science', 'intro'],
            name: 'csintro'
        },
        {
            heading: 'Image sensors',
            description: 'Python update 2014',
            imgUrl: 'img/team/3.jpg',
            keywords: ['image','images','python'],
            name: 'imagesensors'
        },
        {
            heading: 'HCI',
            description: 'Robotics and Human interaction',
            imgUrl: 'img/team/4.jpg',
            keywords: ['robotics', 'hci'],
            name: 'hci'
        }
    ];

    var topicJson = {
        robotics: {
            heading: 'Robotics 101'
        }
    };

    return {
        getTopics: function(query) {
            if(!query || query == '') {
                return topicsJson;
            }

            var regex = new RegExp('(\b|^)' + query + '($|\b)', 'i');
            var arr = [];

            angular.forEach(topicsJson, function(elem) {
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
        },
        getTopic: function(topic) {
            return topicJson[topic];
        }
    }
});