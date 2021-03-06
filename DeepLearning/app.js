var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var logger = require('morgan');
var topics = require('./server/topics');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/topics', function(req, res) {
    res.send(topics.getAll());
});

app.param('topic', function(req, res, next, topic) {
    req.topic = topic;
    next();
});

app.param('quiz', function(req, res, next, quiz) {
    req.quiz = quiz;
    next();
});

app.param('flashcard', function(req, res, next, flashcard) {
    req.flashcard = flashcard;
    next();
});

app.route('/topics/:topic')
    .get(function(req, res, next) {
        var topic = topics.get(req.topic);

        if(topic) {
            res.send(topic);
        }
        else {
            next();
        }
    })
    .post(function(req, res, next) {
        var success = topics.save(req.topic, req.body);

        if(success) {
            res.send("OK");
        }
        else {
            next();
        }
    });

app.route('/topics/:topic/quizzes')
    .get(function(req, res, next) {
        var quizzes = topics.getTopicQuizzes(req.topic);

        if(quizzes) {
            res.send(quizzes);
        }
        else {
            next();
        }
    });

app.route('/topics/:topic/flashcards')
    .get(function(req, res, next) {
        var flashcards = topics.getTopicFlashcards(req.topic);

        if(flashcards) {
            res.send(flashcards);
        }
        else {
            next();
        }
    });


app.route('/topics/:topic/quizzes/:quiz')
    .get(function (req, res, next) {
        console.log("Getting quiz: " + req.quiz);
        var quiz = topics.getTopicQuiz(req.topic, req.quiz);

        if(quiz) {
            res.send(quiz);
        }
        else {
            next();
        }
    })
    .put(function(req, res, next) {
        var success = topics.saveQuiz(req.topic, req.body.name, req.body);

        if(success) {
            res.send("OK");
        }
        else {
            throw 'Failed to save quiz'
        }
    });

app.route('/topics/:topic/flashcards/:flashcard')
    .get(function (req, res, next) {
        console.log("Getting flashcards: " + req.flashcard);
        var cards = topics.getTopicFlashcard(req.topic, req.flashcard);

        if(cards) {
            res.send(cards);
        }
        else {
            next();
        }
    })
    .put(function(req, res, next) {
        var success = topics.saveFlashcards(req.topic, req.body.name, req.body);

        if(success) {
            res.send("OK");
        }
        else {
            throw 'Failed to save flashcards'
        }
    });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err);
        res.status(err.status || 500);
        res.send(""+err);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.send(err.message);
});


module.exports = app;
