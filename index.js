'use strict';

const { EventEmitter } = require('events');
const uuidv4 = require('uuid/v4');

class WaitNotify {
  constructor() {
    this.ee = new EventEmitter();
    this.waitMsgIDs = [];
  }

  async wait(timeout = 0) {
    return new Promise((resolve, reject) => {
      const msgID = uuidv4();
      this.waitMsgIDs.push(msgID);
      let timeoutHandel;
      this.ee.once(msgID, () => {
        if (timeoutHandel) {
          clearTimeout(timeoutHandel);
        }
        resolve();
      });
      if (timeout) {
        timeoutHandel = setTimeout(() => {
          const delIndex = this.waitMsgIDs.indexOf(msgID);
          if (delIndex !== -1) {
            this.waitMsgIDs.splice(delIndex, 1);
            reject(new Error('wait timeout'));
          }
        }, timeout);
      }
    });
  }

  notify() {
    this.notifyAll();
  }

  notifyAll() {
    while (this.waitMsgIDs.length > 0) {
      this.ee.emit(this.waitMsgIDs.shift());
    }
  }

  notifyOne() {
    this.ee.emit(this.waitMsgIDs.shift());
  }
}

module.exports = WaitNotify;
