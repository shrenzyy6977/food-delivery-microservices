const Redis = require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: 6379
});

const publishEvent = async (event) => {
    await redis.publish('order-events', JSON.stringify(event));
};

module.exports = publishEvent;