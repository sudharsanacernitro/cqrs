
const {handleEvent}=require("./dbHandler");

module.exports = async function handleMessage({ topic, partition, message }) {
 
  const receivedMessage = message.value.toString();
  const processedResult = JSON.parse(receivedMessage);

  await handleEvent(processedResult);

  
};