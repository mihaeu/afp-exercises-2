"use strict";

var cp = require('child_process');
var philosopher1 = cp.fork(__dirname + '/worker1');
var philosopher2 = cp.fork(__dirname + '/worker2');
var philosopher3 = cp.fork(__dirname + '/worker3');
var philosopher4 = cp.fork(__dirname + '/worker4');
var philosopher5 = cp.fork(__dirname + '/worker5');

let setupInterprocessCommunication = (publisher, subscribers) => {
    publisher.on('message', function(data){
        console.log(data);
        for (let subscriber of subscribers){
            subscriber.send(data);
        }
    });
};

setupInterprocessCommunication(philosopher1, [philosopher5, philosopher2]);
setupInterprocessCommunication(philosopher2, [philosopher1, philosopher3]);
setupInterprocessCommunication(philosopher3, [philosopher2, philosopher4]);
setupInterprocessCommunication(philosopher4, [philosopher3, philosopher5]);
setupInterprocessCommunication(philosopher5, [philosopher4, philosopher1]);