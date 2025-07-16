const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'email-service',
  brokers: ['kafka:9092'],       
});

const producer = kafka.producer({ allowAutoTopicCreation: false });
const consumer = kafka.consumer({
  groupId: 'email-service-group',
  allowAutoTopicCreation: false,
});

async function initKafka() {
  await Promise.all([
    producer.connect(),
    consumer.connect(),
  ]);

  
  await consumer.subscribe({ topic: /^email-.*$/, fromBeginning: false });

  console.log('✅ Kafka producer & consumer connected.');
}

async function shutdownKafka() {
  await Promise.allSettled([
    producer.disconnect(),
    consumer.disconnect(),
  ]);
  console.log('👋 Kafka connections closed.');
}

process.on('SIGINT', shutdownKafka);
process.on('SIGTERM', shutdownKafka);

module.exports = {
  producer,        
  consumer,
  initKafka,      
};
