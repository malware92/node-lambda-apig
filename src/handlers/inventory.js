const { authorize } = require('../utils/security');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const moment = require('moment');

const getInventory = async (event) => {
    const authorized = authorize(event);
    if (authorized.statusCode) {
        return authorized;
    }

    const params = {
        TableName: 'Inventory',
    };
    try {
        const result = await dynamoDb.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(result.Items),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
        };
    } catch (error) {
        console.log("🚀 ~ getInventory ~ error:", error.message)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }

}

const putInventory = async (event) => {
    const authorized = authorize(event);
    if (authorized.statusCode) {
        return authorized;
    }

    const { productName, productStock } = JSON.parse(event.body);
    const productLastUpdate = moment().format('YYYY-MM-DD HH:mm:ss');

    const params = {
        TableName: 'Inventory',
        Item: {
            productName,
            productStock,
            productLastUpdate,
        },
    };

    try {
        await dynamoDb.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Item inserted successfully' }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};

const deleteInventory = async (event) => {
    const authorized = authorize(event);
    if (authorized.statusCode) {
        return authorized;
    }

    const { productName } = JSON.parse(event.body);

    const params = {
        TableName: 'Inventory',
        Key: {
            productName,
        },
    };

    try {
        await dynamoDb.delete(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Item deleted successfully' }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};

module.exports = {
    getInventory,
    putInventory,
    deleteInventory,
};