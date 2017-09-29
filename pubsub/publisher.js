const publish_message = require('./publish_message.js');
const random_string = require('randomstring');
const async = require('async');
const topic_name = 'my-topic';
const subscription_name = 'my-sub';
const logger = require('./logger.js').logger;
var message = "Hello world";
var message_id = 0;
var counter = 0;
var output = {};
var time_out = 10000;
//publish_message.publishMessage(topic_name, message);

const get_messages = function(){
  var handler = setInterval(function(){
    // this code will only run when time has ellapsed
    counter = counter+1;
    message = random_string.generate({
      length: 5,
      charset: 'alphabetic',
      capitalization: 'lowercase'
    });
    logger.log(counter);
    if(counter == 10){
      clearInterval(handler);
    }
    output = publish_message.publishMessage(topic_name, message);

  },  time_out);
  setTimeout(get_messages, 10*time_out);
}

//for(var i = 0; i<=10;i++){
  // Generate a random message

//Publish the message

get_messages(message);
//}



/*
  setTimeout(function(){
    // this code will only run when time has ellapsed
    listen_for_message.listenForMessages('my-sub', 30);
  },  2000);
*/
  //Listen for new messages in the subscription
