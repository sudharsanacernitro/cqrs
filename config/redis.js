const Redis = require('ioredis');

const redisClient = new Redis({
  host: 'localhost',  
  port: 6379,
  lazyConnect: true, 
});

async function initRedis() {
  try {
    await redisClient.connect();
    console.log('✅ Redis client connected.');
  } catch (err) {
    console.error('❌ Redis connection failed:', err);
    process.exit(1);
  }
}

async function shutdownRedis() {
  try {
    await redisClient.quit();  
    console.log('👋 Redis client disconnected.');
  } catch (err) {
    console.warn('⚠️ Redis shutdown issue:', err);
  }
}

process.on('SIGINT', shutdownRedis);
process.on('SIGTERM', shutdownRedis);

module.exports = {
  redisClient,
  initRedis,
  shutdownRedis,
};
