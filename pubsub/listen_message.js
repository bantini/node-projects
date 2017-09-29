const PubSub = require('@google-cloud/pubsub');
const logger = require('./logger.js').logger;
function listenForMessages (subscriptionName, timeout) {
  // Instantiates a client
  const pubsub = PubSub();

  // References an existing subscription, e.g. "my-subscription"
  const subscription = pubsub.subscription(subscriptionName);

  // Create an event handler to handle messages
  let messageCount = 0;
  const messageHandler = (message) => {
    logger.log(`Received message ${message.id}:`);
    logger.log(`\tData: ${message.data}`);
    logger.log(`\tAttributes: ${message.attributes}`);
    messageCount += 1;

    // "Ack" (acknowledge receipt of) the message
    message.ack();

  };

  // Listen for new messages until timeout is hit
  subscription.on(`message`, messageHandler);
  setTimeout(() => {
    subscription.removeListener('message', messageHandler);
    logger.info(`${messageCount} message(s) received.`);
  }, timeout * 1000);
}

module.exports.listenForMessages = listenForMessages;
