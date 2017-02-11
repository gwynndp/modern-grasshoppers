var app = require('./config/routes.js'); // Import config routes

var port = process.env.PORT || 8000; // Set up port

app.listen(port, function() {
  console.log('Server now listening on port: ' + port);
});
