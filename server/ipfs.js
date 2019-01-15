var request = require('request');
var fs = require('fs')

var options = {
    url: 'http://10.1.2.27:5001/api/v0/pubsub/sub?arg=cow'
};

var request = require('request');
request('http://10.1.2.27:5001/api/v0/pubsub/sub?arg=lizard', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
