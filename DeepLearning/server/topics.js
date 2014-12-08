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

var getTopicPath = function(topic) {
    return "server/topics/" + topic;
};

var getTopicJsonFile = function(topic) {
    return "server/topics/" + topic + ".json";
};

var getTopicQuizJsonFile = function(topic, quizName) {
    return "server/topics/" + topic + "/quizzes/"+quizName+".json";
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
    },
    "getTopicQuizzes": function(topic) {
        var quizDir = getTopicPath(topic) + "/quizzes";

        if(!fs.existsSync(getTopicPath(topic))) {
            return null;
        }

        if(fs.existsSync(quizDir)) {
            var names = fs.readdirSync(quizDir);
            var arr = [];

            names.forEach(function(val) {
                console.log(val);
                var quizJson = JSON.parse(fs.readFileSync(quizDir + "/" + val, 'utf-8'));
                arr.push(quizJson);
            });

            return arr;
        }

        return [];
    },
    "getTopicQuiz": function(topic, quiz) {
        var quizPath = getTopicPath(topic) + "/quizzes" + "/" + quiz;
        console.log("Getting quiz: " + quizPath);

        if(fs.existsSync(quizPath)) {
            return JSON.parse(fs.readFileSync(quizPath, 'utf-8'));
        }

        return null;
    },
    "saveQuiz": function(topicName, quizName, quiz) {
        console.log("saving quiz, topic: "+topicName+" "+" quizName: "+ quizName, " quiz: "+JSON.stringify(quiz));

        if(!quiz || !topicName || !quizName) {
            return;
        }

        if(!fs.existsSync("server/topics/" + topicName)) {
            fs.mkdirSync("server/topics/" + topicName);
        }

        if(!fs.existsSync("server/topics/" + topicName + "/quizzes")) {
            fs.mkdirSync("server/topics/" + topicName + "/quizzes");
        }

        var file = getTopicQuizJsonFile(topicName, quizName);
        console.log("Saving " + quiz.title + " to " + file);
        quiz.name = quizName;

        fs.writeFileSync(file, JSON.stringify(quiz));

        return true;
    }
};