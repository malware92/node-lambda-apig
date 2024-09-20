const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' }); // Asegúrate de configurar la región

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: 'Users',
  Item: {
    username: 'admin',
    password: 'admin'
  }
};

dynamoDb.put(params, (err, data) => {
  if (err) {
    console.error("Unable to add user. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("PutItem succeeded:", JSON.stringify(data, null, 2));
  }
});