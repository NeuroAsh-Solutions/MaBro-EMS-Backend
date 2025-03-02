const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Verify important variables
if (!process.env.JWT_SECRET) {
  console.error('⚠️ JWT_SECRET environment variable is not set!');
}

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV || 'development'
};
