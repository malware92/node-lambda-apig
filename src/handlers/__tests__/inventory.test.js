const AWS = require('aws-sdk-mock');
const { getInventory, putInventory, deleteInventory } = require('../inventory');
const moment = require('moment');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6eyJwYXNzd29yZCI6ImFkbWluIiwidXNlcm5hbWUiOiJhZG1pbiJ9LCJpYXQiOjE3MjY4MzkzMzYsImV4cCI6MTcyNjg0MjkzNn0.YOGqj8m9QM2ane94iv_8ZMt1B_rb2AaZLMJ4TtPyX-A';

describe('Inventory Handlers', () => {
  beforeAll(() => {
    AWS.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
      callback(null, { Items: [{ productName: 'Test Product', productStock: 10, productLastUpdate: '2023-09-20 12:00:00' }] });
    });

    AWS.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
      callback(null, {});
    });

    AWS.mock('DynamoDB.DocumentClient', 'delete', (params, callback) => {
      callback(null, {});
    });
  });

  afterAll(() => {
    AWS.restore('DynamoDB.DocumentClient');
  });

  test('getInventory should return inventory items', async () => {
    const event = { headers: { Authorization: token } };
    const result = await getInventory(event);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual([{ productName: 'Prodcut One', productStock: 30, productLastUpdate: '2024-09-20 13:58:54' }]);
  });

  test('putInventory should insert an item', async () => {
    const event = {
      headers: { Authorization: token },
      body: JSON.stringify({ productName: 'New Product', productStock: 20 }),
    };
    const result = await putInventory(event);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({ message: 'Item inserted successfully' });
  });

  test('deleteInventory should delete an item', async () => {
    const event = {
      headers: { Authorization: token },
      body: JSON.stringify({ productName: 'Test Product' }),
    };
    const result = await deleteInventory(event);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({ message: 'Item deleted successfully' });
  });
});