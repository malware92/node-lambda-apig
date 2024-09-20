const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { generateToken } = require('../utils/security');

exports.handler = async (event) => {
  const { username, password } = JSON.parse(event.body);

  const params = {
    TableName: 'Users',
    Key: {
      username: username,
    },
  };

  try {
    const result = await dynamoDb.get(params).promise();
    console.log("🚀 ~ exports.handler= ~ result:", result)
    const user = result.Item;

    if (user && user.password === password) {
      const token = generateToken(user);
      return {
        statusCode: 200,
        body: JSON.stringify({ token }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Unauthorized' }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};