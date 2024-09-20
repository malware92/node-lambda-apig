const jwt = require('jsonwebtoken');
const SECRET_KEY = 'ABC123';

const generateToken = (username) => {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
};

const authorize = (event) => {
    const token = event.headers.Authorization || event.headers.authorization;
    if (!token) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Unauthorized' }),
      };
    }
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
    } catch (err) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Unauthorized' }),
      };
    }
  };

module.exports = {
  generateToken,
  authorize
};