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
            heading: 'Robotics 101',
            flashcardspage: 'js/app/partials/Flash Card - Robotics.html',
            quizpage: 'js/app/partials/RoboticsQuiz.html',
            content: 'Robotics is the branch of mechanical engineering, electrical engineering and computer science that deals with the design, construction, operation, and application of robots,for their control, sensory feedback, and information processing.These technologies deal with automated machines that can take the place of humans in dangerous environments or manufacturing processes, or resemble humans in appearance, behavior, and/or cognition. Many of today\'s robots are inspired by nature contributing to the field of bio-inspired robotics.The concept of creating machines that can operate autonomously dates back to classical times, but research into the functionality and potential uses of robots did not grow substantially until the 20th <br/><br/>The concept of creating machines that can operate autonomously dates back to classical times, butresearch into the functionality and potential uses of robots did not grow substantially until the 20th century.  Throughout history, robotics has been often seen to mimic human behavior, and often manage tasks in a similar fashion. Today, robotics is a rapidly growing field, as technological advances continue, research, design, and building new robots serve various practical purposes, whether domestically, commercially, or militarily. Many robots do jobs that are hazardous to people such as defusing bombs, mines and exploring shipwrecks.<br/><br/>To view robotics as an application of the principles of motions together with motors to provide motion and sensors to provide location and velocity may miss the inherent complexity of the discipline. A real robot does face potential for errors due to a number of reasons, including: incorrect parameter (for example: mass, direction, distance) values, frictional forces and terrain estimations, play at the link joints, calibration errors in sensors, errors in the values read from the sensors. The resulting errors in robot actions need corrections; preferably, without any explicit human help. These corrections cannot be precomputed by using the laws of physics and must be generated, as they are detected, by the robot as it executes the operation to enhance their ability to avoid immobilization, accommodate degraded performance and even self-recover. The needed correction differs from one repetition of an operation to the next due to unpredictability of many of the influences.'+

                '<br/><br/><strong>Additional Sources and Supplemental Materials:</strong> \n' +
                '<ul>\n' +
                '<li><a href="http://ocw.mit.edu/courses/mechanical-engineering/2-12-introduction-to-robotics-fall-2005/lecture-notes/" target="_blank">' +
                'MIT’s Open Course Platform: Intro To Robotics Course</a></li>\n' +
                '<li><a href="http://mechatronics.poly.edu/smart/pdf/intro2robotics.pdf" target="_blank">PolyTech Institute: Introduction to Robotics EBook</a></li>\n' +
                '<li><a href="http://www.dkriesel.com/_media/science/neuronalenetze-en-zeta2-2col-dkrieselcom.pdf" target="_blank">Neural Networks EBook</a></li>\n' +
                '</ul>'
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