require('dotenv').config();

if(!process.env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET');
}

const config = {
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGOURL: process.env.MONGODB_URI || 'mongodb://localhost/passport-example'
};

module.exports = config;
