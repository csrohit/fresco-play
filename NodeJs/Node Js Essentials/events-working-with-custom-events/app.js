var events = require('events');
var eventEmitter = new events.EventEmitter();

//Create an event handler:
var Myfunc = function () {
  console.log('HI THERE ! HAPPY LEARNING');
}

//Assign the event handler to an event:
eventEmitter.on('MyEvent', Myfunc);

//Fire the 'scream' event:
eventEmitter.emit('MyEvent');