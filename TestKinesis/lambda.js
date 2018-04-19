let AWS = require('aws-sdk');
const kinesis = new AWS.Kinesis();
exports.handler = function (event, context, callback) {


	kinesis.describeStream({
		StreamName: 'Kinesis-resource'
	}).promise()
		.then(data => {
			// your logic goes here
		})
		.catch(err => {
			// error handling goes here
		});

	callback(null, 'Successfully executed');
}