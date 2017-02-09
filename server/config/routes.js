var express = require('express'); // Require block
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db = require('./config.js');
var User = require('../database.js');
var moment = require('moment'); //momentjs is a library for working with dates and times
var stripe = require("stripe")("sk_test_Q5lTBRirLvXbx84BdkyXyyfZ");


//authentication middleware
var cookieParser = require('cookie-parser');
var passport = require('passport'); //http://passportjs.org/docs/overview
var LocalStrategy = require('passport-local').Strategy; //https://github.com/jaredhanson/passport-local

var app = express(); // Instantiate app

// Authentication block
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//static assets
app.use(express.static(__dirname + '/../../public/'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//authentication middleware
passport.use(new LocalStrategy(User.authenticate()));

//http://passportjs.org/docs/configure
//gives the user a cookie that contains the user's id so the session is user-specific
passport.serializeUser(User.serializeUser(function(user, done) {
  done(null, user.id);
}));
passport.deserializeUser(User.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
}));

//only allows http requests to tasks to go through if a user is authenticated
var checkCredentials = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('#/signin'); //not needed for CheckLoggedIn
  }
};

app.get('/', checkCredentials, function(req, res) {
  res.send(user);
});

app.post('/payment', function(req, res) {

  console.log('PAYMENT POSTED', req.body.token);

  var token = req.body.token;

  var charge = stripe.charges.create({
    amount: 1000,
    currency: "usd",
    description: "Example charge",
    source: token,
  }, function(err, charge) {
    console.log('error', err, charge);
  });

  res.send(charge);
});

//add a new user
//http://mherman.org/blog/2015/01/31/local-authentication-with-passport-and-express-4/
app.post('/signup', function(req, res) {
  //User.register is passport local mongoose method. It checks to see if a username already exists, and only signs the new user up if it does not.
  User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
    if (err) {
      console.error(err);
    }
    passport.authenticate('local')(req, res, function() {
      //204 is the only code that yields a "success" for the ajax request
      res.status(204).send('You are signed up');
    });
  });
});

//Sign in an existing user. Passport.authenticate checks the password and sends back the cookie if correct (using serializeUser)
app.post('/signin', passport.authenticate('local'), function(req, res) {
  res.status(204).send('You are signed in');
});

app.post('/signout', function(req, res) {
  req.logout();
  res.status(204).send('You are signed out');
});

//add a new task for a user
app.post('/tasks', checkCredentials, function(req, res) {
  User.findOne({ _id: req.user._id }, //this comes from the cookie
    //push a new task into the tasks array
    function(err, user) {
      if (!err) {
        if (!user) {
          console.log("User doesn't exist, please sign up.");
        } else {
          if (user.tasks.id(req.body._id)) {
            var taskToUpdate = user.tasks.id(req.body._id);
            //console.log('FOUND TASK to update', taskToUpdate);
            taskToUpdate.task = req.body.task;
            taskToUpdate.project = req.body.project;
            taskToUpdate.projectArray = req.body.projectArray;
            taskToUpdate.start_time = req.body.start_time;
            taskToUpdate.end_time = req.body.end_time;
            taskToUpdate.total_time = moment(req.body.end_time).diff(moment(req.body.start_time), 'minutes'); //momentjs -- calculates elapsed time in minutes
            taskToUpdate.currentTask = req.body.currentTask;
            taskToUpdate.lastIncrement = req.body.lastIncrement;
            taskToUpdate.started = req.body.started;
            //console.log('UPDATED TASK', taskToUpdate);
          } else {
            user.tasks.push({
              task: req.body.task,
              project: req.body.project,
              projectArray: req.body.projectArray,
              start_time: moment(req.body.start_time).format('lll'),
              end_time: moment(req.body.end_time).format('lll'),
              total_time: moment(req.body.end_time).diff(moment(req.body.start_time), 'minutes'), //momentjs -- calculates elapsed time in minutes
              currentTask: req.body.currentTask,
              lastIncrement: req.body.lastIncrement,
              started: req.body.started
            });
          }
          user.save(function(err) {
            if (!err) {
              console.log("user task added", req.body.task);
            } else {
              console.log("Error: could not save user.task " + req.body.task);
            }
          });
        }
        res.status(204).send(user.tasks);
      } else {
        //if err
        console.log('ERROR', err);
      }
    }
  );
});

//get all tasks for a user
app.get('/tasks', checkCredentials, function(req, res) {
  User.findOne({ _id: req.user._id }) //req.user._id comes from the cookie
    .then(function(user) {
      res.send(user.tasks);
    })
    .catch(function(err) {
      console.error(err);
    });
});

/* FOR TESTING */

app.get('/users', function(req, res) {
  User.find({}) //req.user._id comes from the cookie
    .then(function(user) {
      res.send(user);
    })
    .catch(function(err) {
      console.error(err);
    });
});

app.get('/user', function(req, res) {
   User.findOne({ _id: req.user._id }) //req.user._id comes from the cookie
    .then(function(user) {
      res.send(user);
    })
    .catch(function(err) {
      console.error(err);
    });
});

module.exports = app;
