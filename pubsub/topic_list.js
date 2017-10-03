var google = require('googleapis');
var pubsub = google.pubsub('v1');

authorize(function(authClient) {
var request = {
// REQUIRED: The resource for which the policy is being requested.
// See the operation documentation for the appropriate value for this field.
project: 'projects/nilayan-apiary-sandbox',  // TODO: Update placeholder value.
auth: authClient,
};

var handlePage = function(err, response) {
     if (err) {
       console.error(err);
       return;
     }

     var topicsPage = response['topics'];
     if (!topicsPage) {
       return;
     }
     for (var i = 0; i < topicsPage.length; i++) {
       // TODO: Change code below to process each resource in `topicsPage`:
       console.log(JSON.stringify(topicsPage[i], null, 2));
     }

     if (response.nextPageToken) {
       request.pageToken = response.nextPageToken;
       pubsub.projects.topics.list(request, handlePage);
     }
   };

   pubsub.projects.topics.list(request, handlePage);
});


function authorize(callback) {
  google.auth.getApplicationDefault(function(err, authClient) {
    if (err) {
      console.error('authentication failed: ', err);
      return;
    }
    if (authClient.createScopedRequired && authClient.createScopedRequired()) {
      var scopes = ['https://www.googleapis.com/auth/cloud-platform'];
      authClient = authClient.createScoped(scopes);
    }
    callback(authClient);
  });
}
