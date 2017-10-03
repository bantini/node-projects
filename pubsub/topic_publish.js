var google = require('googleapis');
var pubsub = google.pubsub('v1');
const logger = require('./logger.js').logger;
var randomstring = require("randomstring");

const topic_publisher = function(){
  authorize(function(authClient) {
    var message = randomstring.generate({
      length: 5,
      charset: 'alphabetic',
      capitalization: 'lowercase'
    });
    var request = {
    // REQUIRED: The resource for which the policy is being requested.
    // See the operation documentation for the appropriate value for this field.
    topic: 'projects/nilayan-apiary-sandbox/topics/my-topic',  // TODO: Update placeholder value.
    resource: {
    "messages": [
      {
        "attributes": {
          "key": "iana.org/language_tag",
          "value": "en"
        },
        "data": "test"
      }
    ]
    },
    auth: authClient,
    };

    pubsub.projects.topics.publish(request, function(err, response) {
       if (err) {
         logger.error("Error:\t"+err);
         return;
       }

       // TODO: Change code below to process the `response` object:
       logger.log(JSON.stringify(response, null, 2));
     });
  });
}


function authorize(callback) {
  google.auth.getApplicationDefault(function(err, authClient) {
    if (err) {
      logger.error('authentication failed: ', err);
      return;
    }
    if (authClient.createScopedRequired && authClient.createScopedRequired()) {
      var scopes = ['https://www.googleapis.com/auth/cloud-platform'];
      authClient = authClient.createScoped(scopes);
    }
    callback(authClient);
  });
}

exports.topic_publisher = topic_publisher;
