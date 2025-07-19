const handleMessage = require('../eventHandler/consumer/eventConsumerHandler');

const { consumer} = require('../config/kafka');
require("../config/mongo");

const run = async () => {
  try {

    await consumer.connect();
    await consumer.subscribe({ topic: 'CQRS', fromBeginning: false });

    console.log('🚀 Consumer connected. Waiting for messages...');

    await consumer.run({ eachMessage: handleMessage });
  } catch (err) {
    console.error('❌ Error during startup:', err.message);
  }
};

// setTimeout(run, 60000);
run();