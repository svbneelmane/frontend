'use strict';

var os = require('os');
var ifaces = os.networkInterfaces();
const exec = require('child_process').exec;
let ip = "0.0.0.0";//falling back ip

Object.keys(ifaces).forEach(function (ifname) {
  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }
      ip=iface.address;
  });

});
console.log(ip);
