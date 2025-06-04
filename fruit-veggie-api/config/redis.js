const dotenv = require('dotenv');
dotenv.config();

// Check if Redis is enabled in .env
// for developing purposes, I set REDIS_ENABLED to false
const REDIS_ENABLED = process.env.REDIS_ENABLED === 'true';

// Mock Redis client for when Redis is disabled
const mockRedisClient = {
  get: async () => null,
  set: async () => {},
  del: async () => {},
  connect: async () => {},
  isReady: false
};

let redisClient = mockRedisClient;

// Only initialize real Redis client if enabled
if (REDIS_ENABLED) {
  try {
    const { createClient } = require('redis');
    
    redisClient = createClient({
      url: process.env.REDIS_URL
    });
    
    redisClient.on('error', (err) => {
      console.log('Redis Client Error:', err);
      console.log('Falling back to non-cached operation');
      redisClient = mockRedisClient;
    });
    
    (async () => {
      try {
        await redisClient.connect();
        console.log('Redis client connected and caching enabled');
        redisClient.isReady = true;
      } catch (err) {
        console.error('Failed to connect to Redis:', err);
        console.log('Falling back to non-cached operation');
        redisClient = mockRedisClient;
      }
    })();
  } catch (err) {
    console.error('Redis package not found or error initializing:', err);
    console.log('Falling back to non-cached operation');
  }
} else {
  console.log('Redis caching disabled by configuration');
}

module.exports = redisClient;