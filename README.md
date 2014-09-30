userAgent

ReadMe file in the development of now.
=========
##Methods
####collect
```js
userAgent.collect(
  function (data) {
    // data - JSON with information about plugins, browser version, IP, etc. 
  },
  function () {
    // error handler
  }
);
```
####getKey
```js
userAgent.getKey(
  function (key) {
    // key - JSON from userAgent.collect() as String 
  },
  function () {
    // error handler
  }
);
```
