const async = require('async'),
    moment = require('moment'),
    randomstring = require("randomstring");
function create_persons(readings){
  var first_name, last_name, age, salary,readings=[];
  for(i=0;i<1000;i++){
    first_name = randomstring.generate({
    length: 12,
    charset: 'alphabetic',
    capitalization: 'lowercase'
  });
    last_name = randomstring.generate({
    length: 12,
    charset: 'alphabetic',
    capitalization: 'lowercase'
  });
    age = (i)%40+20;
    salary = 60000+(i*100);
    var person = {
      first_name: first_name,
      last_name: last_name,
      age:age,
      salary: salary
    };
    readings.push(person);
  }
  return readings;
}

function insert_record(set_no, logger){
  var readings;
  function cb(){
    logger.info("Calling back");
  };
  logger.debug("Inserting set no."+set_no.toString());
  readings = create_persons();
  const bigQuery = require('@google-cloud/bigquery')(),
  bigQueryDataset = bigQuery.dataset('my_new_dataset'),
  bigQueryTable = bigQueryDataset.table('person_table');
  async.mapLimit(
    readings,
    5,
    function(reading, cb) {
      const record = {
        // Verious fields from reading
        first_name: reading.first_name,
        last_name: reading.last_name,
        age: reading.age,
        salary: reading.salary
      };

      // Attempt to persist individual reading.
      bigQueryTable.insert(record, function(err, apiResponse) {
        const recordStr = JSON.stringify(record);

        if (err) {
          logger.error("Error sending record to BigQuery:"+err);
          logger.error(JSON.stringify(apiResponse));
        } else {
          logger.info("Sent record to BigQuery...:"+recordStr);
        }

        // Done with this reading.
        cb();
      });
    },
    function(err, results) {
      // Everything is done.
      if(err){
        logger.error("Error at the end:"+err);
      } else {
        logger.info("All readings processed for interval");
      }

    }
  );
}

exports.insert_record = insert_record;
