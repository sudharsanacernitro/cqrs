const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'email-service',
  brokers: ['localhost:9092'],       
 createPartitioner: Partitioners.LegacyPartitioner,
});

const producer = kafka.producer({ allowAutoTopicCreation: true });
const consumer = kafka.consumer({ groupId: 'email-service-group' });

async function init()
{
  await producer.connect();
}

init();

module.exports = {
  producer,        
  consumer,  
};
