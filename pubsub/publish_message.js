const PubSub = require('@google-cloud/pubsub');
const logger = require('./logger.js').logger;
function publishMessage (topicName, data) {
  // Instantiates a client
  const pubsub = PubSub();

  // References an existing topic, e.g. "my-topic"
  const topic = pubsub.topic(topicName);

  // Create a publisher for the topic (which can include additional batching configuration)
  const publisher = topic.publisher();

  // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
  const dataBuffer = Buffer.from(data);
  return publisher.publish(dataBuffer)
    .then((results) => {
      const messageId = results[0];
      logger.info(`Message ${messageId} published.`);

      return messageId;
    }).catch((error) => {
      logger.error(`Error while publishing: ${error}`);
    });
    /*
    publisher.publish(dataBuffer)
      .then((results) => {
        const messageId = results[0];
        console.log(`Message ${messageId} published.`);
      });
      */
}

module.exports.publishMessage = publishMessage;
