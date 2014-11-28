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

var getTopicJsonFile = function(topic) {
    return "server/topics/" + topic + ".json";
};

module.exports = {
    "getAll": function() {
        return topicsJson;
    },
    "get": function(topic) {
        var file = getTopicJsonFile(topic);
        try {
            return JSON.parse(fs.readFileSync(file, 'utf-8'));
        }
        catch(err) {
            console.log(err);
            return null;
        }
    },
    "save": function(name, topic) {
        if(!topic || !name) {
            return;
        }

        var file = getTopicJsonFile(name);
        console.log("Saving " + name + " to " + file);

        try {
            fs.writeFileSync(file, JSON.stringify(topic));
        }
        catch(err) {
            console.log(err);
            return false;
        }

        return true;
    }
};