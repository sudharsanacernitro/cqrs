const { producer }   = require('../../config/kafka');
const { redisClient } = require('../../config/redis');


exports.initiateReadEvent = async (DBname, Command, DataId, DTO) => {

    const topic = `${DBname}-${Command}`.toLowerCase();
    const payload = JSON.stringify(DTO);
    const headers = {
        'content-type': 'application/json',
        'correlation-id': String(DataId),
        'timestamp': Date.now().toString(),
    };

    try {
        await producer.send({
        topic,
        messages: [
            { key: String(DataId), value: payload, headers },
        ],
        });

        await redisClient.set(`${topic}:${DataId}`, payload, 'EX', 3600);

        console.log('✅ Event published to Kafka and cached in Redis.');
    } catch (err) {
        console.error('❌ publish/cache failed:', err);
        throw err; 
    }
};
