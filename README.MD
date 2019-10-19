# wait-notify
Wait here until others notify you that you can go!

Just support node now.

## Introduction
Wait/Notify mode like other languages.

## Installation

```sh
$ npm install wait-notify [--save]
```

## Examples
[test.js](https://github.com/machenjie/wait-notify/blob/master/test/index.js)
```
const WaitNotify = require('wait-notify');
const waitNotify = new WaitNotify();

(async () => {
    setInterval(() => {
        waitNotify.notify();
    }, 1000);
})();

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
```
## API

### WaitNotify()
the constructor

### WaitNotify.wait(timeout=0)
wait until others notify or timeout
- `timeout` :  integer The max time to wait in second. default is infinite.
- `return` : promise Wait the end, or catch the timeout error

### WaitNotify.notify()
notify all the waiter to wake up
- `return` : undefined

### WaitNotify.notifyAll()
notify all the waiter to wake up
- `return` : undefined

### WaitNotify.notifyOne()
notify the first waiter to wake up
- `return` : undefined

## License

The project is licensed under the MIT License. See the [LICENSE](https://github.com/machenjie/wait-notify/blob/master/LICENSE) file for more details
