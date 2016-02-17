const db = require('../lib/db');

const Task = module.exports;

/*
  Insert new task into database

  attrs {
    name:   String  <task title to display>
    id_trip: Number <id of the trip this tasks resides in>
  }
*/
Task.create = function(attrs) {
  return db('task').insert(attrs, ['id', 'name', 'status', 'decision', 'id_trip'])
    .catch(function(error) {
      console.warn('error inserting task into db', attrs);
      // console.warn(error);
      throw error;
    })
    .then(function(result) {
      console.log('success inserting new task');
      return result[0];
    })
}

/*
  Retrieve all tasks of a certain trip
*/
Task.allOfTrip = function(tripId) {
  // console.log('all of trip running')
  return db.select('*').from('task').where({'id_trip': tripId})
    .catch(function(error) {
      console.warn('error retrieving tasks for trip:', tripId);
      // console.warn(error);
      throw error;
    })
    .then(function(result) {
      console.log('success retrieving trip tasks');
      return result;
    })
}
