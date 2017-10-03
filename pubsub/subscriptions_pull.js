var google = require('googleapis');
const logger = require('./logger.js').logger;
var pubsub = google.pubsub('v1');

const subscription_pull = function(){
  authorize(function(authClient) {
    var request = {
    // REQUIRED: The resource for which the policy is being requested.
    // See the operation documentation for the appropriate value for this field.
      subscription: 'projects/nilayan-apiary-sandbox/subscriptions/my-sub',  // TODO: Update placeholder value.
      resource: {
        "max_messages": 100
      },
      auth: authClient,
    };
    pubsub.projects.subscriptions.pull(request, function(error,response){
      if(error){
        logger.error("Error:\t"+error);
      } else {
        logger.info(JSON.stringify(response, null, 2));
      }
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

exports.subscription_pull = subscription_pull;
