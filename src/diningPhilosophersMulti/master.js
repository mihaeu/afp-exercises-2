"use strict";

var cp = require('child_process');
var philosopher1 = cp.fork(__dirname + '/worker1');
var philosopher2 = cp.fork(__dirname + '/worker2');
var philosopher3 = cp.fork(__dirname + '/worker3');
var philosopher4 = cp.fork(__dirname + '/worker4');
var philosopher5 = cp.fork(__dirname + '/worker5');


