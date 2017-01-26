'use strict';

const events = require('events');

module.exports = function (parent) {
    parent = parent || {};

    class MyEmitter extends events {}
    const myEmitter = new MyEmitter();

    return Object.assign(myEmitter, parent);
};
