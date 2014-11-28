var fs = require('fs');

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

module.exports = {
    "getAll": function() {
        return topicsJson;
    },
    "get": function(topic) {
        var file = "server/topics/" + topic + ".json";
        try {
            return JSON.parse(fs.readFileSync(file, 'utf-8'));
        }
        catch(err) {
            console.log(err);
            return null;
        }
    }
};