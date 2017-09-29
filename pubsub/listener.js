const listen_for_message = require('./listen_message.js');
var count = 0;
var handler = setInterval(function(){
    // this code will only run when time has ellapsed
    listen_for_message.listenForMessages('my-sub', 30);
    console.log(count);
    count = count+1;
  }, 10000);

if(count == 10){
  clearInterval(handler);
}
