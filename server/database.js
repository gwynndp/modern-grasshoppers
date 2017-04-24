var mongoose = require('mongoose');
var moment = require('moment');
var passportLocalMongoose = require('passport-local-mongoose');

var db = require('./config/config.js');

//This is the only table. All tasks live inside a user.
var userSchema = mongoose.Schema({
  username: String,
  password: String,
  projectArray: [],
  tasks: [{
    task: String,
    start_time: Date,
    end_time: Date,
    total_time: Number, //minutes
    project: String,
    currentTask: Boolean
  }]
})

//https://github.com/saintedlama/passport-local-mongoose
//adds methods to help with authentication
userSchema.plugin(passportLocalMongoose);


var User = mongoose.model("User", userSchema)

// UNCOMMENT TO EMPTY DATABASE
// User.remove({}, function(err) {
//   console.log('removed');
// })

module.exports = User;

