'use strict';

const WaitNotify = require('..');
const waitNotify = new WaitNotify();
const waitNotifyOne = new WaitNotify();
const waitNotifyTimeout = new WaitNotify();

(async () => {
  setInterval(() => {
    waitNotify.notify();
    waitNotifyOne.notifyOne();
  }, 1000);
})();

(async () => {
  try {
    await waitNotifyTimeout.wait(100);
  } catch (e) {
    console.log(e);
  }
})();

for (let i = 0; i < 3; i++) {
  (async () => {
    let count = 10;
    while (count > 0) {
      try {
        await waitNotify.wait();
      } catch (e) {
        console.log(e);
      }
      count--;
      console.log('wait notify count', count);
    }
  })();
}

(async () => {
  let count = 10;
  while (count > 0) {
    // eslint-disable-next-line no-loop-func
    (async () => {
      const innerCount = count;
      try {
        await waitNotifyOne.wait();
      } catch (e) {
        console.log(e);
      }
      console.log('wait notify one count', innerCount);
    })();
    count--;
  }
})();
