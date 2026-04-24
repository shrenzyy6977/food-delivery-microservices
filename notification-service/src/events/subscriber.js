const Redis = require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: 6379
});

redis.subscribe('order-events');

redis.on('message', (channel, message) => {
    const event = JSON.parse(message);

    console.log("🔔 Notification:", event.type, event.data);
});