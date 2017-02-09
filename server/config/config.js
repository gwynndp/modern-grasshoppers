var mongoose = require('mongoose');  // Require block

var databasepath = 'mongodb://localhost/whathaveidone'; // Local host

mongoose.connect(databasepath); // Set up connection

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'CONNECTION ERROR:')) // Test database connection

db.once('open', function() { 
	console.log("CONNECTION SUCCEEDED");
});

module.exports = db; // Export database