const Redis = require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: 6379
});

redis.subscribe('order-events');

redis.on('message', (channel, message) => {
    const event = JSON.parse(message);

    if (event.type === 'ORDER_PLACED') {
        console.log("🚚 Assigning delivery agent for order:", event.data.id);
    }
});