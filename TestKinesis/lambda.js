let AWS = require('aws-sdk');
const kinesis = new AWS.Kinesis();
exports.handler = function (event, context, callback) {
	request = JSON.stringify(event.body)
	kinesis.putRecord({
		Data: request,
		PartitionKey: '0',
		StreamName: 'Kinesis-put'
	}).promise()
		.then(data => {
			// your logic goes here
			console.log('Response -> data:', data);
			let response = {
				'statusCode': 200,
				'headers': {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json'
				},
				'body': JSON.stringify({
					'Code': 'PutRecordSuccessful',
					'Message': 'Record was successfully put to Kinesis put',
					'Data': data
				}),
				'isBase64Encoded': false
			};
			callback(null, response);
		})
		.catch(err => {
			// error handling goes here
			console.log('Response -> error:', err);
            let response = {
                'statusCode': err.statusCode,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'body': JSON.stringify({
                    'Code': err.code,
                    'Message': err.message
                }),
                'isBase64Encoded': false
            };
			callback(null, response);
		});
}