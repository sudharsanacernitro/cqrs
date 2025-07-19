const Redis = require('ioredis');

const redisClient = new Redis({
  host: 'localhost', // or 'redis' if inside Docker
  port: 6379,
  lazyConnect: true,
});

async function initRedis() {
  try {
    if (!redisClient.status || redisClient.status !== 'ready') {
      await redisClient.connect();
    }
    console.log('✅ Redis client connected.');
  } catch (err) {
    console.error('❌ Redis connection failed:', err);
    process.exit(1);
  }
}

async function shutdownRedis() {
  try {
    if (redisClient.status !== 'end') {
      await redisClient.quit();
    }
    console.log('👋 Redis client disconnected.');
  } catch (err) {
    console.warn('⚠️ Redis shutdown issue:', err.message);
  } finally {
    process.exit(0); // <-- forcefully exit after cleanup
  }
}




module.exports = { redisClient, initRedis, shutdownRedis };
